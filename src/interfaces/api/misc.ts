export interface ErrorResponse {
  code: number
  message: string
  data?: object
}

export type AttributeDateStatus = '' | 'current'

export interface GetVersionResponse {
  version: string
  uptime: number
  domain: string
}
