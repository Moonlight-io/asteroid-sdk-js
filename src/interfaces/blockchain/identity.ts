import { EncryptionMethod } from '../misc'

export interface KeychainKey {
  holder?: string
  owner?: string
  iss?: string
  sub?: string
  type?: string
  payload?: string
  signature?: string
  encryption?: EncryptionMethod
  deleted: boolean
  pointer: number
}
