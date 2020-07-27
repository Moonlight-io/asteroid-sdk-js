import { EmptyObject, TermsApprovalItem } from '../misc'
import { UserAttribute, UserAttributeHeader, UserAttributeHeadersResponse, AttributeClaimItem } from '../user-attribute'
import { ModifyProfileItem, UserProfile, ModifyProfileComponentItem, ProfileType } from '../profile'
import { ProfilePrivItem } from '../profiles-privilege'
import { UserLogHeader, UserLog } from '../log'
import { UserClaim, CreateClaimItem } from '../claim'
import { PlotStatistic, SimplePlot, StackedBarPlot } from '../analytics'

// #region Analytics

export interface GetPrivUniqueViewsRequest {
  access_token: string
  profile_id: string
}

export interface GetPrivUniqueViewsResponse {
  plot: SimplePlot
  statistics: PlotStatistic[]
}

export type GetPrivViewsRequest = GetPrivUniqueViewsRequest

export type GetPrivViewsResponse = GetPrivUniqueViewsResponse

export type GetPrivViewsSeriesRequest = GetPrivUniqueViewsRequest

export interface GetPrivViewsSeriesResponse {
  plot: StackedBarPlot
  statistics: PlotStatistic[]
}

export interface GetProfileUniqueViewsRequest {
  access_token: string
}

export type GetProfileUniqueViewsResponse = GetPrivUniqueViewsResponse

export type GetProfileViewsRequest = GetProfileUniqueViewsRequest

export type GetProfileViewsResponse = GetPrivUniqueViewsResponse

export type GetProfileViewsSeriesRequest = GetProfileUniqueViewsRequest

export type GetProfileViewsSeriesResponse = GetPrivViewsSeriesResponse

// #endregion

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

export interface RegisterInterestRequest {
  email: string
}

export type RegisterInterestResponse = EmptyObject

export interface SetDisableRegistrationRequest {
  secret: string
  state: boolean
}

export type SetDisableRegistrationResponse = EmptyObject

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

export interface VividGetAppInformationRequest {
  access_token: string
  app_id: string
}

export interface VividGetAppInformationResponse {
    app_name: string
}

export interface VividRegisterEmailRequest {
  email: string
  app_id: string
  service_id: string
  state: string
}

export type VividRegisterEmailResponse = EmptyObject

// #endregion

// #region Authenticate

export interface LoginEmailRequest {
  email: string
  password: string
}

export interface LoginResponse {
  access_token: string
  refresh_token: string
  terms_approvals: TermsApprovalItem[]
}

export type LoginEmailResponse = LoginResponse // Aliasing

export interface LoginOauthRequest {
  provider: string
  payload: object // TODO: elaborate
}

export type LoginOauthResponse = LoginResponse // Aliasing

export interface SetUserGroupByEmailRequest {
  access_token?: string
  email: string
  group: string
  secret?: string
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

export interface SetTermsApprovalsRequest {
  access_token: string
  terms_types: string[]
}

export interface SetTermsApprovalsResponse {
  terms_approvals: TermsApprovalItem[]
}

export interface VividLoginEmailRequest {
  email: string
  password: string
  app_id: string
  service_id: string
}

export interface VividLoginEmailResponse {
  access_token: string
  refresh_token: string
  terms_approvals: TermsApprovalItem[]
  service: string
}

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

export type GetAttributesByIdsResponse = UserAttributesResponse // Aliasing

// #endregion

// #region Crypto

export interface GetUserMnemonicRequest {
  access_token: string
}

export interface GetUserMnemonicResponse {
  encrypted_mnemonic: string
}

// #endregion

// #region Profiles

export interface CreateProfileRequest {
  access_token: string
  profile_type: ProfileType
  payload: {
    remark: string
  }
}

export interface CreateProfileResponse {
  profile_id: string
}

export interface DeleteProfileRequest {
  access_token: string
  profile_id: string
}

export type DeleteProfileResponse = EmptyObject

export interface GetOwnedProfileHeadersRequest {
  access_token: string
  profile_type: ProfileType
}

export interface GetOwnedProfileHeadersResponse {
  profiles: UserProfile[]
}

export interface ModifyProfileComponentsRequest {
  access_token: string
  payload: ModifyProfileItem[]
}

export interface ModifyProfileComponentsResponse {
  components: ModifyProfileComponentItem[]
}

export interface GetProfileByIdRequest {
  access_token: string
  profile_id: string
}

export interface GetProfileByIdResponse {
  profile: UserProfile
}

export interface GetFlatProfileByIdRequest {
  access_token: string
  profile_id: string
}

export interface GetFlatProfileByIdResponse {
  profile: UserProfile
}

export interface UpdateProfileRequest {
  access_token: string
  profile_id: string
  payload: {
    remark: string
  }
}

export type UpdateProfileResponse = EmptyObject

export interface GetProfileByTokenRequest {
  dynamic_token: string
}

export interface GetProfileByTokenResponse {
  profile: UserProfile
}

export interface VividCreateProfileRequest {
  access_token: string
  profile_type: string
  app_id: string
  service_id: string
}

export interface VividCreateProfileResponse {
  code: string
  redirect: string
}

// #endregion

// #region Profile Privileges

export interface CreateProfilePrivTokenRequest {
  access_token: string
  profile_id: string
  payload: {
    remark: string
    active: boolean
  }
}

export interface CreateProfilePrivTokenResponse {
  privilege: ProfilePrivItem
}

export interface GetProfilePrivsRequest {
  access_token: string
  profile_id: string
}

export interface GetProfilePrivsResponse {
  privileges: ProfilePrivItem[]
}

export interface UpdateProfilePrivRequest {
  access_token: string
  priv_id: string
  payload: {
    remark: string
    active: boolean
  }
}

export type UpdateProfilePrivResponse = EmptyObject

export interface DeleteProfilePrivRequest {
  access_token: string
  priv_id: string
}

export type DeleteProfilePrivResponse = EmptyObject

export interface SendProfileTokenByEmailRequest {
  access_token: string
  target_emails: string[]
  message: string
  priv_id: string
}

export type SendProfileTokenByEmailResponse = EmptyObject

export interface VividCreateProfilePrivCodeRequest {
  access_token: string
  profile_id: string
  app_id: string
  service_id: string
}

export type VividCreateProfilePrivCodeResponse = VividCreateProfileResponse

export interface VividExchangeCodeRequest {
  code: string
}

export interface VividExchangeCodeResponse {
  token: string
}
// #endregion

// #region Logs

export interface GetLogHeadersByTypesRequest {
  access_token: string
  types: string[]
  start_time: number
  end_time: number
}

export interface GetLogHeadersByTypesResponse {
  headers: UserLogHeader[]
}

export interface GetLogsByIdsRequest {
  access_token: string
  logs: UserLogHeader[]
}

export interface GetLogsByIdsResponse {
  logs: UserLog[]
}

export interface GetLatestLogsByTypesRequest {
  access_token: string
  types: string[]
}

export interface GetLatestLogsByTypesResponse {
  logs: UserLog[]
}

// #endregion

// #region Claims

export interface CreateClaimRequest {
  access_token: string
  claim: CreateClaimItem
}

export interface CreateClaimResponse {
  claim_id: string
}

export interface GetClaimByIdPublicRequest {
  claim_id: string
}

export interface GetClaimByIdRequest {
  access_token: string
  claim_id: string
}

export interface GetClaimByIdResponse {
  claim: UserClaim
}

export interface ReissueClaimRequest {
  access_token: string
  claim_id: string
}

export type ReissueClaimResponse = EmptyObject

export interface SubmitWorkflowTokenRequest {
  dynamic_token: string
  payload?: object
}

export interface SubmitWorkflowTokenResponse {
  redirect: string
}

// #endregion
