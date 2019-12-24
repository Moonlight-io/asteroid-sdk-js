import { u } from '@cityofzion/neon-js'
import { NeoCommon } from '.'

export class NeoContractIdentity {
  /**
   * have the identity contract do a dynamic invoke to the CNS registering itself
   */
  static async cnsRegister(network: any, api: any, contractHash: any, contractNameService: any, owner: any, wif: any): Promise<void> {
    const operation = 'registerContractName'
    const args = [u.reverseHex(contractNameService), owner]
    await NeoCommon.contractInvocation(network, api, contractHash, operation, args, wif)
  }

  /**
   * Have the identity contract do a dynamic invoke to the CNS updating its scriptHash
   */
  static async cnsUpdate(network: any, api: any, contractHash: any, contractNameService: any, wif: any): Promise<void> {
    const operation = 'updateContractAddress'
    const args = [u.reverseHex(contractNameService), wif]

    await NeoCommon.contractInvocation(network, api, contractHash, operation, args, wif)
  }

  /**
   * Test whether an address is registered with CNS
   */
  static async cnsIntegration(network: any, api: any, contractHash: any, contractNameService: any, defaultContact: any, owner: any, wif: any): Promise<void | boolean> {
    // get contract name from deployed contract
    const contractName = await NeoCommon.contractName(network, contractHash)

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
      let currentAddress = u.reverseHex(response.result.stack[0].value.toString())
      if (currentAddress !== defaultContact) {
        // contract address has changed, update it
        await NeoContractIdentity.cnsUpdate(network, api, contractHash, contractNameService, wif)
      }
    } else {
      // address doesn't exist, register it
      await NeoContractIdentity.cnsRegister(network, api, contractHash, contractNameService, owner, wif)
    }

    return false
  }

  /**
   * Test whether `identityId` exists on-chain
   */
  static async identityExists(network: any, contractHash: any, identityId: any): Promise<boolean> {
    const operation = 'identityExists'
    const args = [identityId]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    return NeoCommon.expectBoolean(response)
  }

  static async keyExistsForIdentity(network: any, contractHash: any, identityId: any, targetKey: any): Promise<boolean> {
    const operation = 'keyExistsForIdentity'
    const args = [identityId, targetKey]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    return NeoCommon.expectBoolean(response)
  }

  static async addKeyToIdentity(network: any, api: any, contractHash: any, identityId: any, adminKey: any, targetKey: any, permissionLevel: any, wif: any) {
    const operation = 'addKeyToIdentity'
    const args = [identityId, adminKey, targetKey, permissionLevel]
    const response = await NeoCommon.contractInvocation(network, api, contractHash, operation, args, wif)
    return NeoCommon.expectBoolean(response)
  }

  static async getKeyPermissionLevel(network: any, contractHash: any, identityId: any, targetKey: any): Promise<number> {
    const operation = 'getKeyPermissionLevel'
    const args = [identityId, targetKey]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)

    if (response.result.stack.length > 0) {
      if (response.result.stack[0].value !== '') {
        parseInt(u.reverseHex(response.result.stack[0].value.toString()), 16)
      }
    }
    return 0
  }

  static async setKeyPermissionLevel(network: any, api: any, contractHash: any, identityId: any, adminKey: any, targetKey: any, permissionLevel: any, wif: any): Promise<void> {
    const operation = 'setKeyPermissionLevel'
    const args = [identityId, adminKey, targetKey, permissionLevel]
    await NeoCommon.contractInvocation(network, api, contractHash, operation, args, wif)
  }

  static async deleteKeyFromIdentity(network: any, api: any, contractHash: any, identityId: any, adminKey: any, targetKey: any, wif: any): Promise<void> {
    const operation = 'deleteKeyFromIdentity'
    const args = [identityId, adminKey, targetKey]
    await NeoCommon.contractInvocation(network, api, contractHash, operation, args, wif)
  }

  static async deleteIdentity(network: any, api: any, contractHash: any, identityId: any, adminKey: any, wif: any): Promise<void> {
    const operation = 'deleteIdentity'
    const args = [identityId, adminKey]
    await NeoCommon.contractInvocation(network, api, contractHash, operation, args, wif)
  }

  static async createIdentity(network: any, api: any, contractHash: any, identityLabel: any, keys: any, wif: any): Promise<any> {
    const operation = 'createIdentity'
    let args = [identityLabel]
    args = args.concat(keys)
    await NeoCommon.contractInvocation(network, api, contractHash, operation, args, wif)
  }
}
