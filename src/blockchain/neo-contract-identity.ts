import { u, wallet } from '@cityofzion/neon-js'
import { NeoCommon } from '.'
import { ClaimsHelper } from '../helpers/claims-helper'

export class NeoContractIdentity {
  /**
   * gets the contract name
   * @param network
   * @param contractHash
   * @returns {Promise<any>}
   */
  static async getContractName(network: any, contractHash: any): Promise<any> {
    const operation = 'getContractName'
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, [])
    if (response.result.stack.length > 0) {
      return u.hexstring2str(response.result.stack[0].value)
    }
    return null
  }

  /**
   * return the contract version
   * @param network
   * @param contractHash
   * @returns {Promise<number>}
   */
  static async getContractVersion(network: any, contractHash: any): Promise<number | null> {
    const operation = 'getContractVersion'
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, [])
    if (response.result.stack.length > 0) {
      return response.result.stack[0].value
    }
    return null
  }

  /**
   * Test whether `identityId` exists on-chain
   */
  static async getIdentityExists(network: any, contractHash: any, identityId: any): Promise<boolean> {
    const operation = 'getIdentityExists'
    const args = [
      identityId
    ]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    return NeoCommon.expectBoolean(response)
  }

  /*
  static async keyExistsForIdentity(network: any, contractHash: any, identityId: any, targetKey: any): Promise<boolean> {
    const operation = 'keyExistsForIdentity'
    const args = [u.str2hexstring(identityId), targetKey]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    return NeoCommon.expectBoolean(response)
  }

  static async addKeyToIdentity(network: any, contractHash: any, identityId: any, targetKey: any, permissionLevel: any, wif: any) {
    const operation = 'addKeyToIdentity'
    const account = new wallet.Account(wif)

    const args = [u.str2hexstring(identityId), account.publicKey, targetKey, permissionLevel]
    const response = await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
    return NeoCommon.expectBoolean(response)
  }

  static async getKeyPermissionLevel(network: any, contractHash: any, identityId: any, targetKey: any): Promise<number> {
    const operation = 'getKeyPermissionLevel'
    const args = [u.str2hexstring(identityId), targetKey]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)

    if (response.result.stack.length > 0) {
      if (response.result.stack[0].value !== '') {
        return parseInt(u.reverseHex(response.result.stack[0].value.toString()), 16)
      }
    }
    return 0
  }

  static async setKeyPermissionLevel(network: any, contractHash: any, identityId: any, targetKey: any, permissionLevel: any, wif: any): Promise<void> {
    const operation = 'setKeyPermissionLevel'
    const account = new wallet.Account(wif)

    const args = [u.str2hexstring(identityId), account.publicKey, targetKey, permissionLevel]
    await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }

  static async deleteKeyFromIdentity(network: any, contractHash: any, identityId: any, targetKey: any, wif: any): Promise<void> {
    const operation = 'deleteKeyFromIdentity'
    const account = new wallet.Account(wif)

    const args = [u.str2hexstring(identityId), account.publicKey, targetKey]
    await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }
   */

  static async deleteIdentity(network: any, contractHash: any, identityId: any, adminKey: any, wif: any): Promise<void> {
    const operation = 'deleteIdentity'
    const args = [u.str2hexstring(identityId), adminKey]
    await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }

  /**
   * creates a new identity for the user
   * @param network - the network
   * @param contractHash - the contract hash to invoke
   * @param wif - the wif of the user
   */
  static async createIdentity(network: any, contractHash: any, wif: any): Promise<any> {
    const operation = 'createIdentity'
    const account = new wallet.Account(wif)
    const rootKey = new wallet.Account()

    let payload = await ClaimsHelper.encryptECIES(account.publicKey, Buffer.from(rootKey.privateKey))
    let encryptedPayload = JSON.stringify(payload)

    const args = [
      account.publicKey,
      rootKey.publicKey,
      u.str2hexstring(encryptedPayload)
    ]
    await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }

  static async getRootPubKey(network: any, contractHash: any, identityId: any): Promise<any> {
    const operation = 'getRootPubKey'
    const args = [
      identityId
    ]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0) {
      return response.result.stack[0].value
    }
    return null
  }

  static async getRootPrivKey(network: any, contractHash: any, identityId: any): Promise<any> {
    const operation = 'getRootPrivKey'
    const args = [
      identityId
    ]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0) {
      return u.hexstring2str(response.result.stack[0].value)
    }
    return null
  }

  static async issueProof(network: any, contractHash: any, identityId: any, owner: any, sub: any, type: any, payload: Buffer, encryption: any, wif: any): Promise<any> {
    const operation = 'issueProof'
    const issuer = new wallet.Account(wif)


    //encrypt the payload using the requested method
    let identityPubKey, encryptedPayload
    if (encryption === "owner_eceis") {
      identityPubKey = identityId
      encryptedPayload = ClaimsHelper.encryptECIES(identityPubKey, payload)
    } else if (encryption === "root_eceis") {
      identityPubKey = await NeoContractIdentity.getRootPubKey(network, contractHash, identityId)
      encryptedPayload = ClaimsHelper.encryptECIES(identityPubKey, payload)
    } else {
      throw new Error("invalid encryption method")
    }

    encryptedPayload = JSON.stringify(encryptedPayload)
    const args = [
      identityId,
      owner,
      issuer.publicKey,
      u.str2hexstring(sub),
      u.str2hexstring(type),
      u.str2hexstring(encryptedPayload),
      wallet.sign(encryptedPayload, issuer.privateKey),
      u.str2hexstring(encryption)
    ]

    await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }

  /*
  static async updateRootKey(network: any, contractHash: any, wif: any): Promise<any> {
    const operation = 'updateRootKey'
    const account = new wallet.Account(wif)
    const rootKey = new wallet.Account()

    let payload = ClaimsHelper.encryptECIES(account.publicKey, Buffer.from(rootKey.privateKey))
    let encryptedPayload = JSON.stringify(payload)

    const args = [
      account.publicKey,
      rootKey.publicKey,
      u.str2hexstring(encryptedPayload)
    ]

    await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }
   */

  static async getKeyBySubAndType(network: any, contractHash: any, identityId: any, sub:any, type:any): Promise<any> {
    const operation = 'getKeyBySubAndType'
    const args = [
      identityId,
      u.str2hexstring(sub),
      u.str2hexstring(type)
    ]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0) {
      return response.result.stack[0].value
    }
    return null
  }

  /*
  static async createObject(network: any, contractHash: any, objectId: any, identityId: any, object: any, wif: any): Promise<any> {
    const operation = 'createObject'
    const account = new wallet.Account(wif)

    const args = [
      u.str2hexstring(objectId),
      u.str2hexstring(identityId),
      u.str2hexstring(object),
      account.publicKey
    ]
    await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }

  static async deleteObject(network: any, contractHash: any, objectId: any, identityId: any, wif: any): Promise<any> {
    const operation = 'deleteObject'
    const account = new wallet.Account(wif)

    const args = [
      u.str2hexstring(objectId),
      u.str2hexstring(identityId),
      account.publicKey
    ]
    await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }

  static async grantObjectRole(network: any, contractHash: any, objectId: any, identityId: any, permissionIdentity: any, role: any, wif: any): Promise<any> {
    const operation = 'grantObjectRole'
    const account = new wallet.Account(wif)

    const args = [
      u.str2hexstring(objectId),
      u.str2hexstring(identityId),
      u.str2hexstring(permissionIdentity),
      u.str2hexstring(role),
      account.publicKey
    ]
    await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }

  static async revokeObjectRole(network: any, contractHash: any, objectId: any, identityId: any, permissionIdentity: any, role: any, wif: any): Promise<any> {
    const operation = 'revokeObjectRole'
    const account = new wallet.Account(wif)

    const args = [
      u.str2hexstring(objectId),
      u.str2hexstring(identityId),
      u.str2hexstring(permissionIdentity),
      u.str2hexstring(role),
      account.publicKey
    ]

    await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }

  static async updateObject(network: any, contractHash: any, objectId: any, identityId: any, object: any, wif: any): Promise<any> {
    const operation = 'updateObject'
    const account = new wallet.Account(wif)

    const args = [
      u.str2hexstring(objectId),
      u.str2hexstring(identityId),
      u.str2hexstring(object),
      account.publicKey
    ]

    await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }

  static async getObject(network: any, contractHash: any, objectId: any): Promise<any> {
    const operation = 'getObject'

    const args = [
      u.str2hexstring(objectId),
    ]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0) {
      return u.hexstring2str(response.result.stack[0].value)
    }
    return null
  }

  static async getObjectRoles(network: any, contractHash: any, objectId: any, identityId: any): Promise<any> {
    const operation = 'getObjectRoles'
    const roleKeys = ["owner", "write", "setRole"]
    const args = [
      u.str2hexstring(objectId),
      u.str2hexstring(identityId)
    ]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0) {
      return response.result.stack[0].value
    }
    return null
  }
  */
  /*
  static async getObjectRoles(network: any, contractHash: any, objectId: any, identityId: any, object: any, wif: any): Promise<any> {

  }
  */

}
