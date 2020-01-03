import { u, wallet } from '@cityofzion/neon-js'
import { NeoCommon } from '.'

export class NeoContractClaims {

  static buildClaim(claim_id: string, attestations: any, expires: boolean, verification_uri: string, wif: string, verbose: boolean = false): any {
    let account = new wallet.Account(wif);

    if (attestations.length <= 0) {
      console.log('attestations list size must be > 0');
      return;
    }

    let attestationList = [];

    // iterate over all attestations attached to the claimData
    for (let i = 0; i < attestations.length; i++) {
      let attestation = attestations[i];

      if (attestation.IsEncrypted) {
        // value must be encrypted before storing on-chain, sign as issuer
        attestation.value = wallet.sign(attestation.Value, account.privateKey);
      }

      let payload = formatAttestation(attestation, verbose);
      attestationList.push(payload);
    }

    claim_id = u.str2hexstring(claim_id);
    attestationList.push('00' + hexLength(claim_id) + claim_id);

    const attestationBytes = attestationList.join('');

    attestations = 80 + u.int2hex(attestationList.length)
      + attestationBytes;

    const contractPayload = {
      attestations: attestations,
      signedBy: account.publicKey,
      signature: wallet.sign(attestations, account.privateKey),
      claimId: claim_id,
      expires: expires,
      verificationURI: verification_uri
    };

    if (verbose) {
      console.log(attestationList);
      console.log('-'.repeat(120));
      console.log(contractPayload);
    }
    return contractPayload
  }

  /**
   * checks if the script is deployed
   * @param network
   * @param contractHash
   * @returns {Promise<any>}
   */
  static async deployed(network: any, contractHash: any): Promise<any> {
    const operation = 'deployed';
    let response =  await NeoCommon.invokeFunction(network, contractHash, operation, [])
    if (response.result.stack.length > 0) {
      return !(response.result.stack[0].value === '' || !response.result.stack[0].value);
    }
    return false
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
    const args = [
      u.str2hexstring(claimId)
    ];
    let response =  await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0) {
      return !(response.result.stack[0].value === '' || !response.result.stack[0].value);
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
  static async createClaim(network: any, contractHash: any, attestations: any, signedBy: any, signature: any, claimID: any, expires: any, verificationURI: any, wif: any): Promise<any> {
    const operation = 'createClaim';
    const args = [
      attestations,
      signedBy,
      signature,
      claimID,
      expires,
      u.str2hexstring(verificationURI)
    ];
    return await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
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
  static async registerContractName(network: any, contractHash: any, cnsHash: any, owner: any, wif: any): Promise<any> {
    const operation = 'registerContractName';
    const args = [cnsHash, owner];
    return await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
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
  static async updateContractAddress(network: any, contractHash: any, cnsHash: any, wif: any): Promise<any> {
    const operation = 'updateContractAddress';
    const args = [cnsHash];
    return await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
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

function formatAttestation(attestation: any, verbose: boolean = false): any {
  if (verbose) {
    console.log('formatAttestation()');
    console.log(attestation);
  }
  let valType = typeof (attestation.Value);
  let output;

  switch (valType) {
    case 'boolean':
      output = intToHexWithLengthPrefix(attestation.Value ? 1 : 0);
      break;
    case 'number':
      if (isInt(attestation.Value)) {
        output = intToHexWithLengthPrefix(attestation.Value);
      } else if (isFloat(attestation.Value)) {
        output = u.num2fixed8(attestation.Value);
      } else {
        throw new Error('unknown number type: ' + attestation.Value)
      }
      break;
    case 'string':
      if (!attestation.IsEncrypted) {
        output = stringToHexWithLengthPrefix(attestation.Value);
      } else {
        // encrypted values are already hex encoded
        output = hexStringWithLengthPrefix(attestation.Value);
      }
      break;
    default:
      throw new Error(valType + ' unhandled')
  }

  let fieldIsEncrypted = intToHexWithLengthPrefix(attestation.IsEncrypted ? 1 : 0);
  let fieldIdentifier = stringToHexWithLengthPrefix(attestation.Identifier);
  let fieldRemark = stringToHexWithLengthPrefix(attestation.Remark);
  let fieldValue = output;

  let payload = 80 + u.int2hex(4)
    + '00' + fieldIsEncrypted
    + '00' + fieldIdentifier
    + '00' + fieldRemark
    + '00' + fieldValue;

  if (verbose) {
    console.log('payload: %s\n%s\n\n', payload, '-'.repeat(120));
  }
  return payload;
}

function intToHexWithLengthPrefix(value: number): string {
  const bytes = u.int2hex(value);
  const len = u.int2hex(bytes.length / 2);
  return len + bytes;
}

function hexStringWithLengthPrefix(hexValue: string): string {
  const bytes = u.hexstring2ab(hexValue);
  const len = u.int2hex(bytes.length);
  return len + hexValue;
}

function stringToHexWithLengthPrefix(value: string): string {
  const bytes = u.str2ab(value);
  const len = u.int2hex(bytes.length);
  return len + u.ab2hexstring(bytes);
}

function isInt(n: any): any {
  return Number(n) === n && n % 1 === 0;
}

function isFloat(n: any): any {
  return Number(n) === n && n % 1 !== 0;
}


function hexLength(hexString: string): any {
  const size = hexString.length / 2;
  if (size <= 75) {
    return u.num2hexstring(size);
  } else if (size < 0x100) {
    return u.num2hexstring(size);
  } else if (size < 0x10000) {
    return u.num2hexstring(size, 2, true);
  } else if (size < 0x100000000) {
    return u.num2hexstring(size, 4, true);
  }
  throw new Error('hexString is too big to use: ' + hexString);
}
