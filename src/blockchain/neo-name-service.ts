import { u } from '@cityofzion/neon-js'
import { NeoBlockchainCommon } from '.'

export class NeoNameService {
  /**
   * Test whether an address is registered with CNS
   */
  static async getAddress(network: any, contractHash: any, name: string): Promise<string | null> {
    const operation = 'GetAddress'
    const args = [name]
    const response = await NeoBlockchainCommon.invokeFunction(network, contractHash, operation, args)

    if (response.result.stack.length > 0) {
      // have a response
      return u.hexstring2str(response.result.stack[0].value.toString())
    }
    return null
  }

  static async registerName(network: any, api: any, contractHash: any, name: any, address: any, owner: any, wif: any): Promise<any> {
    const operation = 'RegisterName'
    const args = [name, address, owner]
    return await NeoBlockchainCommon.contractInvocation(network, api, contractHash, operation, args, wif)
  }

  static async releaseName(network: any, api: any, contractHash: any, name: any, wif: any): Promise<any> {
    const operation = 'ReleaseName'
    const args = [name]
    return await NeoBlockchainCommon.contractInvocation(network, api, contractHash, operation, args, wif)
  }

  static async updateAddress(network: any, api: any, contractHash: any, name: any, address: any, wif: any): Promise<any> {
    const operation = 'UpdateAddress'
    const args = [name, address]
    return await NeoBlockchainCommon.contractInvocation(network, api, contractHash, operation, args, wif)
  }
}
