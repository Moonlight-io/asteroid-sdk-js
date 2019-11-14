export interface EmptyObject {
  [key: string]: never
}

export type ConnectionNetworkType = 'stage' | 'production'

export interface ConnectionNetworkConfig {
  asteroidDomainUserBaseUrl: string
  asteroidDomainWorkerBaseUrl: string
}

export type UpdatePasswordTokenType = 'NewAccount' | 'PasswordReset'
