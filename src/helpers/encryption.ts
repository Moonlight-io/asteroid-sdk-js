import crypto from 'crypto'
import elliptic from 'elliptic'
import { u, wallet } from '@cityofzion/neon-js'
import { ClaimsHelper } from '.'

export class Encryption {
  // consider changing to GCM
  static aes256CbcEncrypt(iv: Buffer, key: Buffer, plaintext: Buffer) {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
    const firstChunk = cipher.update(plaintext)
    const secondChunk = cipher.final()
    return Buffer.concat([firstChunk, secondChunk])
  }

  static aes256CbcDecrypt(iv: Buffer, key: Buffer, ciphertext: Buffer) {
    const cipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
    const firstChunk = cipher.update(ciphertext)
    const secondChunk = cipher.final()
    return Buffer.concat([firstChunk, secondChunk])
  }

  /**
   * decrypts an ECIES encryption payload
   * @param privateKey - the private key of the recipient
   * @param payload - the ECIES payload
   */
  static p256ECIESDecrypt(privateKey: string, payload: any): Buffer {
    const curve = new elliptic.ec('p256')

    const ephemPublicKey = curve.keyFromPublic(payload.ephemPublicKey, 'hex')
    const privKey = curve.keyFromPrivate(privateKey, 'hex')

    const px = privKey.derive(ephemPublicKey.getPublic())
    const hash = crypto
      .createHash('sha512')
      .update(px.toString('hex'))
      .digest()
    const encryptionKey = hash.slice(0, 32)

    // verify the hmac
    const macKey = hash.slice(32)
    const dataToMac = Buffer.concat([Buffer.from(payload.iv, 'hex'), Buffer.from(payload.ephemPublicKey, 'hex'), Buffer.from(payload.ciphertext, 'hex')])
    const realMac = crypto
      .createHmac('sha256', macKey)
      .update(dataToMac)
      .digest()
    if (payload.mac !== realMac.toString('hex')) {
      throw new Error('invalid payload: hmac misalignment')
    }

    return Encryption.aes256CbcDecrypt(Buffer.from(payload.iv, 'hex'), encryptionKey, Buffer.from(payload.ciphertext, 'hex'))
  }

  /**
   * encrypts a buffer using ECIES and returns a payload containing the message and signature.
   * @param publicKey - the public key of the recipient
   * @param payload - the payload buffer to encrypt
   * @param opts - optional parameters which will default if not configured
   */
  static p256ECIESEncrypt(publicKey: string, payload: Buffer, opts?: any): object {
    const curve = new elliptic.ec('p256')

    const pub = curve.keyFromPublic(publicKey, 'hex').getPublic()

    const op = opts || {}

    const ephem = curve.genKeyPair()
    const ephemPublicKey = ephem.getPublic(true, 'hex')

    // create the shared ECHD secret
    const px = ephem.derive(pub)

    // hash the secret
    const hash = crypto
      .createHash('sha512')
      .update(px.toString('hex'))
      .digest()

    // define the initiation vector
    const iv = op.iv || crypto.randomBytes(16)
    const encryptionKey = hash.slice(0, 32)
    const macKey = hash.slice(32)

    const ciphertext = Encryption.aes256CbcEncrypt(iv, encryptionKey, payload)

    const dataToMac = Buffer.concat([iv, Buffer.from(ephemPublicKey, 'hex'), ciphertext])

    const hmacSha = crypto
      .createHmac('sha256', macKey)
      .update(dataToMac)
      .digest()
    const mac = Buffer.from(hmacSha)

    return {
      iv: iv.toString('hex'),
      ephemPublicKey,
      ciphertext: ciphertext.toString('hex'),
      mac: mac.toString('hex'),
    }
  }

  /**
   * formats an attestation using hybrid(PGP-like) encryption
   * @param attestation
   * @returns {string}
   */
  static encryptionHybrid(attestation: any): string {
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
}
