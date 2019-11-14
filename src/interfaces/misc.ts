export interface EmptyObject {
  [key: string]: never
}

export type UpdatePasswordTokenType = 'NewAccount' | 'PasswordReset'
