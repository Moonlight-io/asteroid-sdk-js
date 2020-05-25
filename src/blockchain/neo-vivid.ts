import { ClaimInfo, NetworkItem } from '../interfaces'
import { NeoContractIdentity } from './neo-contract-identity'
import { NeoContractClaims } from './neo-contract-claims'
import { NeoContractNameService } from '.'
import { ClaimAttestationItem } from '../interfaces/blockchain'
import { u, wallet } from '@cityofzion/neon-js'
import { Encryption } from '../helpers'

export class NeoVivid {
  static async getDecryptedClaimByClaimID(network: NetworkItem, neoCNSScriptHash: string, claimId: string, wif: string): Promise<ClaimInfo> {
    const requestWallet = new wallet.Account(wif)

    const claimsContractPromise = NeoContractNameService.getAddress(network, neoCNSScriptHash, 'moonlight', 'claims')
    const identityContractPromise = NeoContractNameService.getAddress(network, neoCNSScriptHash, 'moonlight', 'identity')
    const claimsContract = await claimsContractPromise
    const identityContract = await identityContractPromise
    if (!claimsContract || !identityContract) {
      throw new Error('unable to retrieve contract hashes')
    }

    const claim = await this.getFormattedClaimByClaimID(network, claimsContract, claimId)

    const promises = claim.attestations.map(async (attestation: ClaimAttestationItem, i: number) => {
      const keys = await NeoContractIdentity.getTargetKeys(network, identityContract, requestWallet.publicKey, claim.claim_id + ':' + i)

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

  static async getFormattedClaimByClaimID(network: NetworkItem, claimsScriptHash: string, claimId: string): Promise<ClaimInfo> {
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
