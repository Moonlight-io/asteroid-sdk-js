import { EmptyObject } from '../misc'
import { UserAttribute, UserAttributeHeader, UserAttributeHeadersResponse } from '../attributes'

// #region Register

export interface RegisterEmailRequest {
  email: string
}

export type RegisterEmailResponse = EmptyObject

export interface RegisterEmailWithSecretRequest {
  email: string
  secret: string
}

export interface RegisterEmailWithSecretResponse {
  dynamic_token: string
}

export interface UpdatePasswordRequest {
  dynamic_token: string
  password: string
  token_type: string
}

export type UpdatePasswordResponse = EmptyObject

export interface UpdatePasswordJwtRequest {
  access_token: string
  password: string
}

export type UpdatePasswordJwtResponse = EmptyObject

export interface RequestPasswordResetRequest {
  email: string
}

export type RequestPasswordResetResponse = EmptyObject

// #endregion

// #region Authenticate

export interface LoginEmailRequest {
  email: string
  password: string
}

export interface LoginResponse {
  access_token: string
  refresh_token: string
  first_session: boolean
}

export type LoginEmailResponse = LoginResponse // Aliasing

export interface LoginOauthRequest {
  provider: string // TODO: defined string list
  payload: object // TODO: elaborate
}

export type LoginOauthResponse = LoginResponse // Aliasing

export interface SetUserGroupByEmailRequest {
  access_token: string
  email: string
  group: string // TODO: should this be a defined list?
}

export type SetUserGroupByEmailResponse = EmptyObject

export interface NewAccessTokenRequest {
  refresh_token: string
}

export interface NewAccessTokenResponse {
  access_token: string
}

export interface LogoutRequest {
  access_token: string
  refresh_token: string
}

export type LogoutResponse = EmptyObject

// #endregion

// #region Attributes

export interface UserAttributesResponse {
  attributes: UserAttribute[]
}

export interface CreateAttributesRequest {
  access_token: string
  attributes: UserAttribute[]
}

export type CreateAttributesResponse = UserAttributesResponse // Aliasing

export interface UpdateAttributesRequest {
  access_token: string
  attributes: UserAttribute[]
}

export type UpdateAttributesResponse = UserAttributesResponse // Aliasing

export interface DeleteAttributesRequest {
  access_token: string
  attributes: UserAttributeHeader[]
}

export type DeleteAttributesResponse = UserAttributesResponse // Aliasing

export interface GetAttributeHeadersByTypesRequest {
  access_token: string
  types: string[]
}

export type GetAttributeHeadersByTypesResponse = UserAttributeHeadersResponse // Aliasing

export interface GetAttributesByIdsRequest {
  access_token: string
  attributes: UserAttributeHeader[]
}

export type GetAttributesByIdsRequestResponse = UserAttributesResponse // Aliasing

// #endregion

// #region Profiles

// #endregion

// #region Logs

// #endregion

// #region Claims

// #endregion
