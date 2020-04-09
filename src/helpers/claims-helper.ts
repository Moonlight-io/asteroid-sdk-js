import Neon, { u, wallet } from '@cityofzion/neon-js'
import crypto from 'crypto'
import elliptic from 'elliptic'
import { claimEncryptionModes } from '../constants/claim_encryption'
import { Encryption } from '.'
import { SecureAttestation } from '../interfaces'

export class ClaimsHelper {
  static encryptionModeStrFromHex(value: string): string | undefined {
    const intValue = parseInt(value, 16)
    return Object.keys(claimEncryptionModes).find((key) => claimEncryptionModes[key] === intValue)
  }

  static formatAttestation(attestation: any, issuer: any, sub: any): SecureAttestation {
    if (!('remark' in attestation) || !('encryption' in attestation) || !('value' in attestation)) {
      throw new Error('attestation is missing a required field')
    }

    const fieldRemark = ClaimsHelper.stringToHexWithLengthPrefix(attestation.remark)

    let fieldValue: SecureAttestation
    switch (attestation.encryption) {
      case 'unencrypted':
        fieldValue = Encryption.encryptionUnencrypted(attestation)
        break
      case 'symmetric_aes256':
        fieldValue = Encryption.encryptionSymAES256(attestation)
        break
      default:
        throw new Error('invalid encryption type: ' + attestation.encryption)
    }

    const encryptionMode = claimEncryptionModes[attestation.encryption]
    const formattedEncryptionMode = ClaimsHelper.intToHexWithLengthPrefix(encryptionMode)

    const res: SecureAttestation = {
      key: fieldValue.key,
      value: 80 + u.int2hex(3) + '00' + fieldRemark + '00' + fieldValue.value + '00' + formattedEncryptionMode,
    }
    return res
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
