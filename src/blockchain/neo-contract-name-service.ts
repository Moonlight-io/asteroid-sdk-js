import { u, wallet } from '@cityofzion/neon-js'
import { NeoCommon } from '.'
import { NetworkItem } from '../interfaces'

export class NeoContractNameService {
  /**
   * Resolves a domain and subDomain to an on chain entity.
   * @param network  The Neo network target.
   * @param neoCNSScriptHash  The neoCNS script hash. This is relatively static and is published (Here).
   * @param domain  The root domain to target (i.e "moonlight").
   * @param subDomain  The subDomain to target (i.e "claims").
   */
  static async getAddress(network: NetworkItem, neoCNSScriptHash: string, domain: string, subDomain: string): Promise<string | undefined> {
    const operation = 'getAddress'
    const args = [u.str2hexstring(domain), u.str2hexstring(subDomain)]
    const response = await NeoCommon.invokeFunction(network, neoCNSScriptHash, operation, args)
    if (response.result.stack.length > 0 && response.result.stack[0].value.length > 0) {
      return u.hexstring2str(response.result.stack[0].value)
    }
    return undefined
  }

  /**
   * Registers a new root level domain for use in the contract.
   * @param network  The Neo network target.
   * @param neoCNSScriptHash  The neoCNS script hash. This is relatively static and is published (Here).
   * @param domain  The requested root domain.
   * @param wif  The owner's wif.
   */
  static async registerDomain(network: NetworkItem, neoCNSScriptHash: string, domain: string, wif: string): Promise<any> {
    const operation = 'registerDomain'
    const account = new wallet.Account(wif)

    const args = [u.str2hexstring(domain), account.publicKey]

    const res = await NeoCommon.contractInvocation(network, neoCNSScriptHash, operation, args, wif)

    return res.response.result
  }

  /**
   * Transfers a domain to a new owner
   * @param network  The Neo network target.
   * @param neoCNSScriptHash  The neoCNS script hash. This is relatively static and is published (Here)
   * @param domain  The domain being transfered.
   * @param target  The target public key.
   * @param wif  The wif of the owner.
   */
  static async transferDomain(network: NetworkItem, neoCNSScriptHash: string, domain: string, target: any, wif: string): Promise<any> {
    const operation = 'transferDomain'

    const args = [u.str2hexstring(domain), target]

    const res = await NeoCommon.contractInvocation(network, neoCNSScriptHash, operation, args, wif)

    return res.response.result
  }

  /**
   * Updates the domain registery
   * @param network  The Neo network target.
   * @param neoCNSScriptHash  The neoCNS script hash. This is relatively static and is published (Here).
   * @param domain  The root level domain to update.
   * @param subDomain  The subdomain to modify.
   * @param address  The new target.
   * @param wif  The wif of the domain owner.
   */
  static async upsertSubDomain(network: NetworkItem, neoCNSScriptHash: string, domain: string, subDomain: string, address: string, wif: string): Promise<any> {
    const operation = 'upsertSubDomain'

    const args = [u.str2hexstring(domain), u.str2hexstring(subDomain), u.str2hexstring(address)]

    const res = await NeoCommon.contractInvocation(network, neoCNSScriptHash, operation, args, wif)

    return res.response.result
  }
}
