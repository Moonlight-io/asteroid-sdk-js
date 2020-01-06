import { u, wallet } from '@cityofzion/neon-js'
import { NeoCommon } from '.'

export class NeoContractClaims {

  static buildClaim(claim_id: string, attestations: any, expires: number, verification_uri: string, wif: string, verbose: boolean = false): any {
    let account = new wallet.Account(wif);

    if (attestations.length <= 0) {
      console.log('attestations list size must be > 0');
      return;
    }

    let attestationList = [];

    // iterate over all attestations attached to the claimData
    for (let i = 0; i < attestations.length; i++) {
      let attestation = attestations[i];

      if (attestation.is_encrypted) {
        // value must be encrypted before storing on-chain, sign as issuer
        attestation.value = wallet.sign(attestation.value, account.privateKey);
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
      signed_by: account.publicKey,
      signature: wallet.sign(attestations, account.privateKey),
      claim_id: claim_id,
      expires: expires,
      verification_uri: u.str2hexstring(verification_uri)
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
    let response =  await NeoCommon.invokeFunction(network, contractHash, operation, []);
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
    let response =  await NeoCommon.invokeFunction(network, contractHash, operation, args);
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
    const args = [
      u.str2hexstring(claimId)
    ];
    let response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0) {
      return !(response.result.stack[0].value === '' || !response.result.stack[0].value);
    }
    return null
  }

  /**
   * creates a new claim on the platform
   * @param network
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
  static async createClaim(network: any, contractHash: any, attestations: any, signed_by: any, signature: any, claim_id: any, expires: any, verification_uri: any, wif: any): Promise<any> {
    const operation = 'createClaim';
    const args = [
      attestations,
      signed_by,
      signature,
      claim_id,
      expires,
      verification_uri
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
    const args = [
      u.str2hexstring(claimId)
    ];
    let response = await NeoCommon.invokeFunction(network, contractHash, operation, args);
    if (response.result.stack.length > 0) {
      return response.result.stack[0].value;
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
  static async getClaimSignature(network: any, contractHash: any, claim_id: any): Promise<any> {
    const operation = 'getClaimSignature';
    const args = [
      u.str2hexstring(claim_id)
    ];
    let response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0) {
      return response.result.stack[0].value;
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
  static async getClaimVerificationURI(network: any, contractHash: any, claim_id: any): Promise<any> {
    const operation = 'getClaimVerificationURI';
    const args = [
      u.str2hexstring(claim_id)
    ];
    let response = await NeoCommon.invokeFunction(network, contractHash, operation, args);
    if (response.result.stack.length > 0) {
      return u.hexstring2str(response.result.stack[0].value);
    }
    return null
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
    let response = await NeoCommon.invokeFunction(network, contractHash, operation, []);
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
    const operation = 'registerContractName';
    let account = new wallet.Account(wif);

    const args = [
      cnsHash,
      account.publicKey
    ];
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
    const operation = 'updateContractAddress';
    const args = [
      cnsHash
    ];
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
    const args = [
      u.str2hexstring(claimId),
      u.str2hexstring(attestationIdentifier)
    ];
    let response = await NeoCommon.invokeFunction(network, contractHash, operation, args);
    if (response.result.stack.length > 0) {
      return !(response.result.stack[0].value === '' || !response.result.stack[0].value);
    }
    return null
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
    const args = [
      u.str2hexstring(claimId),
      u.str2hexstring(attestationIdentifier)
    ];
    let response = await NeoCommon.invokeFunction(network, contractHash, operation, args);
    if (response.result.stack.length > 0) {
      return u.hexstring2str(response.result.stack[0].value);
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
    const operation = 'attestationIdentifierValue';
    const args = [
      u.str2hexstring(claimId),
      u.str2hexstring(attestationIdentifier)
    ];
    let response = await NeoCommon.invokeFunction(network, contractHash, operation, args);
    if (response.result.stack.length > 0) {
      return response.result.stack[0].value;
    }
    return null
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
    const args = [
      u.str2hexstring(claimId),
      u.str2hexstring(attestationIdentifier)
    ];
    let response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0) {
      return !(response.result.stack[0].value === '' || !response.result.stack[0].value);
    }
    return null
  }

}

function formatAttestation(attestation: any, verbose: boolean = false): any {
  if (verbose) {
    console.log('formatAttestation()');
    console.log(attestation);
    console.log(typeof (attestation.value));
  }
  let valType = typeof (attestation.value);
  console.log(valType);
  let fieldValue;

  switch (valType) {
    case 'boolean':
      fieldValue = intToHexWithLengthPrefix(attestation.value ? 1 : 0);
      break;
    case 'number':
      if (isInt(attestation.value)) {
        fieldValue = intToHexWithLengthPrefix(attestation.value);
      } else if (isFloat(attestation.value)) {
        fieldValue = u.num2fixed8(attestation.value);
      } else {
        throw new Error('unknown number type: ' + attestation.value)
      }
      break;
    case 'string':
      if (!attestation.is_encrypted) {
        fieldValue = stringToHexWithLengthPrefix(attestation.value);
      } else {
        // encrypted values are already hex encoded
        fieldValue = hexStringWithLengthPrefix(attestation.value);
      }
      break;
    default:
      throw new Error(valType + ' unhandled')
  }

  let fieldIsEncrypted = intToHexWithLengthPrefix(attestation.is_encrypted ? 1 : 0);
  let fieldIdentifier = stringToHexWithLengthPrefix(attestation.identifier);
  let fieldRemark = stringToHexWithLengthPrefix(attestation.remark);

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
  const bytes = u.str2ab(value || "");
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
