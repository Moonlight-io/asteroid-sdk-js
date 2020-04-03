import { u, wallet } from '@cityofzion/neon-js'
import { NeoCommon } from '.'
import { ClaimsHelper } from '../helpers/claims-helper'
import { NetworkItem } from '../interfaces'

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

  static async createClaimTopic(network: NetworkItem, contractHash: string, claim_topic: string, identifiers: string[], wif: string): Promise<any> {
    const operation = 'createClaimTopic'
    const issuer = new wallet.Account(wif)

    let hexIdentifiers = []
    for (let i = 0; i < identifiers.length; i++) {
      hexIdentifiers.push('00' + ClaimsHelper.stringToHexWithLengthPrefix(identifiers[i]))
    }
    const identifiersBytes = hexIdentifiers.join('')
    const formattedIdentifiers = 80 + u.int2hex(hexIdentifiers.length) + identifiersBytes

    const args = [
      issuer.publicKey,
      u.str2hexstring(claim_topic),
      formattedIdentifiers
    ]

    return await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }

  static async setWritePointer(network: NetworkItem, contractHash: string, wif: string): Promise<any> {
    const operation = 'setWritePointer'
    return await NeoCommon.contractInvocation(network, contractHash, operation, [], wif)
  }

  static async getClaimByClaimID(network: NetworkItem, contractHash: string, claimID: string) {
    const operation = 'getClaimByClaimID'
    const args = [u.str2hexstring(claimID)]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0 && response.result.stack[0].value.length > 0) {
      const payload = response.result.stack[0].value

      let attestations: any = []
      let attestation
      for(let i = 0; i < payload[1].value.length; i++) {
        attestation = payload[1].value[i]
        console.log(attestation)
        attestations.push({

        })
        //attestations.push(u.hexstring2str(payload[1].value[i].value))
      }


      return {
        claim_id: u.hexstring2str(payload[0].value),
        attestations: attestations,
        signed_by: payload[2].value,
        signature: payload[3].value,
        sub: payload[4].value,
        topic: u.hexstring2str(payload[5].value),
        expires: payload[6].value,
        verification_uri: u.hexstring2str(payload[7].value)
      }
    }
  }

  static async getClaimByPointer(network: NetworkItem, contractHash: string, pointer: number) {
    const operation = 'getClaimByPointer'
    const args = [u.int2hex(pointer)]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0 && response.result.stack[0].value.length > 0) {
      return {
        claim_id: u.hexstring2str(response.result.stack[0].value[0].value),
        attestations: response.result.stack[0].value[1].value,
        signed_by: response.result.stack[0].value[2].value,
        signature: response.result.stack[0].value[3].value,
        sub: response.result.stack[0].value[4].value,
        topic: u.hexstring2str(response.result.stack[0].value[5].value),
        expires: response.result.stack[0].value[6].value,
        verification_uri: u.hexstring2str(response.result.stack[0].value[7].value)
      }
    }
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

  static async getClaimTopicByTopic(network: NetworkItem, contractHash: string, claim_topic: string): Promise<object | null> {
    const operation = 'getClaimTopicByTopic'
    const args = [u.str2hexstring(claim_topic)]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0 && response.result.stack[0].value.length > 0) {
      const payload = response.result.stack[0].value

      let identifiers = []
      for(let i = 0; i < payload[1].value.length; i++) {
        identifiers.push(u.hexstring2str(payload[1].value[i].value))
      }

      return {
        claim_topic: u.hexstring2str(payload[0].value),
        identifiers: identifiers,
        issuer: payload[2].value
      }
    }
    return null
  }

  static async getClaimTopicByPointer(network: NetworkItem, contractHash: string, pointer: number): Promise<object | null> {
    const operation = 'getClaimTopicByPointer'
    const args = [u.int2hex(pointer)]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)

    if (response.result.stack.length > 0 && response.result.stack[0].value.length > 0) {
      const payload = response.result.stack[0].value

      let identifiers = []
      for(let i = 0; i < payload[1].value.length; i++) {
        identifiers.push(u.hexstring2str(payload[1].value[i].value))
      }

      return {
        claim_topic: u.hexstring2str(payload[0].value),
        identifiers: identifiers,
        issuer: payload[2].value
      }
    }
    return null
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

  // Verification domain

  static async attestationEncryptionMethod(network: NetworkItem, contractHash: string, claimId: string, attestationIdentifier: string): Promise<string | null | undefined> {
    const operation = 'attestationEncryptionMethod'
    const args = [u.str2hexstring(claimId), u.str2hexstring(attestationIdentifier)]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0) {
      return ClaimsHelper.encryptionModeStrFromHex(response.result.stack[0].value)
    }
    return null
  }

  /**
   * checks if an attestation identifier exists on a claim
   * @param network
   * @param contractHash
   * @param claimId
   * @param attestationIdentifier
   * @returns {Promise<any>}
   */
  static async attestationIdentifierExists(network: NetworkItem, contractHash: string, claimId: string, attestationIdentifier: string): Promise<boolean | null> {
    const operation = 'attestationIdentifierExists'
    const args = [u.str2hexstring(claimId), u.str2hexstring(attestationIdentifier)]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0) {
      return !(response.result.stack[0].value === '' || !response.result.stack[0].value)
    }
    return null
  }

  /**
   * retrieves an attestation remark from a claim
   * @param network
   * @param contractHash
   * @param claimId
   * @param attestationIdentifier
   * @returns {Promise<any>}
   */
  static async attestationIdentifierRemark(network: NetworkItem, contractHash: string, claimId: string, attestationIdentifier: string): Promise<string | null> {
    const operation = 'attestationIdentifierRemark'
    const args = [u.str2hexstring(claimId), u.str2hexstring(attestationIdentifier)]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0) {
      return u.hexstring2str(response.result.stack[0].value)
    }
    return null
  }

  /**
   * retrieves an attestation's value from a claim
   * @param network
   * @param contractHash
   * @param claimId
   * @param attestationIdentifier
   * @returns {Promise<any>}
   */
  static async attestationIdentifierValue(network: NetworkItem, contractHash: string, claimId: string, attestationIdentifier: string): Promise<string | null> {
    const operation = 'attestationIdentifierValue'
    const args = [u.str2hexstring(claimId), u.str2hexstring(attestationIdentifier)]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0) {
      return u.hexstring2str(response.result.stack[0].value)
    }
    return null
  }
}
