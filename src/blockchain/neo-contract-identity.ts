import { u, wallet } from '@cityofzion/neon-js'
import { NeoCommon } from '.'

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
   * have the identity contract do a dynamic invoke to the CNS registering itself
   */
  static async cnsRegister(network: any, contractHash: any, contractNameService: any, wif: any): Promise<void> {
    const operation = 'registerContractName'
    const account = new wallet.Account(wif)

    const args = [u.reverseHex(contractNameService), account.publicKey]
    await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }

  /**
   * Have the identity contract do a dynamic invoke to the CNS updating its scriptHash
   */
  static async cnsUpdate(network: any, contractHash: any, contractNameService: any, wif: any): Promise<void> {
    const operation = 'updateContractAddress'
    const args = [u.reverseHex(contractNameService), wif]

    await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }

  /**
   * Test whether an address is registered with CNS
   */
  static async cnsIntegration(network: any, contractHash: any, contractNameService: any, defaultContact: any, wif: any): Promise<void | boolean> {
    // get contract name from deployed contract
    const contractName = await NeoCommon.getContractName(network, contractHash)

    const operation = 'GetAddress'
    const args = [u.str2hexstring(contractName as string)]
    const invocation = {
      scriptHash: contractNameService,
      operation,
      args,
    }

    // test if address exists on CNS
    const response = await NeoCommon.scriptInvocation(network, invocation)
    if (response.result.stack.length > 0 && response.result.stack[0].value !== '') {
      const currentAddress = u.reverseHex(response.result.stack[0].value.toString())
      if (currentAddress !== defaultContact) {
        // contract address has changed, update it
        await NeoContractIdentity.cnsUpdate(network, contractHash, contractNameService, wif)
      }
    } else {
      // address doesn't exist, register it
      await NeoContractIdentity.cnsRegister(network, contractHash, contractNameService, wif)
    }

    return false
  }

  /**
   * return the contract version
   * @param network
   * @param contractHash
   * @returns {Promise<number>}
   */
  static async contractVersion(network: any, contractHash: any): Promise<number | null> {
    const operation = 'ContractVersion'
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, [])
    if (response.result.stack.length > 0) {
      return response.result.stack[0].value
    }
    return null
  }

  /**
   * Test whether `identityId` exists on-chain
   */
  static async identityExists(network: any, contractHash: any, identityId: any): Promise<boolean> {
    const operation = 'identityExists'
    const args = [u.str2hexstring(identityId)]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    return NeoCommon.expectBoolean(response)
  }

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

  static async deleteIdentity(network: any, contractHash: any, identityId: any, adminKey: any, wif: any): Promise<void> {
    const operation = 'deleteIdentity'
    const args = [u.str2hexstring(identityId), adminKey]
    await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }

  static async createIdentity(network: any, contractHash: any, identityLabel: any, wif: any, secondOwnerPublicKey?: any): Promise<any> {
    const operation = 'createIdentity'
    const account = new wallet.Account(wif)

    const args = [u.str2hexstring(identityLabel), account.publicKey]
    if (secondOwnerPublicKey !== undefined) {
      args.push(secondOwnerPublicKey)
    }
    await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }

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

  /*
  static async getObjectRoles(network: any, contractHash: any, objectId: any, identityId: any, object: any, wif: any): Promise<any> {

  }
  */

}
