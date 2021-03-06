import { AxiosRequestConfig } from 'axios'
import { invoke } from './base'
import {
  RegisterEmailRequest,
  RegisterEmailResponse,
  RegisterEmailWithSecretResponse,
  RegisterEmailWithSecretRequest,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
  UpdatePasswordJwtRequest,
  UpdatePasswordJwtResponse,
  RequestPasswordResetRequest,
  RequestPasswordResetResponse,
  NewAccessTokenRequest,
  NewAccessTokenResponse,
  LoginEmailRequest,
  LoginEmailResponse,
  LoginOauthRequest,
  LoginOauthResponse,
  SetUserGroupByEmailRequest,
  SetUserGroupByEmailResponse,
  LogoutRequest,
  LogoutResponse,
  CreateAttributesRequest,
  CreateAttributesResponse,
  UpdateAttributesRequest,
  UpdateAttributesResponse,
  DeleteAttributesRequest,
  DeleteAttributesResponse,
  GetAttributeHeadersByTypesRequest,
  GetAttributeHeadersByTypesResponse,
  GetAttributesByIdsRequest,
  GetAttributesByIdsResponse,
  CreateProfileRequest,
  CreateProfileResponse,
  DeleteProfileRequest,
  DeleteProfileResponse,
  GetOwnedProfileHeadersRequest,
  GetOwnedProfileHeadersResponse,
  ModifyProfileComponentsRequest,
  ModifyProfileComponentsResponse,
  GetProfileByIdRequest,
  GetProfileByIdResponse,
  GetFlatProfileByIdRequest,
  GetFlatProfileByIdResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
  GetProfileByTokenRequest,
  GetProfileByTokenResponse,
  CreateProfilePrivTokenRequest,
  CreateProfilePrivTokenResponse,
  GetProfilePrivsRequest,
  GetProfilePrivsResponse,
  UpdateProfilePrivRequest,
  UpdateProfilePrivResponse,
  DeleteProfilePrivRequest,
  DeleteProfilePrivResponse,
  SendProfileTokenByEmailRequest,
  SendProfileTokenByEmailResponse,
  GetLogHeadersByTypesRequest,
  GetLogHeadersByTypesResponse,
  GetLogsByIdsRequest,
  GetLogsByIdsResponse,
  GetLatestLogsByTypesRequest,
  GetLatestLogsByTypesResponse,
  SubmitWorkflowTokenRequest,
  SubmitWorkflowTokenResponse,
  CreateClaimRequest,
  CreateClaimResponse,
  GetClaimByIdRequest,
  GetClaimByIdPublicRequest,
  GetClaimByIdResponse,
  RegisterInterestRequest,
  RegisterInterestResponse,
  SetDisableRegistrationRequest,
  SetDisableRegistrationResponse,
  SetTermsApprovalsRequest,
  SetTermsApprovalsResponse,
  GetUserMnemonicRequest,
  GetUserMnemonicResponse,
  ReissueClaimRequest,
  ReissueClaimResponse,
  GetPrivUniqueViewsRequest,
  GetPrivUniqueViewsResponse,
  GetPrivViewsRequest,
  GetPrivViewsResponse,
  GetPrivViewsSeriesRequest,
  GetPrivViewsSeriesResponse,
  GetProfileUniqueViewsRequest,
  GetProfileUniqueViewsResponse,
  GetProfileViewsRequest,
  GetProfileViewsResponse,
  GetProfileViewsSeriesRequest,
  GetProfileViewsSeriesResponse,
  VividRegisterEmailRequest,
  VividRegisterEmailResponse,
  VividLoginEmailRequest,
  VividLoginEmailResponse,
  VividCreateProfileRequest,
  VividCreateProfileResponse,
  VividCreateProfilePrivCodeRequest,
  VividExchangeCodeRequest,
  VividExchangeCodeResponse,
  VividGetAppInformationRequest,
  VividGetAppInformationResponse,
  MailingListUnsubscribeRequest,
  MailingListUnsubscribeResponse,
} from '../interfaces'
import { rpcDefaults } from '../constants/rpc-defaults'
import { UrlHelper } from '../helpers'

export class AsteroidUserRpc {
  // #region Analytics

  static async getPrivUniqueViews(baseUrl: string, params: GetPrivUniqueViewsRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<GetPrivUniqueViewsResponse> {
    const method = 'User.GetPrivUniqueViews'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async getPrivViews(baseUrl: string, params: GetPrivViewsRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<GetPrivViewsResponse> {
    const method = 'User.GetPrivViews'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async getPrivViewsSeries(baseUrl: string, params: GetPrivViewsSeriesRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<GetPrivViewsSeriesResponse> {
    const method = 'User.GetPrivViewsSeries'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async getProfileUniqueViews(baseUrl: string, params: GetProfileUniqueViewsRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<GetProfileUniqueViewsResponse> {
    const method = 'User.GetProfileUniqueViews'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async getProfileViews(baseUrl: string, params: GetProfileViewsRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<GetProfileViewsResponse> {
    const method = 'User.GetProfileViews'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async getProfileViewsSeries(baseUrl: string, params: GetProfileViewsSeriesRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<GetProfileViewsSeriesResponse> {
    const method = 'User.GetProfileViewsSeries'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  // #endregion

  // #region Register

  static async registerEmail(baseUrl: string, params: RegisterEmailRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<RegisterEmailResponse> {
    const method = 'User.RegisterEmail'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async registerEmailWithSecret(baseUrl: string, params: RegisterEmailWithSecretRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<RegisterEmailWithSecretResponse> {
    const method = 'User.RegisterEmailWithSecret'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async registerInterest(baseUrl: string, params: RegisterInterestRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<RegisterInterestResponse> {
    const method = 'User.RegisterInterest'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async setDisableRegistration(baseUrl: string, params: SetDisableRegistrationRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<SetDisableRegistrationResponse> {
    const method = 'User.SetDisableRegistration'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async updatePassword(baseUrl: string, params: UpdatePasswordRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<UpdatePasswordResponse> {
    const method = 'User.UpdatePassword'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async updatePasswordJwt(baseUrl: string, params: UpdatePasswordJwtRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<UpdatePasswordJwtResponse> {
    const method = 'User.UpdatePasswordJWT'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async requestPasswordReset(baseUrl: string, params: RequestPasswordResetRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<RequestPasswordResetResponse> {
    const method = 'User.RequestPasswordReset'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async vividRegisterEmail(baseUrl: string, params: VividRegisterEmailRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<VividRegisterEmailResponse> {
    const method = 'User.VividRegisterEmail'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async mailingListUnsubscribe(baseUrl: string, params: MailingListUnsubscribeRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<MailingListUnsubscribeResponse> {
    const method = 'User.MailingListUnsubscribe'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  // #endregion

  // #region Authenticate

  static async loginEmail(baseUrl: string, params: LoginEmailRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<LoginEmailResponse> {
    const method = 'User.LoginEmail'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async loginOauth(baseUrl: string, params: LoginOauthRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<LoginOauthResponse> {
    const method = 'User.LoginOauth'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async setUserGroupByEmail(baseUrl: string, params: SetUserGroupByEmailRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<SetUserGroupByEmailResponse> {
    const method = 'User.SetUserGroupByEmail'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async newAccessToken(baseUrl: string, params: NewAccessTokenRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<NewAccessTokenResponse> {
    const method = 'User.NewAccessToken'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async logout(baseUrl: string, params: LogoutRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<LogoutResponse> {
    const method = 'User.Logout'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async setTermsApprovals(baseUrl: string, params: SetTermsApprovalsRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<SetTermsApprovalsResponse> {
    const method = 'User.SetTermsApprovals'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async vividLoginEmail(baseUrl: string, params: VividLoginEmailRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<VividLoginEmailResponse> {
    const method = 'User.VividLoginEmail'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  // #endregion

  // #region Attributes

  static async createAttributes(baseUrl: string, params: CreateAttributesRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<CreateAttributesResponse> {
    const method = 'User.CreateAttributes'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async updateAttributes(baseUrl: string, params: UpdateAttributesRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<UpdateAttributesResponse> {
    const method = 'User.UpdateAttributes'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async deleteAttributes(baseUrl: string, params: DeleteAttributesRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<DeleteAttributesResponse> {
    const method = 'User.DeleteAttributes'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async getAttributeHeadersByTypes(
    baseUrl: string,
    params: GetAttributeHeadersByTypesRequest,
    id = rpcDefaults.id,
    methodVersion = rpcDefaults.methodVersion,
    config?: AxiosRequestConfig
  ): Promise<GetAttributeHeadersByTypesResponse> {
    const method = 'User.GetAttributeHeadersByTypes'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async getAttributesByIds(baseUrl: string, params: GetAttributesByIdsRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<GetAttributesByIdsResponse> {
    const method = 'User.GetAttributesByIDs'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  // #endregion

  // #region Profiles

  static async createProfile(baseUrl: string, params: CreateProfileRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<CreateProfileResponse> {
    const method = 'User.CreateProfile'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async deleteProfile(baseUrl: string, params: DeleteProfileRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<DeleteProfileResponse> {
    const method = 'User.DeleteProfile'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async getOwnedProfileHeaders(baseUrl: string, params: GetOwnedProfileHeadersRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<GetOwnedProfileHeadersResponse> {
    const method = 'User.GetOwnedProfileHeaders'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async modifyProfileComponents(baseUrl: string, params: ModifyProfileComponentsRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<ModifyProfileComponentsResponse> {
    const method = 'User.ModifyProfileComponents'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async getProfileById(baseUrl: string, params: GetProfileByIdRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<GetProfileByIdResponse> {
    const method = 'User.GetProfileByID'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async getFlatProfileById(baseUrl: string, params: GetFlatProfileByIdRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<GetFlatProfileByIdResponse> {
    const method = 'User.GetFlatProfileByID'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async updateProfile(baseUrl: string, params: UpdateProfileRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<UpdateProfileResponse> {
    const method = 'User.UpdateProfile'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async getProfileByToken(baseUrl: string, params: GetProfileByTokenRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<GetProfileByTokenResponse> {
    const method = 'User.GetProfileByToken'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async vividCreateProfile(baseUrl: string, params: VividCreateProfileRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<VividCreateProfileResponse> {
    const method = 'User.VividCreateProfile'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  // #endregion

  // #region Crypto

  static async getUserMnemonic(baseUrl: string, params: GetUserMnemonicRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<GetUserMnemonicResponse> {
    const method = 'User.GetUserMnemonic'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  // #endregion

  // #region Profile Privileges

  static async createProfilePrivToken(baseUrl: string, params: CreateProfilePrivTokenRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<CreateProfilePrivTokenResponse> {
    const method = 'User.CreateProfilePrivToken'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async getProfilePrivs(baseUrl: string, params: GetProfilePrivsRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<GetProfilePrivsResponse> {
    const method = 'User.GetProfilePrivs'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async updateProfilePriv(baseUrl: string, params: UpdateProfilePrivRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<UpdateProfilePrivResponse> {
    const method = 'User.UpdateProfilePriv'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async deleteProfilePriv(baseUrl: string, params: DeleteProfilePrivRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<DeleteProfilePrivResponse> {
    const method = 'User.DeleteProfilePriv'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async sendProfileTokenByEmail(baseUrl: string, params: SendProfileTokenByEmailRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<SendProfileTokenByEmailResponse> {
    const method = 'User.SendProfileTokenByEmail'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async vividCreateProfilePrivCode(baseUrl: string, params: VividCreateProfilePrivCodeRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<VividCreateProfileResponse> {
    const method = 'User.VividCreateProfilePrivCode'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async vividGetAppInformation(baseUrl: string, params: VividGetAppInformationRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<VividGetAppInformationResponse> {
    const method = 'User.VividGetAppInformation'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async vividExchangeCode(baseUrl: string, params: VividExchangeCodeRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<VividExchangeCodeResponse> {
    const method = 'User.VividExchangeCode'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  // #endregion

  // #region Logs

  static async getLogHeadersByTypes(baseUrl: string, params: GetLogHeadersByTypesRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<GetLogHeadersByTypesResponse> {
    const method = 'User.GetLogHeadersByTypes'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async getLogsByIds(baseUrl: string, params: GetLogsByIdsRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<GetLogsByIdsResponse> {
    const method = 'User.GetLogsByIDs'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async getLatestLogsByTypes(baseUrl: string, params: GetLatestLogsByTypesRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<GetLatestLogsByTypesResponse> {
    const method = 'User.GetLatestLogsByTypes'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  // #endregion

  // #region Claims

  static async createClaim(baseUrl: string, params: CreateClaimRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<CreateClaimResponse> {
    const method = 'User.CreateClaim'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async getClaimById(baseUrl: string, params: GetClaimByIdRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<GetClaimByIdResponse> {
    const method = 'User.GetClaimByID'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async getClaimByIdPublic(baseUrl: string, params: GetClaimByIdPublicRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<GetClaimByIdResponse> {
    const method = 'User.GetClaimByIDPublic'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async reissueClaim(baseUrl: string, params: ReissueClaimRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<ReissueClaimResponse> {
    const method = 'User.ReissueClaim'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async submitWorkflowToken(baseUrl: string, params: SubmitWorkflowTokenRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<SubmitWorkflowTokenResponse> {
    const method = 'User.SubmitWorkflowToken'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  // #endregion
}
