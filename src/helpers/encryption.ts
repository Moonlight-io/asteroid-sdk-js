import crypto from 'crypto'
import elliptic from 'elliptic'
import { u, wallet } from '@cityofzion/neon-js'
import { ClaimsHelper } from '.'
import { EncryptedPayload, KeychainKey, SecureAttestation, EncryptionMethod } from '../interfaces'

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
    const hash = crypto.createHash('sha512').update(px.toString('hex')).digest()
    const encryptionKey = hash.slice(0, 32)

    // verify the hmac
    const macKey = hash.slice(32)
    const dataToMac = Buffer.concat([Buffer.from(payload.iv, 'hex'), Buffer.from(payload.ephemPublicKey, 'hex'), Buffer.from(payload.ciphertext, 'hex')])
    const realMac = crypto.createHmac('sha256', macKey).update(dataToMac).digest()
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
    const hash = crypto.createHash('sha512').update(px.toString('hex')).digest()

    // define the initiation vector
    const iv = op.iv || crypto.randomBytes(16)
    const encryptionKey = hash.slice(0, 32)
    const macKey = hash.slice(32)

    const ciphertext = Encryption.aes256CbcEncrypt(iv, encryptionKey, payload)

    const dataToMac = Buffer.concat([iv, Buffer.from(ephemPublicKey, 'hex'), ciphertext])

    const hmacSha = crypto.createHmac('sha256', macKey).update(dataToMac).digest()
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
   */
  static encryptionSymAES256(payload: string): EncryptedPayload {
    const keyChainKey = {
      salt: crypto.randomBytes(16).toString('hex'),
      iv: crypto.randomBytes(16).toString('hex'),
    }

    const hash = crypto.createHash('sha256')
    hash.update(keyChainKey.salt)
    const key = hash.digest().slice(0, 32)

    const encryptedValue = Encryption.aes256CbcEncrypt(Buffer.from(keyChainKey.iv, 'hex'), key, Buffer.from(payload)).toString('hex')

    const res: EncryptedPayload = {
      key: keyChainKey,
      value: encryptedValue,
    }
    return res
  }

  static encryptionp256ECIES(payload: string, publicKey: string): EncryptedPayload {
    const encryptedPayload = Encryption.p256ECIESEncrypt(publicKey, Buffer.from(payload))
    const res: EncryptedPayload = {
      key: undefined,
      value: JSON.stringify(encryptedPayload),
    }
    return res
  }

  static encryptPayload(method: EncryptionMethod, payload: string, publicKey?: string): EncryptedPayload {
    switch (method) {
      case 'unencrypted':
        const res: EncryptedPayload = {
          key: undefined,
          value: payload,
        }
        return res

      case 'root_ecies':
      case 'holder_ecies':
        if (!publicKey) {
          throw new Error('this method requires a public key')
        }
        return this.encryptionp256ECIES(payload, publicKey)

      case 'symmetric_aes256':
        return this.encryptionSymAES256(payload)

      default:
        throw new Error('invalid encryption type: ' + method)
    }
  }

  static decryptPayload(method: EncryptionMethod, payload: string, key?: string): string {
    switch (method) {
      case 'unencrypted':
        return payload

      case 'root_ecies':
      case 'holder_ecies':
        if (!key) {
          throw new Error('this method requires a private key')
        }
        try {
          const res = Encryption.p256ECIESDecrypt(key, JSON.parse(payload))
          return res.toString()
        } catch (e) {
          throw new Error('unable to decrypt the payload using this encryption method')
        }
      case 'symmetric_aes256':
        if (!key) {
          throw new Error('this method requires a key')
        }
        const formattedKey = JSON.parse(key)
        const hash = crypto.createHash('sha256')
        hash.update(formattedKey.salt)
        const secret = hash.digest().slice(0, 32)
        return Encryption.aes256CbcDecrypt(Buffer.from(formattedKey.iv, 'hex'), secret, Buffer.from(payload, 'hex')).toString()

      default:
        throw new Error('invalid encryption method: ' + method)
    }
  }
}
