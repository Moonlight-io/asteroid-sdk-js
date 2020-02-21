import { u, wallet } from '@cityofzion/neon-js'
import { NeoCommon } from '.'
import { ClaimsHelper, Encryption } from '../helpers'
import { NetworkItem } from '../interfaces'

export class NeoContractIdentity {
  /**
   * creates a new identity for the user
   * @param network - the network
   * @param contractHash - the contract hash to invoke
   * @param wif - the wif of the user
   */
  static async createIdentity(network: NetworkItem, contractHash: string, wif: string): Promise<any> {
    const operation = 'createIdentity'
    const account = new wallet.Account(wif)
    const rootKey = new wallet.Account()

    const payload = await Encryption.p256ECIESencrypt(account.publicKey, Buffer.from(rootKey.privateKey))
    const encryptedPayload = JSON.stringify(payload)

    const args = [account.publicKey, rootKey.publicKey, u.str2hexstring(encryptedPayload)]
    await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }

  /**
   * gets the key at a specific write pointer
   * @param network
   * @param contractHash
   * @param identityId
   * @param writePointer
   */
  static async getKey(network: any, contractHash: string, identityId: string, writePointer: number): Promise<any> {
    const operation = 'getKey'
    const args = [identityId, u.int2hex(writePointer)]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack[0].value.length > 0) {
      return {
        owner: response.result.stack[0].value[0].value,
        iss: response.result.stack[0].value[1].value,
        sub: u.hexstring2str(response.result.stack[0].value[2].value),
        type: u.hexstring2str(response.result.stack[0].value[3].value),
        payload: u.hexstring2str(response.result.stack[0].value[4].value),
        signature: response.result.stack[0].value[5].value,
        encryption: u.hexstring2str(response.result.stack[0].value[6].value),
        write_pointer: parseInt(response.result.stack[0].value[8].value, 10),
      }
    }
    return null
  }

  /**
   * gets the write pointer for the keychain
   * @param network
   * @param contractHash
   * @param identityId
   */
  static async getKeychainHeight(network: any, contractHash: string, identityId: string): Promise<number | null> {
    const operation = 'getKeychainHeight'
    const args = [identityId]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0) {
      return parseInt(response.result.stack[0].value, 10)
    }
    return null
  }

  /**
   * gets the contract name
   * @param network
   * @param contractHash
   * @returns {Promise<number|null>}
   */
  static async getContractName(network: NetworkItem, contractHash: string): Promise<any> {
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
  static async getContractVersion(network: NetworkItem, contractHash: string): Promise<number | null> {
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
  static async getIdentityExists(network: NetworkItem, contractHash: string, identityId: string): Promise<boolean> {
    const operation = 'getIdentityExists'
    const args = [identityId]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    return NeoCommon.expectBoolean(response)
  }

  /*
  static async keyExistsForIdentity(network: NetworkItem, contractHash: string, identityId: string, targetKey: string): Promise<boolean> {
    const operation = 'keyExistsForIdentity'
    const args = [u.str2hexstring(identityId), targetKey]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    return NeoCommon.expectBoolean(response)
  }

  static async addKeyToIdentity(network: NetworkItem, contractHash: string, identityId: string, targetKey: string, permissionLevel: any, wif: string) {
    const operation = 'addKeyToIdentity'
    const account = new wallet.Account(wif)

    const args = [u.str2hexstring(identityId), account.publicKey, targetKey, permissionLevel]
    const response = await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
    return NeoCommon.expectBoolean(response)
  }

  static async getKeyPermissionLevel(network: NetworkItem, contractHash: string, identityId: string, targetKey: string): Promise<number> {
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

  static async setKeyPermissionLevel(network: NetworkItem, contractHash: string, identityId: string, targetKey: string, permissionLevel: any, wif: string): Promise<void> {
    const operation = 'setKeyPermissionLevel'
    const account = new wallet.Account(wif)

    const args = [u.str2hexstring(identityId), account.publicKey, targetKey, permissionLevel]
    await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }

  static async deleteKeyFromIdentity(network: NetworkItem, contractHash: string, identityId: string, targetKey: string, wif: string): Promise<void> {
    const operation = 'deleteKeyFromIdentity'
    const account = new wallet.Account(wif)

    const args = [u.str2hexstring(identityId), account.publicKey, targetKey]
    await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }
   */

  /*
  static async deleteIdentity(network: NetworkItem, contractHash: string, identityId: string, adminKey: string, wif: string): Promise<void> {

  static async deleteIdentity(network: any, contractHash: any, identityId: any, adminKey: any, wif: any): Promise<void> {
    const operation = 'deleteIdentity'
    const args = [u.str2hexstring(identityId), adminKey]
    await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }
  */

  /**
   * attempts to get the root public key for an identity
   * @param network
   * @param contractHash
   * @param identityId
   */
  static async getRootPubKey(network: any, contractHash: string, identityId: string): Promise<any> {
    const operation = 'getRootPubKey'
    const args = [identityId]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0) {
      return response.result.stack[0].value
    }
    return null
  }

  /**
   * attempts to get the encrypted root private key for an identity
   * @param network
   * @param contractHash
   * @param identityId
   */
  static async getRootPrivKey(network: any, contractHash: string, identityId: string): Promise<any> {
    const operation = 'getRootPrivKey'
    const args = [identityId]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0) {
      return u.hexstring2str(response.result.stack[0].value)
    }
    return null
  }

  /**
   * issues a new key to an identity's keychain
   * @param network
   * @param contractHash
   * @param identityId
   * @param owner
   * @param sub
   * @param type
   * @param payload
   * @param encryption
   * @param wif
   */
  static async issueKey(network: any, contractHash: string, identityId: string, owner: string, sub: string, type: string, payload: Buffer, encryption: string, wif: string): Promise<any> {
    const operation = 'issueKey'
    const issuer = new wallet.Account(wif)

    // encrypt the payload using the requested method
    let identityPubKey
    let encryptedPayload
    if (encryption === 'owner_eceis') {
      identityPubKey = identityId
      encryptedPayload = Encryption.p256ECIESencrypt(identityPubKey, payload)
    } else if (encryption === 'root_eceis') {
      identityPubKey = await NeoContractIdentity.getRootPubKey(network, contractHash, identityId)
      if (identityPubKey == null) {
        throw new Error('unable to determine root key: verify the identityId is correct')
      }
      encryptedPayload = Encryption.p256ECIESencrypt(identityPubKey, payload)
    } else {
      throw new Error('invalid encryption method')
    }

    encryptedPayload = JSON.stringify(encryptedPayload)
    encryptedPayload = u.str2hexstring(encryptedPayload)

    const args = [identityId, owner, issuer.publicKey, u.str2hexstring(sub), u.str2hexstring(type), encryptedPayload, wallet.sign(encryptedPayload, issuer.privateKey), u.str2hexstring(encryption)]

    await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }

  /**
   * attempts to remove a key from an identity's keychain
   * @param network
   * @param contractHash
   * @param identityId
   * @param writePointer
   * @param wif
   */
  static async revokeKey(network: any, contractHash: string, identityId: string, writePointer: number, wif: string): Promise<any> {
    const operation = 'revokeKey'
    const requestor = new wallet.Account(wif)

    const args = [identityId, u.int2hex(writePointer), requestor.publicKey]

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

  /**
   * attempts to resolve a key from an identity's keychain
   * @param network
   * @param contractHash
   * @param identityId
   * @param sub
   * @param type
   */
  static async getKeyBySubAndType(network: any, contractHash: string, identityId: string, sub: string, type: string): Promise<any> {
    const operation = 'getKeyBySubAndType'
    const args = [identityId, u.str2hexstring(sub), u.str2hexstring(type)]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack[0].value.length > 0) {
      return {
        owner: response.result.stack[0].value[0].value,
        iss: response.result.stack[0].value[1].value,
        sub: u.hexstring2str(response.result.stack[0].value[2].value),
        type: u.hexstring2str(response.result.stack[0].value[3].value),
        payload: u.hexstring2str(response.result.stack[0].value[4].value),
        signature: response.result.stack[0].value[5].value,
        encryption: u.hexstring2str(response.result.stack[0].value[6].value),
        write_pointer: parseInt(response.result.stack[0].value[8].value, 10),
      }
    }
    return null
  }

  /*
  static async createObject(network: NetworkItem, contractHash: string, objectId: string, identityId: string, object: string, wif: string): Promise<any> {
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

  static async deleteObject(network: NetworkItem, contractHash: string, objectId: string, identityId: string, wif: string): Promise<any> {
    const operation = 'deleteObject'
    const account = new wallet.Account(wif)

    const args = [
      u.str2hexstring(objectId),
      u.str2hexstring(identityId),
      account.publicKey
    ]
    await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }

  static async grantObjectRole(network: NetworkItem, contractHash: string, objectId: string, identityId: string, permissionIdentity: string, role: string, wif: string): Promise<any> {
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

  static async revokeObjectRole(network: NetworkItem, contractHash: string, objectId: string, identityId: string, permissionIdentity: string, role: string, wif: string): Promise<any> {
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

  static async updateObject(network: NetworkItem, contractHash: string, objectId: string, identityId: string, object: string, wif: string): Promise<any> {
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

  static async getObject(network: NetworkItem, contractHash: string, objectId: string): Promise<string | null> {
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

  static async getObjectRoles(network: NetworkItem, contractHash: string, objectId: string, identityId: string): Promise<string | null> {
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

  /*
  static async getObjectRoles(network: NetworkItem, contractHash: string, objectId: string, identityId: string, object: any, wif: string): Promise<any> {

  }
  */
}
