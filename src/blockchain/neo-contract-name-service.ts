import { u, wallet } from '@cityofzion/neon-js'
import { NeoCommon } from '.'

export class NeoContractNameService {
  /**
   * Test wehether the contract has been deployed
   * @param network
   * @param contractHash
   * @returns {Promise<any>}
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
   * Test whether an address is registered with CNS
   */
  static async getAddress(network: any, contractHash: any, name: string): Promise<string | null> {
    const operation = 'GetAddress'
    const args = [u.str2hexstring(name)]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0) {
      // have a response
      return u.hexstring2str(response.result.stack[0].value.toString())
    }
    return null
  }

  /**
   * registers a contract to the name service
   * @param network
   * @param {string} contractHash
   * @param {string} name
   * @param {string} address
   * @param wif
   * @returns {Promise<any>}
   */
  static async registerName(network: any, contractHash: string, name: string, address: string, wif: any): Promise<any> {
    const operation = 'RegisterName'
    const account = new wallet.Account(wif)

    const args = [u.str2hexstring(name), u.str2hexstring(address), account.publicKey]

    const res = await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)

    return res.response.result
  }

  static async releaseName(network: any, contractHash: any, name: any, wif: any): Promise<any> {
    const operation = 'ReleaseName'
    const args = [u.str2hexstring(name)]
    return await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }

  static async updateAddress(network: any, contractHash: any, name: any, address: any, wif: any): Promise<any> {
    const operation = 'UpdateAddress'
    const args = [u.str2hexstring(name), u.str2hexstring(address)]
    return await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }
}
