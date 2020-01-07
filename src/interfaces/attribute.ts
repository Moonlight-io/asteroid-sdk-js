import { ErrorResponse, AttributeDateStatus } from './api/misc'

export type AttributeClaimState = 'pending' | 'needs attention' | 'verified' // TODO: need to be provided with actual available options

export interface AttributeClaimItem {
  claim_id: string
  state: AttributeClaimState
}

export interface UserAttributePayload {
  created_date?: number | string
  deleted_date?: number | string
  edited_date?: number | string
  is_primary?: 1 | 0
  remark?: string
  user_id?: number
  verified?: 1 | 0
  parent_id?: string
  parent_type?: string
}

// -- Header

export interface AssociatedProfile {
  profile_id: string
  remark: string
}

export interface UserAttributeHeader {
  type: string
  attr_id?: string
  associated_profiles?: AssociatedProfile[]
  payload?: UserAttributePayload
}

export interface UserAttributeHeadersResponse {
  headers: UserAttributeHeader[]
}

// -- Content

export interface BaseUserAttribute<T> {
  type: string
  attr_id?: string
  state?: string
  associated_profiles?: AssociatedProfile[]
  claims?: AttributeClaimItem[]
  payload?: T
  error?: ErrorResponse
}

export interface UserEmailAttributePayload extends UserAttributePayload {
  email?: string
}
export type UserEmailAttribute = BaseUserAttribute<UserEmailAttributePayload>

export interface UserNameAttributePayload extends UserAttributePayload {
  name?: string
}
export type UserNameAttribute = BaseUserAttribute<UserNameAttributePayload>

export interface UserTelephoneAttributePayload extends UserAttributePayload {
  country_code?: string
  area_code?: string
  phone_number?: string
  extension?: string
}
export type UserTelephoneAttribute = BaseUserAttribute<UserTelephoneAttributePayload>

export interface UserAddressAttributePayload extends UserAttributePayload {
  name?: string
  address_1?: string
  address_2?: string
  city?: string
  region?: string
  postal_code?: string
  country?: string
}
export type UserAddressAttribute = BaseUserAttribute<UserAddressAttributePayload>

export interface UserPreferencesAttributePayload extends UserAttributePayload {
  timezone?: string
  preferred_language?: string
  country?: string
}
export type UserPreferencesAttribute = BaseUserAttribute<UserPreferencesAttributePayload>

export interface UserOauthAttributePayload extends UserAttributePayload {
  domain?: string
}
export type UserOauthAttribute = BaseUserAttribute<UserOauthAttributePayload>

export interface UserStatementAttributePayload extends UserAttributePayload {
  statement?: string
}
export type UserStatementAttribute = BaseUserAttribute<UserStatementAttributePayload>

export interface UserOverviewAttributePayload extends UserAttributePayload {
  content?: string
}
export type UserOverviewAttribute = BaseUserAttribute<UserOverviewAttributePayload>

export interface UserAvatarAttributePayload extends UserAttributePayload {
  object?: string
  path?: string
}
export type UserAvatarAttribute = BaseUserAttribute<UserAvatarAttributePayload>

export interface UserDescriptionAttributePayload extends UserAttributePayload {
  description?: string
}
export type UserDescriptionAttribute = BaseUserAttribute<UserDescriptionAttributePayload>

export interface UserPositionAttributePayload extends UserAttributePayload {
  issuer_id?: string
  issuer_name?: string
  role_name?: string
  role_type?: string
  city?: string
  country?: string
  descriptions?: UserDescriptionAttribute[]
  year_from?: number
  month_from?: number
  year_to?: number
  month_to?: number
  status?: AttributeDateStatus
}
export type UserPositionAttribute = BaseUserAttribute<UserPositionAttributePayload>

export interface UserSkillAttributePayload extends UserAttributePayload {
  name?: string
  proficiency?: string
  points?: number
}
export type UserSkillAttribute = BaseUserAttribute<UserSkillAttributePayload>

export interface UserAcademicAttributePayload extends UserAttributePayload {
  issuer_id?: string
  issuer_name?: string
  credential?: string
  city?: string
  country?: string
  descriptions?: UserDescriptionAttribute[]
  year_from?: number
  month_from?: number
  year_to?: number
  month_to?: number
  status?: AttributeDateStatus
}
export type UserAcademicAttribute = BaseUserAttribute<UserAcademicAttributePayload>

export interface UserAccomplishmentAttributePayload extends UserAttributePayload {
  issuer_id?: string
  issuer_name?: string
  merit?: string
  descriptions?: UserDescriptionAttribute[]
  year_from?: number
  month_from?: number
  year_to?: number
  month_to?: number
  status?: AttributeDateStatus
}
export type UserAccomplishmentAttribute = BaseUserAttribute<UserAccomplishmentAttributePayload>

export interface UserMembershipAttributePayload extends UserAttributePayload {
  issuer_id?: string
  issuer_name?: string
  membership_name?: string
  descriptions?: UserDescriptionAttribute[]
  year_from?: number
  month_from?: number
  year_to?: number
  month_to?: number
  status?: AttributeDateStatus
}
export type UserMembershipAttribute = BaseUserAttribute<UserMembershipAttributePayload>

export interface UserExtracurricularAttributePayload extends UserAttributePayload {
  issuer_id?: string
  issuer_name?: string
  position?: string
  descriptions?: UserDescriptionAttribute[]
  year_from?: number
  month_from?: number
  year_to?: number
  month_to?: number
  status?: AttributeDateStatus
}
export type UserExtracurricularAttribute = BaseUserAttribute<UserExtracurricularAttributePayload>

export interface UserAliasAttributePayload extends UserAttributePayload {
  alias?: string
  association?: string
}
export type UserAliasAttribute = BaseUserAttribute<UserAliasAttributePayload>

export interface UserTitleAttributePayload extends UserAttributePayload {
  title?: string
}
export type UserTitleAttribute = BaseUserAttribute<UserTitleAttributePayload>

export interface UserSocialLinkAttributePayload extends UserAttributePayload {
  associated_url?: string
  association?: string
  handle?: string
}
export type UserSocialLinkAttribute = BaseUserAttribute<UserSocialLinkAttributePayload>

// -- Abstraction

export type UserAttribute = UserEmailAttribute | UserNameAttribute | UserTelephoneAttribute | UserAddressAttribute | UserOauthAttribute | UserStatementAttribute | UserSocialLinkAttribute
