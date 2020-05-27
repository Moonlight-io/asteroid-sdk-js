import { EncryptionMethod } from '../misc'

export interface ClaimInfo {
  claim_id: string
  attestations: ClaimAttestationItem[]
  signed_by?: string
  signature?: string
  sub: string // Aka. 'subject'
  claim_topic: string
  expires?: number // Undefined when expiry date is not set
  verification_uri: string
}

export interface FormattedClaimInfo {
  claim_id: string
  formattedAttestations: string
  signed_by?: string
  signature?: string
  sub: string // Aka. 'subject'
  claim_topic: string
  expires?: number // Undefined when expiry date is not set
  verification_uri: string
  keys: AttestationKey[]
}

export interface AttestationKey {
  identifier?: string
  key: string
}

export interface ClaimAttestationItem {
  remark: string
  identifier?: string
  value: string
  encryption: EncryptionMethod
  decrypted_value?: string
}

export interface ClaimTopicInfo {
  claim_topic: string
  identifiers: string[]
  issuer: string
}

export interface EncryptedPayload {
  key: any
  value: string
}
