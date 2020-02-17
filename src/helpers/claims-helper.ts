import Neon, { u, wallet } from '@cityofzion/neon-js'
import crypto from 'crypto'
import elliptic from 'elliptic'
import { claimEncryptionModes } from '../constants/claim_encryption'

export class ClaimsHelper {

  //consider changing to GCM
  static aes256CbcEncrypt(iv: Buffer, key: Buffer, plaintext: Buffer) {
    var cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    var firstChunk = cipher.update(plaintext);
    var secondChunk = cipher.final();
    return Buffer.concat([firstChunk, secondChunk]);
  }

  static aes256CbcDecrypt(iv: Buffer, key: Buffer, ciphertext: Buffer) {
    var cipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    var firstChunk = cipher.update(ciphertext);
    var secondChunk = cipher.final();
    return Buffer.concat([firstChunk, secondChunk]);
  }

  /**
   * decrypts an ECIES encryption payload
   * @param privateKey - the private key of the recipient
   * @param payload - the ECIES payload
   */
  static decryptECIES(privateKey: string, payload: any): Buffer {
    const curve = new elliptic.ec("p256");

    let ephemPublicKey = curve.keyFromPublic(payload.ephemPublicKey, "hex")
    let privKey = curve.keyFromPrivate(privateKey, "hex")

    const Px = privKey.derive(ephemPublicKey.getPublic())
    const hash = crypto.createHash("sha512").update(Px.toString("hex")).digest();
    var encryptionKey = hash.slice(0, 32);

    //verify the hmac
    var macKey = hash.slice(32);
    var dataToMac = Buffer.concat([
      Buffer.from(payload.iv, "hex"),
      Buffer.from(payload.ephemPublicKey, "hex"),
      Buffer.from(payload.ciphertext, "hex")
    ]);
    let realMac = crypto.createHmac("sha256", macKey).update(dataToMac).digest();
    if (payload.mac != realMac.toString("hex")) {
      throw new Error("invalid payload: hmac misalignment")
    }

    return ClaimsHelper.aes256CbcDecrypt(Buffer.from(payload.iv, "hex"), encryptionKey, Buffer.from(payload.ciphertext, "hex"));
  }

  /**
   * formats an attestation using hybrid(PGP-like) encryption
   * @param attestation
   * @returns {string}
   */
  static encryptionHybrid(attestation: any): string {
    //throw new Error('this encryption method is not currently supported')
    switch (typeof attestation.value) {
      case 'boolean':
        return ClaimsHelper.intToHexWithLengthPrefix(attestation.value ? 1 : 0)
      case 'number':
        return u.num2fixed8(attestation.value)
      case 'string':
        return ClaimsHelper.stringToHexWithLengthPrefix(attestation.value)
      default:
        throw new Error('unhandled attestation type')
    }
  }

  /**
   * formats an unencrypted attestation value
   * @param {Object} attestation
   * @returns {Object}
   */
  static encryptionUnencrypted(attestation: any): string {
    switch (typeof attestation.value) {
      case 'boolean':
        return ClaimsHelper.intToHexWithLengthPrefix(attestation.value ? 1 : 0)
      case 'number':
        return u.num2fixed8(attestation.value)
      case 'string':
        return ClaimsHelper.stringToHexWithLengthPrefix(attestation.value)
      default:
        throw new Error('unhandled attestation type')
    }
  }

  /**
   * formats an attestation using zkpp
   * @param attestation
   * @returns {string}
   */
  static encryptionZKPP(attestation: any): string {
    if (!attestation.nonce) {
      throw new Error('this encryption method requires a nonce key')
    }
    throw new Error('this encryption method is not currently supported')
  }

  /**
   * formats an attestation value using symmentric encryption
   * @param attestation
   * @returns {string}
   */
  static encryptionSymmetric(attestation: any): string {
    if (!attestation.secret) {
      throw new Error('this encryption method requires a secret key')
    }
    throw new Error('this encryption method is not currently supported')
  }

  /**
   * formats an attestation value signed by the claim issuer
   * @param {Object} attestation
   * @param {wallet.account} account
   * @returns {Object}
   */
  static encryptionAsymmetric(attestation: any, account: any): string {
    const fieldValue = wallet.sign(attestation.value, account.privateKey)
    return ClaimsHelper.hexStringWithLengthPrefix(fieldValue)
  }

  /**
   * encrypts a buffer using ECIES and returns a payload containing the message and signature.
   * @param publicKey - the public key of the recipient
   * @param payload - the payload buffer to encrypt
   * @param opts - optional parameters which will default if not configured
   */
  static encryptECIES(publicKey: string, payload: Buffer, opts?: any): object {
    const curve = new elliptic.ec("p256");

    const pub = curve.keyFromPublic(publicKey, "hex")
      .getPublic()

    const op = opts || {}

    const ephem = curve.genKeyPair()
    const ephemPublicKey = ephem.getPublic(true,"hex")

    //create the shared ECHD secret
    const Px = ephem.derive(pub)

    //hash the secret
    const hash = crypto.createHash("sha512").update(Px.toString("hex")).digest();

    //define the initiation vector
    const iv = op.iv || crypto.randomBytes(16);
    const encryptionKey = hash.slice(0, 32);
    const macKey = hash.slice(32);

    const ciphertext = ClaimsHelper.aes256CbcEncrypt(iv, encryptionKey, payload);

    const dataToMac = Buffer.concat([
      iv,
      Buffer.from(ephemPublicKey,"hex"),
      ciphertext
    ]);

    let hmacSha = crypto.createHmac("sha256", macKey).update(dataToMac).digest();
    var mac = Buffer.from(hmacSha);

    return {
      iv: iv.toString("hex"),
      ephemPublicKey: ephemPublicKey,
      ciphertext: ciphertext.toString("hex"),
      mac: mac.toString("hex"),
    };
  }

  static formatAttestation(attestation: any, issuer: any, sub: any): any {
    if (!('identifier' in attestation) || !('remark' in attestation) || !('encryption' in attestation) || !('value' in attestation)) {
      throw new Error('attestation is missing a required field')
    }

    const fieldIdentifier = ClaimsHelper.stringToHexWithLengthPrefix(attestation.identifier)
    const fieldRemark = ClaimsHelper.stringToHexWithLengthPrefix(attestation.remark)

    let fieldValue
    switch (attestation.encryption) {
      case 'unencrypted':
        fieldValue = ClaimsHelper.encryptionUnencrypted(attestation)
        break
      case 'asymmetric_iss':
        fieldValue = ClaimsHelper.encryptionAsymmetric(attestation, issuer)
        break
      case 'asymmetric_sub':
        fieldValue = ClaimsHelper.encryptionAsymmetric(attestation, sub)
        break
      case 'zkpp':
        fieldValue = ClaimsHelper.encryptionZKPP(attestation)
        break
      case 'symmetric':
        fieldValue = ClaimsHelper.encryptionSymmetric(attestation)
        break
      case 'hybrid':
        fieldValue = ClaimsHelper.encryptionHybrid(attestation)
        break
      default:
        throw new Error('an encryption type must be provided for each attestation')
    }

    const encryptionMode = claimEncryptionModes[attestation.encryption]
    const formattedEncryptionMode = ClaimsHelper.intToHexWithLengthPrefix(encryptionMode)
    return 80 + u.int2hex(4) + '00' + formattedEncryptionMode + '00' + fieldIdentifier + '00' + fieldRemark + '00' + fieldValue
  }

  static hexLength(hexString: string): any {
    const size = hexString.length / 2
    if (size <= 75) {
      return u.num2hexstring(size)
    } else if (size < 0x100) {
      return u.num2hexstring(size)
    } else if (size < 0x10000) {
      return u.num2hexstring(size, 2, true)
    } else if (size < 0x100000000) {
      return u.num2hexstring(size, 4, true)
    }
    throw new Error('hexString is too big to use: ' + hexString)
  }

  static hexStringWithLengthPrefix(hexValue: string): string {
    const bytes = u.hexstring2ab(hexValue)
    const len = u.int2hex(bytes.length)
    return len + hexValue
  }

  static encryptionModeStrFromHex(value: string): any {
    const intValue = parseInt(value, 16)
    return Object.keys(claimEncryptionModes).find((key) => claimEncryptionModes[key] === intValue)
  }

  static intToHexWithLengthPrefix(value: any): string {
    const bytes = u.int2hex(value)
    const len = u.int2hex(bytes.length / 2)
    return len + bytes
  }

  static isInt(n: any): any {
    return Number(n) === n && n % 1 === 0
  }

  static isFloat(n: any): any {
    return Number(n) === n && n % 1 !== 0
  }

  static stringToHexWithLengthPrefix(value: string): string {
    const bytes = u.str2ab(value || '')
    const len = u.int2hex(bytes.length)
    return len + u.ab2hexstring(bytes)
  }
}
