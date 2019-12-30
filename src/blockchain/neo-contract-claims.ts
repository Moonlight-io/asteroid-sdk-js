import { u } from '@cityofzion/neon-js'
import { NeoCommon } from '.'

export class NeoContractClaims {

  /**
   * checks if the script is deployed
   * @param network
   * @param contractHash
   * @returns {Promise<any>}
   */
  static async deployed(network: any, contractHash: any): Promise<any> {
    const operation = 'deployed';
    return await NeoCommon.invokeFunction(network, contractHash, operation, [])
  }

  //Claims domain

  /**
   * checks if a claim exists on the platform using claim_id
   * @param network
   * @param contractHash
   * @param claimId
   * @returns {Promise<any>}
   */
  static async claimExists(network: any, contractHash: any, claimId: any): Promise<any> {
    const operation = 'claimExists';
    const args = [claimId];
    return await NeoCommon.invokeFunction(network, contractHash, operation, args)
  }

  /**
   * checks if the target claim is expired
   * @param network
   * @param contractHash
   * @param claimId
   * @returns {Promise<any>}
   */
  static async claimHasExpired(network: any, contractHash: any, claimId: any): Promise<any> {
    const operation = 'claimHasExpired';
    const args = [claimId];
    return await NeoCommon.invokeFunction(network, contractHash, operation, args)
  }

  /**
   * creates a new claim on the platform
   * @param network
   * @param api
   * @param contractHash
   * @param attestations
   * @param signedBy
   * @param signature
   * @param claimID
   * @param expires
   * @param verificationURI
   * @param wif
   * @returns {Promise<any>}
   */
  static async createClaim(network: any, api: any, contractHash: any, attestations: any, signedBy: any, signature: any, claimID: any, expires: any, verificationURI: any, wif: any): Promise<any> {
    const operation = 'createClaim';
    const args = [attestations, signedBy, signature, claimID, expires, verificationURI];
    return await NeoCommon.contractInvocation(network, api, contractHash, operation, args, wif)
  }

  /**
   * gets the claim issuer
   * @param network
   * @param contractHash
   * @param claimId
   * @returns {Promise<any>}
   */
  static async getClaimIssuer(network: any, contractHash: any, claimId: any): Promise<any> {
    const operation = 'getClaimIssuer';
    const args = [claimId];
    return await NeoCommon.invokeFunction(network, contractHash, operation, args)
  }

  /**
   * gets the target claim's signature
   * @param network
   * @param contractHash
   * @param claimId
   * @returns {Promise<any>}
   */
  static async getClaimSignature(network: any, contractHash: any, claimId: any): Promise<any> {
    const operation = 'getClaimSignature';
    const args = [claimId];
    return await NeoCommon.invokeFunction(network, contractHash, operation, args)
  }

  /**
   * gets the verificationURI field of the claim
   * @param network
   * @param contractHash
   * @param claimId
   * @returns {Promise<any>}
   */
  static async getClaimVerificationURI(network: any, contractHash: any, claimId: any): Promise<any> {
    const operation = 'getClaimVerificationURI';
    const args = [claimId];
    return await NeoCommon.invokeFunction(network, contractHash, operation, args)
  }

  //Contract Name Service Helpers

  /**
   * gets the contract name
   * @param network
   * @param contractHash
   * @returns {Promise<any>}
   */
  static async getContractName(network: any, contractHash: any): Promise<any> {
    const operation = 'getContractName';
    return await NeoCommon.invokeFunction(network, contractHash, operation, [])
  }

  /**
   * registers the contract against the neo contract name service
   * @param network
   * @param api
   * @param contractHash
   * @param cnsHash
   * @param owner
   * @param wif
   * @returns {Promise<any>}
   */
  static async registerContractName(network: any, api: any, contractHash: any, cnsHash: any, owner: any, wif: any): Promise<any> {
    const operation = 'registerContractName';
    const args = [cnsHash, owner];
    return await NeoCommon.contractInvocation(network, api, contractHash, operation, args, wif)
  }

  /**
   * updates the contract's address on neo contract name service
   * @param network
   * @param api
   * @param contractHash
   * @param cnsHash
   * @param wif
   * @returns {Promise<any>}
   */
  static async updateContractAddress(network: any, api: any, contractHash: any, cnsHash: any, wif: any): Promise<any> {
    const operation = 'updateContractAddress';
    const args = [cnsHash];
    return await NeoCommon.contractInvocation(network, api, contractHash, operation, args, wif)
  }

  //Verification domain

  /**
   * checks if an attestation identifier exists on a claim
   * @param network
   * @param contractHash
   * @param claimId
   * @param attestationIdentifier
   * @returns {Promise<any>}
   */
  static async attestationIdentifierExists(network: any, contractHash: any, claimId: any, attestationIdentifier: any): Promise<any> {
    const operation = 'attestationIdentifierExists';
    const args = [claimId, attestationIdentifier];
    return await NeoCommon.invokeFunction(network, contractHash, operation, args)
  }

  /**
   * retrieves an attestation message from a claim
   * @param network
   * @param contractHash
   * @param claimId
   * @param attestationIdentifier
   * @returns {Promise<any>}
   */
  static async attestationIdentifierMessage(network: any, contractHash: any, claimId: any, attestationIdentifier: any): Promise<any> {
    const operation = 'attestationIdentifierMessage';
    const args = [claimId, attestationIdentifier];
    return await NeoCommon.invokeFunction(network, contractHash, operation, args)
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
    const operation = 'attestationIdentifierValue';
    const args = [claimId, attestationIdentifier];
    return await NeoCommon.invokeFunction(network, contractHash, operation, args)
  }

  /**
   * checks if the attestation's value is encrypted
   * @param network
   * @param contractHash
   * @param claimId
   * @param attestationIdentifier
   * @returns {Promise<any>}
   */
  static async isAttestationValueEncrypted(network: any, contractHash: any, claimId: any, attestationIdentifier: any): Promise<any> {
    const operation = 'isAttestationValueEncrypted';
    const args = [claimId, attestationIdentifier];
    return await NeoCommon.invokeFunction(network, contractHash, operation, args)
  }

}
