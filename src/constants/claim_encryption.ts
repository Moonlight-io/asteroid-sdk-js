import { EncryptionMethod } from '../interfaces'

export const claimEncryptionModes: { [key: string]: number } = {
  unencrypted: 0,
  symmetric_aes256: 1,
}

export const inverseClaimEncryptionModes: EncryptionMethod[] = ['unencrypted', 'symmetric_aes256']
