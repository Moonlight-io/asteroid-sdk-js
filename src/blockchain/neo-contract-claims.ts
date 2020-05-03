import { u, wallet } from '@cityofzion/neon-js'
import { NeoCommon } from '.'
import { ClaimsHelper } from '../helpers/claims-helper'
import { NetworkItem, ClaimAttestationItem, ClaimInfo, ClaimTopicInfo, ClaimKey } from '../interfaces'
import { inverseClaimEncryptionModes } from '../constants/claim_encryption'

export class NeoContractClaims {
  static buildAndCreateClaim(network: NetworkItem, contractHash: string, rawClaim: ClaimInfo, issuerWif: string): Promise<ClaimInfo> {
    const claim = NeoContractClaims.buildClaim(rawClaim, issuerWif)
    return NeoContractClaims.createClaim(network, contractHash, claim, issuerWif)
  }

  static buildClaim(claimInfo: ClaimInfo, issuerWif: string): ClaimInfo {
    const actIssuer = new wallet.Account(issuerWif)
    const actSub = new wallet.Account(claimInfo.sub)
    const claimId = u.str2hexstring(claimInfo.claim_id)

    if (claimInfo.attestations.length <= 0) {
      throw new Error('attestation list must have length greater than 0')
    }

    const attestationList = []
    const keys: ClaimKey[] = []
    // iterate over all attestations attached to the claimData
    for (const attestation of claimInfo.attestations) {
      const secureAtt = ClaimsHelper.formatAttestation(attestation, actIssuer, actSub)
      attestationList.push(secureAtt.value)
      keys.push({
        identifier: attestation.identifier,
        key: secureAtt.key,
      })
    }
    const formattedAttestations = 80 + u.int2hex(attestationList.length) + attestationList.join('')

    return {
      attestations: claimInfo.attestations,
      signed_by: actIssuer.publicKey,
      signature: wallet.sign(formattedAttestations, actIssuer.privateKey),
      claim_id: claimId,
      sub: actSub.publicKey,
      claim_topic: u.str2hexstring(claimInfo.claim_topic),
      expires: claimInfo.expires,
      verification_uri: u.str2hexstring(claimInfo.verification_uri),
      keys,
    }
  }

  /**
   * checks if the script is deployed
   */
  static async deployed(network: NetworkItem, contractHash: string): Promise<boolean> {
    const operation = 'deployed'
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, [])
    if (response.result.stack.length > 0) {
      return !(response.result.stack[0].value === '' || !response.result.stack[0].value)
    }
    return false
  }

  // Claims domain

  /**
   * invokes the createClaim method to publish a new claim on the blockchain
   */
  static async createClaim(network: NetworkItem, contractHash: string, claimInfo: ClaimInfo, wif: string): Promise<any> {
    const operation = 'createClaim'
    const args = [claimInfo.attestations, claimInfo.signed_by, claimInfo.signature, claimInfo.claim_id, claimInfo.sub, claimInfo.claim_topic, claimInfo.expires, claimInfo.verification_uri]

    return await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }

  static async createClaimTopic(network: NetworkItem, contractHash: string, claimTopic: string, identifiers: string[], wif: string): Promise<any> {
    const operation = 'createClaimTopic'
    const issuer = new wallet.Account(wif)

    const hexIdentifiers = []
    for (const identifier of identifiers) {
      hexIdentifiers.push('00' + ClaimsHelper.stringToHexWithLengthPrefix(identifier))
    }
    const identifiersBytes = hexIdentifiers.join('')
    const formattedIdentifiers = 80 + u.int2hex(hexIdentifiers.length) + identifiersBytes

    const args = [issuer.publicKey, u.str2hexstring(claimTopic), formattedIdentifiers]

    return await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }

  static async getClaimByClaimID(network: NetworkItem, contractHash: string, claimID: string): Promise<ClaimInfo | undefined> {
    const operation = 'getClaimByClaimID'
    const args = [u.str2hexstring(claimID)]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0 && response.result.stack[0].value.length > 0) {
      const payload = response.result.stack[0].value

      const attestations: ClaimAttestationItem[] = []
      for (const attestation of payload[1].value) {
        attestations.push({
          remark: u.hexstring2str(attestation.value[0].value),
          value: u.hexstring2str(attestation.value[1].value),
          encryption: inverseClaimEncryptionModes[parseInt(u.reverseHex(attestation.value[2].value), 16)],
        })
      }

      // TODO: review this logic
      const expires = !payload[6].value ? undefined : parseInt(payload[6].value, 10)

      const claimInfo: ClaimInfo = {
        claim_id: u.hexstring2str(payload[0].value),
        attestations,
        signed_by: payload[2].value,
        signature: payload[3].value,
        sub: payload[4].value,
        claim_topic: u.hexstring2str(payload[5].value),
        expires,
        verification_uri: u.hexstring2str(payload[7].value),
      }
      return claimInfo
    }

    return undefined
  }

  static async getClaimByPointer(network: NetworkItem, contractHash: string, pointer: number): Promise<ClaimInfo | undefined> {
    const operation = 'getClaimByPointer'
    const args = [u.int2hex(pointer)]

    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0 && response.result.stack[0].value.length > 0) {
      const payload = response.result.stack[0].value

      const attestations: ClaimAttestationItem[] = []
      for (const attestation of payload[1].value) {
        attestations.push({
          remark: u.hexstring2str(attestation.value[0].value),
          value: u.hexstring2str(attestation.value[1].value),
          encryption: inverseClaimEncryptionModes[parseInt(u.reverseHex(attestation.value[2].value), 16)],
        })
      }

      // TODO: review this logic
      const expires = !payload[6].value ? undefined : parseInt(payload[6].value, 10)

      const claimInfo: ClaimInfo = {
        claim_id: u.hexstring2str(payload[0].value),
        attestations,
        signed_by: payload[2].value,
        signature: payload[3].value,
        sub: payload[4].value,
        claim_topic: u.hexstring2str(payload[5].value),
        expires,
        verification_uri: u.hexstring2str(payload[7].value),
      }
      return claimInfo
    }

    return undefined
  }

  /**
   * checks if a claim exists on the platform using claim_id
   */
  static async getClaimExists(network: NetworkItem, contractHash: string, claimId: string): Promise<boolean> {
    const operation = 'getClaimExists'
    const args = [u.str2hexstring(claimId)]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0) {
      return !(response.result.stack[0].value === '' || !response.result.stack[0].value)
    }
    return false
  }

  /**
   * checks if the target claim is expired
   */
  static async getClaimHasExpired(network: NetworkItem, contractHash: string, claimId: string): Promise<boolean | undefined> {
    const operation = 'getClaimHasExpired'
    const args = [u.str2hexstring(claimId)]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0) {
      return !(response.result.stack[0].value === '' || !response.result.stack[0].value)
    }
    return undefined
  }

  /**
   * gets the claim issuer
   */
  static async getClaimIssuer(network: NetworkItem, contractHash: string, claimId: string): Promise<string | undefined> {
    const operation = 'getClaimIssuer'
    const args = [u.str2hexstring(claimId)]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0) {
      return response.result.stack[0].value
    }
    return undefined
  }

  /**
   * gets the target claim's signature
   */
  static async getClaimSignature(network: NetworkItem, contractHash: string, claimId: string): Promise<string | undefined> {
    const operation = 'getClaimSignature'
    const args = [u.str2hexstring(claimId)]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0) {
      return response.result.stack[0].value
    }
    return undefined
  }

  /**
   * gets the claim subject
   */
  static async getClaimSubject(network: NetworkItem, contractHash: string, claimId: string): Promise<string | undefined> {
    const operation = 'getClaimSubject'
    const args = [u.str2hexstring(claimId)]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0) {
      return response.result.stack[0].value
    }
    return undefined
  }

  /**
   * gets the claim topic
   */
  static async getClaimTopic(network: NetworkItem, contractHash: string, claimId: string): Promise<string | undefined> {
    const operation = 'getClaimTopic'
    const args = [u.str2hexstring(claimId)]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0) {
      return u.hexstring2str(response.result.stack[0].value)
    }
    return undefined
  }

  static async getClaimTopicByTopic(network: NetworkItem, contractHash: string, claimTopic: string): Promise<ClaimTopicInfo | undefined> {
    const operation = 'getClaimTopicByTopic'
    const args = [u.str2hexstring(claimTopic)]

    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0 && response.result.stack[0].value.length > 0) {
      const payload = response.result.stack[0].value

      const identifiers = []
      for (const identifier of payload[1].value) {
        identifiers.push(u.hexstring2str(identifier.value))
      }

      const claimTopicInfo = {
        claim_topic: u.hexstring2str(payload[0].value),
        identifiers,
        issuer: payload[2].value,
      }
      return claimTopicInfo
    }

    return undefined
  }

  static async getClaimTopicByPointer(network: NetworkItem, contractHash: string, pointer: number): Promise<ClaimTopicInfo | undefined> {
    const operation = 'getClaimTopicByPointer'
    const args = [u.int2hex(pointer)]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)

    if (response.result.stack.length > 0 && response.result.stack[0].value.length > 0) {
      const payload = response.result.stack[0].value

      const identifiers = []
      for (const identifier of payload[1].value) {
        identifiers.push(u.hexstring2str(identifier.value))
      }

      const claimTopicInfo = {
        claim_topic: u.hexstring2str(payload[0].value),
        identifiers,
        issuer: payload[2].value,
      }
      return claimTopicInfo
    }

    return undefined
  }

  static async getClaimTopicWritePointer(network: NetworkItem, contractHash: string): Promise<number | undefined> {
    const operation = 'getClaimTopicWritePointer'
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, [])
    if (response.result.stack.length > 0) {
      return parseInt(u.reverseHex(response.result.stack[0].value), 16)
    }
    return undefined
  }

  /**
   * gets the verificationURI field of the claim
   */
  static async getClaimVerificationURI(network: NetworkItem, contractHash: string, claimId: string): Promise<string | undefined> {
    const operation = 'getClaimVerificationURI'
    const args = [u.str2hexstring(claimId)]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0) {
      return u.hexstring2str(response.result.stack[0].value)
    }
    return undefined
  }

  static async getClaimWritePointer(network: NetworkItem, contractHash: string): Promise<number | undefined> {
    const operation = 'getClaimWritePointer'
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, [])
    if (response.result.stack.length > 0) {
      return parseInt(u.reverseHex(response.result.stack[0].value), 16)
    }
    return undefined
  }

  // Contract Name Service Helpers

  /**
   * gets the contract name
   */
  static async getContractName(network: NetworkItem, contractHash: string): Promise<string | undefined> {
    const operation = 'getContractName'
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, [])
    if (response.result.stack.length > 0) {
      return u.hexstring2str(response.result.stack[0].value)
    }
    return undefined
  }

  /**
   * registers the contract against the neo contract name service
   */
  static async registerContractName(network: NetworkItem, contractHash: string, cnsHash: string, wif: string): Promise<any> {
    const operation = 'registerContractName'
    const account = new wallet.Account(wif)

    const args = [cnsHash, account.publicKey]
    return await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }

  /**
   * updates the contract's address on neo contract name service
   */
  static async updateContractAddress(network: NetworkItem, contractHash: string, cnsHash: string, wif: string): Promise<any> {
    const operation = 'updateContractAddress'
    const args = [cnsHash]
    return await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }
}
