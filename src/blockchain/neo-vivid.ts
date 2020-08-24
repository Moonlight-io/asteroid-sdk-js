import { ClaimInfo, NetworkItem, ScriptHash, WIF } from '../interfaces'
import { NeoContractIdentity } from './neo-contract-identity'
import { NeoContractClaims } from './neo-contract-claims'
import { NeoContractNameService } from '.'
import { ClaimAttestationItem } from '../interfaces/blockchain'
import { u, wallet } from '@cityofzion/neon-js'
import { Encryption } from '../helpers'

export class NeoVivid {
  /**
   * Gets a claim by its claim_id and attempts to access and resolve all of its attestations.  Resolutions are returned
   * as `decrypted_value` on each attestation object.
   * @param network  The Neo network target.
   * @param neoCNSScriptHash  The neoCNS script hash. This is relatively static and is published (Here)
   * @param claimId  The target claim id.
   * @param wif  The wif of the identity attempting to resolve the claim.
   *
   * **Example:**
   * ```
   * const neoCNS = "b434339f25b6f1bec68e99f620dfbf3ec27dacdc"
   * const wif = "KxDgvEKzgSBPPfuVfw67oPQBSjidEiqTHURKSDL1R7yGaGYAeYnr"
   * const network = {
   *   name: "network",
   *   extra: {
   *     neoscan: "https://p1.neo.blockchain.moonlight.io:4001/api/main_net",
   *     rpcServer: "https://p1.neo.blockchain.moonlight.io:60333"
   *   }
   * }
   *
   * claim = await sdk.NeoVivid.getDecryptedClaimByClaimID(
   *    network,
   *    neoCNS,
   *    "NLBnCtGcA6Gx4NJ8",
   *    wif
   * )
   * ```
   */
  static async getDecryptedClaimByClaimID(network: NetworkItem, neoCNSScriptHash: ScriptHash, claimId: string, wif: WIF): Promise<ClaimInfo> {
    const requestWallet = new wallet.Account(wif)

    const claimsContractPromise = NeoContractNameService.getAddress(network, neoCNSScriptHash, 'moonlight', 'claims')
    const identityContractPromise = NeoContractNameService.getAddress(network, neoCNSScriptHash, 'moonlight', 'identity')
    const claimsContract = await claimsContractPromise
    const identityContract = await identityContractPromise
    if (!claimsContract || !identityContract) {
      throw new Error('unable to retrieve contract hashes')
    }

    const claim = await this.getFormattedClaimByClaimID(network, claimsContract, claimId)

    const promises = claim.attestations.map(async (attestation: ClaimAttestationItem) => {
      const keys = await NeoContractIdentity.getTargetKeys(network, identityContract, requestWallet.publicKey, claim.claim_id + ':' + attestation.identifier)
      let decryptedKey
      if (keys.length > 0 && keys[0].encryption && keys[0].payload) {
        // decrypt the key if required
        decryptedKey = Encryption.decryptPayload(keys[0].encryption, keys[0].payload, requestWallet.privateKey)
      }
      try {
        attestation.decrypted_value = Encryption.decryptPayload(attestation.encryption, attestation.value, decryptedKey)
      } catch {
        attestation.decrypted_value = undefined
      }
      return attestation
    })
    claim.attestations = await Promise.all(promises)
    return claim
  }

  /**
   * This method will mux a claim id and its topic to return a pretty claim.
   * @param network  The Neo network target.
   * @param claimsScriptHash  The script hash of the claims contract.
   * @param claimId  The claim id being requested.
   */
  static async getFormattedClaimByClaimID(network: NetworkItem, claimsScriptHash: ScriptHash, claimId: string): Promise<ClaimInfo> {
    const claim = await NeoContractClaims.getClaimByClaimID(network, claimsScriptHash, claimId)
    if (!claim) {
      throw new Error('unable to retrieve claim')
    }

    const claimTopic = await NeoContractClaims.getClaimTopicByTopic(network, claimsScriptHash, claim.claim_topic)
    if (!claimTopic) {
      throw new Error('unable to retrieve claim topic')
    }

    claimTopic.identifiers.forEach((identifier: string, i: number) => {
      claim!.attestations[i].identifier = identifier
    })
    return claim
  }
}
