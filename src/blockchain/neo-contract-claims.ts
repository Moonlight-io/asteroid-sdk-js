import { u, wallet } from '@cityofzion/neon-js'
import { NeoCommon } from '.'
import { ClaimsHelper } from '../helpers/claims-helper'
import {
  NetworkItem,
  ClaimAttestationItem,
  ClaimInfo,
  ClaimTopicInfo,
  AttestationKey,
  FormattedClaimInfo,
  ScriptHash, WIF
} from '../interfaces'
import { inverseClaimEncryptionModes } from '../constants/claim_encryption'

export class NeoContractClaims {

  /**
   * Builds and creates a claim.
   * @param network  The Neo network target.
   * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
   * @param rawClaim  The raw claim to be issued.
   * @param issuerWif  This issuer's WIF.
   */
  static buildAndCreateClaim(network: NetworkItem, claimsContractHash: ScriptHash, rawClaim: ClaimInfo, issuerWif: WIF): Promise<ClaimInfo> {
    const claim = NeoContractClaims.buildClaim(rawClaim, issuerWif)
    return NeoContractClaims.createClaim(network, claimsContractHash, claim, issuerWif)
  }

  /**
   * Builds a claim payload from a raw claim for submission.
   * @param rawClaim  The raw claim to be issued
   * @param issuerWif  The issuer's WIF
   */
  static buildClaim(rawClaim: ClaimInfo, issuerWif: WIF): FormattedClaimInfo {
    const actIssuer = new wallet.Account(issuerWif)
    const actSub = new wallet.Account(rawClaim.sub)
    const claimId = u.str2hexstring(rawClaim.claim_id)

    if (rawClaim.attestations.length <= 0) {
      throw new Error('attestation list must have length greater than 0')
    }

    const attestationList = []
    const keys: AttestationKey[] = []
    // iterate over all attestations attached to the claimData
    for (const attestation of rawClaim.attestations) {
      const secureAtt = ClaimsHelper.formatAttestation(attestation, actIssuer, actSub)
      attestationList.push(secureAtt.value)
      keys.push({
        identifier: attestation.identifier,
        key: secureAtt.key,
      })
    }
    const formattedAttestations = 80 + u.int2hex(attestationList.length) + attestationList.join('')

    return {
      formattedAttestations,
      signed_by: actIssuer.publicKey,
      signature: wallet.sign(formattedAttestations, actIssuer.privateKey),
      claim_id: claimId,
      sub: actSub.publicKey,
      claim_topic: u.str2hexstring(rawClaim.claim_topic),
      expires: rawClaim.expires,
      verification_uri: u.str2hexstring(rawClaim.verification_uri),
      keys,
    }
  }

  /**
   * Checks is the contract has been deployed.
   * @param network  The Neo network target.
   * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
   */
  static async deployed(network: NetworkItem, claimsContractHash: ScriptHash): Promise<boolean> {
    const operation = 'deployed'
    const response = await NeoCommon.invokeFunction(network, claimsContractHash, operation, [])
    if (response.result.stack.length > 0) {
      return !(response.result.stack[0].value === '' || !response.result.stack[0].value)
    }
    return false
  }

  // Claims domain

  /**
   * Issues an on-chain claim against an identity.
   * @param network  The Neo network target.
   * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
   * @param claimInfo the claim payload built by [[`buildClaim`]].
   * @param wif the claim issuer's WIF.
   */
  static async createClaim(network: NetworkItem, claimsContractHash: ScriptHash, claimInfo: FormattedClaimInfo, wif: WIF): Promise<any> {
    const operation = 'createClaim'
    const args = [claimInfo.formattedAttestations, claimInfo.signed_by, claimInfo.signature, claimInfo.claim_id, claimInfo.sub, claimInfo.claim_topic, claimInfo.expires, claimInfo.verification_uri]

    return await NeoCommon.contractInvocation(network, claimsContractHash, operation, args, wif)
  }

  /**
   * Creates a new claim topic
   * @param network  The Neo network target.
   * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
   * @param claimTopic The name of the claim topic.
   * @param identifiers An array of the different fields within claims that are issued to against this topic.
   * @param wif  The claim topic creator.
   */
  static async createClaimTopic(network: NetworkItem, claimsContractHash: ScriptHash, claimTopic: string, identifiers: string[], wif: WIF): Promise<any> {
    const operation = 'createClaimTopic'
    const issuer = new wallet.Account(wif)

    const hexIdentifiers = []
    for (const identifier of identifiers) {
      hexIdentifiers.push('00' + ClaimsHelper.stringToHexWithLengthPrefix(identifier))
    }
    const identifiersBytes = hexIdentifiers.join('')
    const formattedIdentifiers = 80 + u.int2hex(hexIdentifiers.length) + identifiersBytes

    const args = [issuer.publicKey, u.str2hexstring(claimTopic), formattedIdentifiers]

    return await NeoCommon.contractInvocation(network, claimsContractHash, operation, args, wif)
  }

  /**
   * Retrieves a claim by its claim id.
   * @param network  The Neo network target.
   * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
   * @param claimID The claim id of the claim being requested.
   */
  static async getClaimByClaimID(network: NetworkItem, claimsContractHash: ScriptHash, claimID: string): Promise<ClaimInfo | undefined> {
    const operation = 'getClaimByClaimID'
    const args = [u.str2hexstring(claimID)]
    const response = await NeoCommon.invokeFunction(network, claimsContractHash, operation, args)
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
   * Gets a claim by its pointer.
   * @param network  The Neo network target.
   * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
   * @param pointer The pointer to retrieve a claim from.
   */
  static async getClaimByPointer(network: NetworkItem, claimsContractHash: ScriptHash, pointer: number): Promise<ClaimInfo | undefined> {
    const operation = 'getClaimByPointer'
    const args = [u.int2hex(pointer)]

    const response = await NeoCommon.invokeFunction(network, claimsContractHash, operation, args)
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
   * Checks if a claim exists.
   * @param network  The Neo network target.
   * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
   * @param claimId The claim id to check the existance of.
   */
  static async getClaimExists(network: NetworkItem, claimsContractHash: ScriptHash, claimId: string): Promise<boolean> {
    const operation = 'getClaimExists'
    const args = [u.str2hexstring(claimId)]
    const response = await NeoCommon.invokeFunction(network, claimsContractHash, operation, args)
    if (response.result.stack.length > 0) {
      return !(response.result.stack[0].value === '' || !response.result.stack[0].value)
    }
    return false
  }

  /**
   * Checks if the target claim has expired.
   * @param network  The Neo network target.
   * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
   * @param claimId the claim id of the claim to check.
   */
  static async getClaimHasExpired(network: NetworkItem, claimsContractHash: ScriptHash, claimId: string): Promise<boolean | undefined> {
    const operation = 'getClaimHasExpired'
    const args = [u.str2hexstring(claimId)]
    const response = await NeoCommon.invokeFunction(network, claimsContractHash, operation, args)
    if (response.result.stack.length > 0) {
      return !(response.result.stack[0].value === '' || !response.result.stack[0].value)
    }
    return undefined
  }

  /**
   * Retrieves the issuer of a claim.
   * @param network  The Neo network target.
   * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
   * @param claimId The claim id of the claim to target.
   */
  static async getClaimIssuer(network: NetworkItem, claimsContractHash: ScriptHash, claimId: string): Promise<string | undefined> {
    const operation = 'getClaimIssuer'
    const args = [u.str2hexstring(claimId)]
    const response = await NeoCommon.invokeFunction(network, claimsContractHash, operation, args)
    if (response.result.stack.length > 0) {
      return response.result.stack[0].value
    }
    return undefined
  }

  /**
   * Retrieves the signature of a claim.
   * @param network  The Neo network target.
   * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
   * @param claimId The claim id of the target claim.
   */
  static async getClaimSignature(network: NetworkItem, claimsContractHash: ScriptHash, claimId: string): Promise<string | undefined> {
    const operation = 'getClaimSignature'
    const args = [u.str2hexstring(claimId)]
    const response = await NeoCommon.invokeFunction(network, claimsContractHash, operation, args)
    if (response.result.stack.length > 0) {
      return response.result.stack[0].value
    }
    return undefined
  }

  /**
   * Retrieves the subject of a claim.
   * @param network  The Neo network target.
   * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
   * @param claimId The target claim.
   */
  static async getClaimSubject(network: NetworkItem, claimsContractHash: ScriptHash, claimId: string): Promise<string | undefined> {
    const operation = 'getClaimSubject'
    const args = [u.str2hexstring(claimId)]
    const response = await NeoCommon.invokeFunction(network, claimsContractHash, operation, args)
    if (response.result.stack.length > 0) {
      return response.result.stack[0].value
    }
    return undefined
  }

  /**
   * Retrieves the topic of a claim
   * @param network  The Neo network target.
   * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
   * @param claimId The target claim.
   */
  static async getClaimTopic(network: NetworkItem, claimsContractHash: ScriptHash, claimId: string): Promise<string | undefined> {
    const operation = 'getClaimTopic'
    const args = [u.str2hexstring(claimId)]
    const response = await NeoCommon.invokeFunction(network, claimsContractHash, operation, args)
    if (response.result.stack.length > 0) {
      return u.hexstring2str(response.result.stack[0].value)
    }
    return undefined
  }

  /**
   * Retrieves a claim topic definition by the claim topic.
   * @param network  The Neo network target.
   * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
   * @param claimTopic The claim topic to retrieve.
   */
  static async getClaimTopicByTopic(network: NetworkItem, claimsContractHash: ScriptHash, claimTopic: string): Promise<ClaimTopicInfo | undefined> {
    const operation = 'getClaimTopicByTopic'
    const args = [u.str2hexstring(claimTopic)]

    const response = await NeoCommon.invokeFunction(network, claimsContractHash, operation, args)
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

  /**
   * Retrieves a claim topic by its pointer.
   * @param network  The Neo network target.
   * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
   * @param pointer The pointer to retrieve.
   */
  static async getClaimTopicByPointer(network: NetworkItem, claimsContractHash: ScriptHash, pointer: number): Promise<ClaimTopicInfo | undefined> {
    const operation = 'getClaimTopicByPointer'
    const args = [u.int2hex(pointer)]
    const response = await NeoCommon.invokeFunction(network, claimsContractHash, operation, args)

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

  /**
   * Retrieves the claim topic write pointer.  This can be used with an iterator and [[`getClaimTopicByPointer`]] to grab all the claim topics.
   * @param network  The Neo network target.
   * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
   */
  static async getClaimTopicWritePointer(network: NetworkItem, claimsContractHash: ScriptHash): Promise<number | undefined> {
    const operation = 'getClaimTopicWritePointer'
    const response = await NeoCommon.invokeFunction(network, claimsContractHash, operation, [])
    if (response.result.stack.length > 0) {
      return parseInt(u.reverseHex(response.result.stack[0].value), 16)
    }
    return undefined
  }

  /**
   * Retrieves the verification URI of a claim
   * @param network  The Neo network target.
   * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
   * @param claimId  The claim id being targeted.
   */
  static async getClaimVerificationURI(network: NetworkItem, claimsContractHash: ScriptHash, claimId: string): Promise<string | undefined> {
    const operation = 'getClaimVerificationURI'
    const args = [u.str2hexstring(claimId)]
    const response = await NeoCommon.invokeFunction(network, claimsContractHash, operation, args)
    if (response.result.stack.length > 0) {
      return u.hexstring2str(response.result.stack[0].value)
    }
    return undefined
  }

  /**
   * Retrieves the claim write pointer.  This can be used with [[`getClaimByPointer`]] to iterate over and retrieve all claims.
   * @param network  The Neo network target.
   * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
   */
  static async getClaimWritePointer(network: NetworkItem, claimsContractHash: ScriptHash): Promise<number | undefined> {
    const operation = 'getClaimWritePointer'
    const response = await NeoCommon.invokeFunction(network, claimsContractHash, operation, [])
    if (response.result.stack.length > 0) {
      return parseInt(u.reverseHex(response.result.stack[0].value), 16)
    }
    return undefined
  }

  // Contract Name Service Helpers

  /**
   * Gets the contract name
   * @param network  The Neo network target.
   * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
   */
  static async getContractName(network: NetworkItem, claimsContractHash: ScriptHash): Promise<string | undefined> {
    const operation = 'getContractName'
    const response = await NeoCommon.invokeFunction(network, claimsContractHash, operation, [])
    if (response.result.stack.length > 0) {
      return u.hexstring2str(response.result.stack[0].value)
    }
    return undefined
  }

  /**
   * Registers the contract with the contract name service
   * @param network  The Neo network target.
   * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
   * @param cnsHash The contract name service script hash.
   * @param wif The issuer WIF.
   */
  static async registerContractName(network: NetworkItem, claimsContractHash: ScriptHash, cnsHash: ScriptHash, wif: WIF): Promise<any> {
    const operation = 'registerContractName'
    const account = new wallet.Account(wif)

    const args = [cnsHash, account.publicKey]
    return await NeoCommon.contractInvocation(network, claimsContractHash, operation, args, wif)
  }

  /**
   * Updates the contract's hash in the contract name service
   * @param network  The Neo network target.
   * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
   * @param cnsHash The contract name service script hash.
   * @param wif The issuer's WIF.
   */
  static async updateContractAddress(network: NetworkItem, claimsContractHash: ScriptHash, cnsHash: ScriptHash, wif: WIF): Promise<any> {
    const operation = 'updateContractAddress'
    const args = [cnsHash]
    return await NeoCommon.contractInvocation(network, claimsContractHash, operation, args, wif)
  }
}
