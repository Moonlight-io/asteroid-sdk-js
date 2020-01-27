import { u, wallet } from '@cityofzion/neon-js'
import { NeoCommon } from '.'
import { ClaimsHelper } from "../helpers/claims-helper"

export class NeoContractClaims {

  static buildAndCreateClaim(network: string, contract_hash: string, raw_claim: any, issuer_wif: any): Promise<any> {
    let claim = NeoContractClaims.buildClaim(raw_claim, issuer_wif);
    return NeoContractClaims.createClaim(network, contract_hash, claim, issuer_wif)
  }

  static buildClaim({attestations, claim_id, sub, claim_topic, expires, verification_uri}: any, issuer_wif: string): any {
    const act_issuer = new wallet.Account(issuer_wif);
    const act_sub = new wallet.Account(sub);
    claim_id = u.str2hexstring(claim_id);

    if (attestations.length <= 0) {
      /* tslint:disable-next-line */
      throw new Error("attestation list must have length greater than 0")
    }

    const attestation_list = [];
    // iterate over all attestations attached to the claimData
    for (const attestation of attestations) {
      const payload = ClaimsHelper.formatAttestation(attestation, act_issuer, act_sub);
      attestation_list.push(payload)
    }

    attestation_list.push('00' + ClaimsHelper.hexLength(claim_id) + claim_id);

    const attestationBytes = attestation_list.join('');

    let formatted_attestations = 80 + u.int2hex(attestation_list.length) + attestationBytes;

    return {
      attestations: formatted_attestations,
      signed_by: act_issuer.publicKey,
      signature: wallet.sign(formatted_attestations, act_issuer.privateKey),
      claim_id: claim_id,
      sub: act_sub.publicKey,
      topic: u.str2hexstring(claim_topic),
      expires: expires,
      verification_uri: u.str2hexstring(verification_uri),
    };
  }

  /**
   * checks if the script is deployed
   * @param network
   * @param contractHash
   * @returns {Promise<any>}
   */
  static async deployed(network: any, contractHash: any): Promise<any> {
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
  static async createClaim(network: any, contractHash: any, {attestations, signed_by, signature, claim_id, sub, claim_topic, expires, verification_uri}: any, wif: any): Promise<any> {
    const operation = 'createClaim';
    const args = [
      attestations,
      signed_by,
      signature,
      claim_id,
      sub,
      claim_topic,
      expires,
      verification_uri];

    return await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }

  /**
   * checks if a claim exists on the platform using claim_id
   * @param network
   * @param contractHash
   * @param claimId
   * @returns {Promise<any>}
   */
  static async getClaimExists(network: any, contractHash: any, claimId: any): Promise<any> {
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
   * @returns {Promise<any>}
   */
  static async getClaimHasExpired(network: any, contractHash: any, claimId: any): Promise<any> {
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
  static async getClaimIssuer(network: any, contractHash: any, claimId: any): Promise<any> {
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
  static async getClaimSignature(network: any, contractHash: any, claimId: any): Promise<any> {
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
  static async getClaimSubject(network: any, contractHash: any, claimId: any): Promise<any> {
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
  static async getClaimTopic(network: any, contractHash: any, claimId: any): Promise<any> {
    const operation = 'getClaimTopic'
    const args = [u.str2hexstring(claimId)]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0) {
      return u.hexstring2str(response.result.stack[0].value)
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
  static async getClaimVerificationURI(network: any, contractHash: any, claimId: any): Promise<any> {
    const operation = 'getClaimVerificationURI'
    const args = [u.str2hexstring(claimId)]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0) {
      return u.hexstring2str(response.result.stack[0].value)
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
  static async getContractName(network: any, contractHash: any): Promise<any> {
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
  static async registerContractName(network: any, contractHash: any, cnsHash: any, wif: any): Promise<any> {
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
  static async updateContractAddress(network: any, contractHash: any, cnsHash: any, wif: any): Promise<any> {
    const operation = 'updateContractAddress'
    const args = [cnsHash]
    return await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }

  // Verification domain

  static async attestationEncryptionMethod(network: any, contractHash: any, claimId: any, attestationIdentifier: any): Promise<any> {
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
  static async attestationIdentifierExists(network: any, contractHash: any, claimId: any, attestationIdentifier: any): Promise<any> {
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
  static async attestationIdentifierRemark(network: any, contractHash: any, claimId: any, attestationIdentifier: any): Promise<any> {
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
  static async attestationIdentifierValue(network: any, contractHash: any, claimId: any, attestationIdentifier: any): Promise<any> {
    const operation = 'attestationIdentifierValue'
    const args = [u.str2hexstring(claimId), u.str2hexstring(attestationIdentifier)]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0) {
      return response.result.stack[0].value
    }
    return null
  }

}

/*
function formatAttestation(attestation: any): any {

  const valType = typeof attestation.value;
  let fieldValue;

  switch (valType) {
    case 'boolean':
      fieldValue = intToHexWithLengthPrefix(attestation.value ? 1 : 0)
      break;

    case 'number':
      if (isInt(attestation.value)) {
        fieldValue = intToHexWithLengthPrefix(attestation.value)
      } else if (isFloat(attestation.value)) {
        fieldValue = u.num2fixed8(attestation.value)
      } else {
        throw new Error('unknown number type: ' + attestation.value)
      }
      break

    case 'string':
      if (attestation.encryption !== 0) {
        fieldValue = stringToHexWithLengthPrefix(attestation.value)
      } else {
        // encrypted values are already hex encoded
        fieldValue = hexStringWithLengthPrefix(attestation.value)
      }
      break

    default:
      throw new Error(valType + ' unhandled')
  }

  const encryption = intToHexWithLengthPrefix(attestation.encryption)
  const fieldIdentifier = stringToHexWithLengthPrefix(attestation.identifier)
  const fieldRemark = stringToHexWithLengthPrefix(attestation.remark)

  const payload = 80 + u.int2hex(4) + '00' + encryption + '00' + fieldIdentifier + '00' + fieldRemark + '00' + fieldValue

  return payload
}
*/
