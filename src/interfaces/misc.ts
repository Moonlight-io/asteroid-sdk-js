export interface EmptyObject {
  [key: string]: never
}

export type ConnectionNetworkType = 'stage' | 'production'

export interface ConnectionNetworkConfig {
  asteroidDomainUserBaseUrl: string
  asteroidDomainWorkerBaseUrl: string
}

export type UpdatePasswordTokenType = 'NewAccount' | 'PasswordReset'

export interface NetworkItem {
  name: string
  protocol?: ProtocolItem
  nodes?: string[]
  extra: { [key: string]: string }
}

export interface ProtocolItem {
  magic: number
  addressVersion: number
  standbyValidators: string[]
  seedList: string[]
  systemFee: { [key: string]: number }
}

export interface TermsApprovalItem {
  terms_type: string
  approval_timestamp: number
}
