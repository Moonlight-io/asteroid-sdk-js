import { u, wallet } from '@cityofzion/neon-js'
import { NeoCommon } from '.'
import { NetworkItem } from '../interfaces'

export class NeoContractNameService {
  /**
   * Test whether an address is registered with CNS
   */
  static async getAddress(network: NetworkItem, contractHash: string, domain: string, subDomain: string): Promise<string | undefined> {
    const operation = 'getAddress'
    const args = [u.str2hexstring(domain), u.str2hexstring(subDomain)]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0 && response.result.stack[0].value.length > 0) {
      return u.hexstring2str(response.result.stack[0].value)
    }
    return undefined
  }

  /**
   * registers a contract to the name service
   */
  static async registerDomain(network: NetworkItem, contractHash: string, domain: string, wif: string): Promise<any> {
    const operation = 'registerDomain'
    const account = new wallet.Account(wif)

    const args = [u.str2hexstring(domain), account.publicKey]

    const res = await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)

    return res.response.result
  }

  static async transferDomain(network: NetworkItem, contractHash: string, domain: string, target: any, wif: string): Promise<any> {
    const operation = 'transferDomain'

    const args = [u.str2hexstring(domain), target]

    const res = await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)

    return res.response.result
  }

  static async upsertSubDomain(network: NetworkItem, contractHash: string, domain: string, subDomain: string, address: string, wif: string): Promise<any> {
    const operation = 'upsertSubDomain'

    const args = [u.str2hexstring(domain), u.str2hexstring(subDomain), u.str2hexstring(address)]

    const res = await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)

    return res.response.result
  }
}
