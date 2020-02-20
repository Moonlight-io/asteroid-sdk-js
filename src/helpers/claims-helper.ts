import Neon, { u, wallet } from '@cityofzion/neon-js'
import crypto from 'crypto'
import elliptic from 'elliptic'
import { claimEncryptionModes } from '../constants/claim_encryption'
import { Encryption } from '.'

export class ClaimsHelper {

  static encryptionModeStrFromHex(value: string): string | undefined {
    const intValue = parseInt(value, 16)
    return Object.keys(claimEncryptionModes).find((key) => claimEncryptionModes[key] === intValue)
  }

  static formatAttestation(attestation: any, issuer: any, sub: any): string {
    if (!('identifier' in attestation) || !('remark' in attestation) || !('encryption' in attestation) || !('value' in attestation)) {
      throw new Error('attestation is missing a required field')
    }

    const fieldIdentifier = ClaimsHelper.stringToHexWithLengthPrefix(attestation.identifier)
    const fieldRemark = ClaimsHelper.stringToHexWithLengthPrefix(attestation.remark)

    let fieldValue: string
    switch (attestation.encryption) {
      case 'unencrypted':
        fieldValue = Encryption.encryptionUnencrypted(attestation)
        break
      case 'asymmetric_iss':
        fieldValue = Encryption.encryptionAsymmetric(attestation, issuer)
        break
      case 'asymmetric_sub':
        fieldValue = Encryption.encryptionAsymmetric(attestation, sub)
        break
      case 'zkpp':
        fieldValue = Encryption.encryptionZKPP(attestation)
        break
      case 'symmetric':
        fieldValue = Encryption.encryptionSymmetric(attestation)
        break
      case 'hybrid':
        fieldValue = Encryption.encryptionHybrid(attestation)
        break
      default:
        throw new Error('an encryption type must be provided for each attestation')
    }

    const encryptionMode = claimEncryptionModes[attestation.encryption]
    const formattedEncryptionMode = ClaimsHelper.intToHexWithLengthPrefix(encryptionMode)
    return 80 + u.int2hex(4) + '00' + formattedEncryptionMode + '00' + fieldIdentifier + '00' + fieldRemark + '00' + fieldValue
  }

  static hexLength(hexString: string): string {
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

  static intToHexWithLengthPrefix(value: number): string {
    const bytes = u.int2hex(value)
    const len = u.int2hex(bytes.length / 2)
    return len + bytes
  }

  static isInt(n: any): boolean {
    return Number(n) === n && n % 1 === 0
  }

  static isFloat(n: any): boolean {
    return Number(n) === n && n % 1 !== 0
  }

  static stringToHexWithLengthPrefix(value: string): string {
    const bytes = u.str2ab(value || '')
    const len = u.int2hex(bytes.length)
    return len + u.ab2hexstring(bytes)
  }
}
