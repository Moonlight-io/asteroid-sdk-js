export interface ClaimInfo {
  claim_id: string
  attestations: ClaimAttestationItem[]
  signed_by?: string
  signature?: string
  sub: string // Aka. 'subject'
  claim_topic: string
  expires?: number // Undefined when expiry date is not set
  verification_uri: string
  keys?: ClaimKey[]
}

export interface ClaimKey {
  identifier?: string
  key: string
}

export interface ClaimAttestationItem {
  remark: string
  identifier?: string
  value: string
  encryption: string
}

export interface ClaimTopicInfo {
  claim_topic: string
  identifiers: string[]
  issuer: string
}
