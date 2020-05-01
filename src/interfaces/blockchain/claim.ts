export interface ClaimInfo {
  claim_id: string
  attestations: ClaimAttestationItem[]
  signed_by: string
  signature: string
  sub: string
  topic: string
  expires: boolean
  verification_uri: string
}

export interface ClaimAttestationItem {
  remark: string
  value: string
  encryption: string
}

export interface ClaimTopicInfo {
  claim_topic: string
  identifiers: string[]
  issuer: string
}
