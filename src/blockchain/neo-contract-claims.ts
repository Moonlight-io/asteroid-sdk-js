import { u, wallet } from '@cityofzion/neon-js'
import { NeoCommon } from '.'
import { ClaimsHelper } from '../helpers/claims-helper'
import { NetworkItem, ClaimAttestationItem, ClaimInfo, ClaimTopicInfo } from '../interfaces'
import { inverseClaimEncryptionModes } from '../constants/claim_encryption'

export class NeoContractClaims {
  static buildAndCreateClaim(network: NetworkItem, contractHash: string, rawClaim: any, issuerWif: string): Promise<any> {
    const claim = NeoContractClaims.buildClaim(rawClaim, issuerWif)
    return NeoContractClaims.createClaim(network, contractHash, claim, issuerWif)
  }

  static buildClaim({ attestations, claim_id, sub, claim_topic, expires, verification_uri }: any, issuerWif: string): any {
    const actIssuer = new wallet.Account(issuerWif)
    const actSub = new wallet.Account(sub)
    const claimId = u.str2hexstring(claim_id)

    if (attestations.length <= 0) {
      throw new Error('attestation list must have length greater than 0')
    }

    const attestationList = []
    const keys = []
    // iterate over all attestations attached to the claimData
    for (const attestation of attestations) {
      const secureAtt = ClaimsHelper.formatAttestation(attestation, actIssuer, actSub)
      attestationList.push(secureAtt.value)
      keys.push({
        identifier: attestation.identifier,
        key: secureAtt.key,
      })
    }
    const formattedAttestations = 80 + u.int2hex(attestationList.length) + attestationList.join('')

    return {
      attestations: formattedAttestations,
      signed_by: actIssuer.publicKey,
      signature: wallet.sign(formattedAttestations, actIssuer.privateKey),
      claim_id: claimId,
      sub: actSub.publicKey,
      claim_topic: u.str2hexstring(claim_topic),
      expires,
      verification_uri: u.str2hexstring(verification_uri),
      keys,
    }
  }

  /**
   * checks if the script is deployed
   * @param network
   * @param contractHash
   * @returns {Promise<any>}
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
   * @param network
   * @param contractHash
   * @param formatted_claim
   * @param wif
   * @returns {Promise<any>}
   */
  static async createClaim(network: NetworkItem, contractHash: string, { attestations, signed_by, signature, claim_id, sub, claim_topic, expires, verification_uri }: any, wif: string): Promise<any> {
    const operation = 'createClaim'
    const args = [attestations, signed_by, signature, claim_id, sub, claim_topic, expires, verification_uri]

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

      const claimInfo: ClaimInfo = {
        claim_id: u.hexstring2str(payload[0].value),
        attestations,
        signed_by: payload[2].value,
        signature: payload[3].value,
        sub: payload[4].value,
        topic: u.hexstring2str(payload[5].value),
        expires: payload[6].value === '',
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

      const attestations: any = []
      for (const attestation of payload[1].value) {
        attestations.push({
          remark: u.hexstring2str(attestation.value[0].value),
          value: u.hexstring2str(attestation.value[1].value),
          encryption: inverseClaimEncryptionModes[parseInt(u.reverseHex(attestation.value[2].value), 16)],
        })
      }

      const claimInfo: ClaimInfo = {
        claim_id: u.hexstring2str(payload[0].value),
        attestations,
        signed_by: payload[2].value,
        signature: payload[3].value,
        sub: payload[4].value,
        topic: u.hexstring2str(payload[5].value),
        expires: payload[6].value,
        verification_uri: u.hexstring2str(payload[7].value),
      }
      return claimInfo
    }

    return undefined
  }

  /**
   * checks if a claim exists on the platform using claim_id
   * @param network
   * @param contractHash
   * @param claimId
   * @returns {Promise<any>}
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
   * @param network
   * @param contractHash
   * @param claimId
   */
  static async getClaimHasExpired(network: NetworkItem, contractHash: string, claimId: string): Promise<boolean | null> {
    const operation = 'getClaimHasExpired'
    const args = [u.str2hexstring(claimId)]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0) {
      return !(response.result.stack[0].value === '' || !response.result.stack[0].value)
    }
    return null
  }

  /**
   * gets the claim issuer
   * @param network
   * @param contractHash
   * @param claimId
   * @returns {Promise<any>}
   */
  static async getClaimIssuer(network: NetworkItem, contractHash: string, claimId: string): Promise<string | null> {
    const operation = 'getClaimIssuer'
    const args = [u.str2hexstring(claimId)]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0) {
      return response.result.stack[0].value
    }
    return null
  }

  /**
   * gets the target claim's signature
   * @param network
   * @param contractHash
   * @param claimId
   * @returns {Promise<any>}
   */
  static async getClaimSignature(network: NetworkItem, contractHash: string, claimId: string): Promise<string | null> {
    const operation = 'getClaimSignature'
    const args = [u.str2hexstring(claimId)]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0) {
      return response.result.stack[0].value
    }
    return null
  }

  /**
   * gets the claim subject
   * @param network
   * @param contractHash
   * @param claimId
   * @returns {Promise<any>}
   */
  static async getClaimSubject(network: NetworkItem, contractHash: string, claimId: string): Promise<string | null> {
    const operation = 'getClaimSubject'
    const args = [u.str2hexstring(claimId)]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0) {
      return response.result.stack[0].value
    }
    return null
  }

  /**
   * gets the claim topic
   * @param network
   * @param contractHash
   * @param claimId
   * @returns {Promise<any>}
   */
  static async getClaimTopic(network: NetworkItem, contractHash: string, claimId: string): Promise<string | null> {
    const operation = 'getClaimTopic'
    const args = [u.str2hexstring(claimId)]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0) {
      return u.hexstring2str(response.result.stack[0].value)
    }
    return null
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

  static async getClaimTopicWritePointer(network: NetworkItem, contractHash: string): Promise<number | null> {
    const operation = 'getClaimTopicWritePointer'
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, [])
    if (response.result.stack.length > 0) {
      return parseInt(u.reverseHex(response.result.stack[0].value), 16)
    }
    return null
  }

  /**
   * gets the verificationURI field of the claim
   * @param network
   * @param contractHash
   * @param claimId
   * @returns {Promise<any>}
   */
  static async getClaimVerificationURI(network: NetworkItem, contractHash: string, claimId: string): Promise<string | null> {
    const operation = 'getClaimVerificationURI'
    const args = [u.str2hexstring(claimId)]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0) {
      return u.hexstring2str(response.result.stack[0].value)
    }
    return null
  }

  static async getClaimWritePointer(network: NetworkItem, contractHash: string): Promise<number | null> {
    const operation = 'getClaimWritePointer'
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, [])
    if (response.result.stack.length > 0) {
      return parseInt(u.reverseHex(response.result.stack[0].value), 16)
    }
    return null
  }

  // Contract Name Service Helpers

  /**
   * gets the contract name
   * @param network
   * @param contractHash
   * @returns {Promise<any>}
   */
  static async getContractName(network: NetworkItem, contractHash: string): Promise<string | null> {
    const operation = 'getContractName'
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, [])
    if (response.result.stack.length > 0) {
      return u.hexstring2str(response.result.stack[0].value)
    }
    return null
  }

  /**
   * registers the contract against the neo contract name service
   * @param network
   * @param contractHash
   * @param cnsHash
   * @param wif
   * @returns {Promise<any>}
   */
  static async registerContractName(network: NetworkItem, contractHash: string, cnsHash: string, wif: string): Promise<any> {
    const operation = 'registerContractName'
    const account = new wallet.Account(wif)

    const args = [cnsHash, account.publicKey]
    return await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }

  /**
   * updates the contract's address on neo contract name service
   * @param network
   * @param contractHash
   * @param cnsHash
   * @param wif
   * @returns {Promise<any>}
   */
  static async updateContractAddress(network: NetworkItem, contractHash: string, cnsHash: string, wif: string): Promise<any> {
    const operation = 'updateContractAddress'
    const args = [cnsHash]
    return await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }
}
