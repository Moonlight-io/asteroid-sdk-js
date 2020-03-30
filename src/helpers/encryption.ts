import crypto from 'crypto'
import elliptic from 'elliptic'
import { u, wallet } from '@cityofzion/neon-js'
import { ClaimsHelper } from '.'
import { SecureAttestation } from '../interfaces'

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
   * formats an aes256 encrypted attestation
   * @param attestation
   */
  static encryptionSymAES256(attestation: any): SecureAttestation {
    const keyChainKey = {
      salt: crypto.randomBytes(16).toString('hex'),
      iv: crypto.randomBytes(16).toString('hex'),
    }

    const hash = crypto.createHash('sha256')
    hash.update(keyChainKey.salt)
    const key = hash.digest().slice(0, 32)

    const encryptedValue = Encryption.aes256CbcEncrypt(Buffer.from(keyChainKey.iv, 'hex'), key, Buffer.from(attestation.value)).toString('hex')

    let res: SecureAttestation
    res = {
      key: keyChainKey,
      value: ClaimsHelper.stringToHexWithLengthPrefix(encryptedValue),
    }

    return res
  }

  /**
   * formats an unencrypted attestation value
   * @param attestation
   */
  static encryptionUnencrypted(attestation: any): SecureAttestation {
    let value
    switch (typeof attestation.value) {
      case 'boolean':
        value = ClaimsHelper.intToHexWithLengthPrefix(attestation.value ? 1 : 0)
        break
      case 'number':
        value = u.num2fixed8(attestation.value)
        break
      case 'string':
        value = ClaimsHelper.stringToHexWithLengthPrefix(attestation.value)
        break
      default:
        throw new Error('unhandled attestation type')
    }

    let res: SecureAttestation
    res = {
      key: null,
      value,
    }

    return res
  }
}
