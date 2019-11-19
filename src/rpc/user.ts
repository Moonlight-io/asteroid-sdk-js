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
} from '../interfaces'
import { rpcDefaults } from '../constants/rpc-defaults'

export class AsteroidUserRpc {
  // #region Register

  static async registerEmail(rpcUrl: string, params: RegisterEmailRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<RegisterEmailResponse> {
    const method = 'User.RegisterEmail'
    return await invoke(rpcUrl, method, params, id, methodVersion, config)
  }

  static async registerEmailWithSecret(rpcUrl: string, params: RegisterEmailWithSecretRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<RegisterEmailWithSecretResponse> {
    const method = 'User.RegisterEmailWithSecret'
    return await invoke(rpcUrl, method, params, id, methodVersion, config)
  }

  static async updatePassword(rpcUrl: string, params: UpdatePasswordRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<UpdatePasswordResponse> {
    const method = 'User.UpdatePassword'
    return await invoke(rpcUrl, method, params, id, methodVersion, config)
  }

  static async updatePasswordJwt(rpcUrl: string, params: UpdatePasswordJwtRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<UpdatePasswordJwtResponse> {
    const method = 'User.UpdatePasswordJWT'
    return await invoke(rpcUrl, method, params, id, methodVersion, config)
  }

  static async requestPasswordReset(rpcUrl: string, params: RequestPasswordResetRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<RequestPasswordResetResponse> {
    const method = 'User.RequestPasswordReset'
    return await invoke(rpcUrl, method, params, id, methodVersion, config)
  }

  // #endregion

  // #region Authenticate

  static async loginEmail(rpcUrl: string, params: LoginEmailRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<LoginEmailResponse> {
    const method = 'User.LoginEmail'
    return await invoke(rpcUrl, method, params, id, methodVersion, config)
  }

  static async loginOauth(rpcUrl: string, params: LoginOauthRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<LoginOauthResponse> {
    const method = 'User.LoginOauth'
    return await invoke(rpcUrl, method, params, id, methodVersion, config)
  }

  static async setUserGroupByEmail(rpcUrl: string, params: SetUserGroupByEmailRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<SetUserGroupByEmailResponse> {
    const method = 'User.SetUserGroupByEmail'
    return await invoke(rpcUrl, method, params, id, methodVersion, config)
  }

  static async newAccessToken(rpcUrl: string, params: NewAccessTokenRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<NewAccessTokenResponse> {
    const method = 'User.NewAccessToken'
    return await invoke(rpcUrl, method, params, id, methodVersion, config)
  }

  static async logout(rpcUrl: string, params: LogoutRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<LogoutResponse> {
    const method = 'User.Logout'
    return await invoke(rpcUrl, method, params, id, methodVersion, config)
  }

  // #endregion

  // #region Attributes

  static async createAttributes(rpcUrl: string, params: CreateAttributesRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<CreateAttributesResponse> {
    const method = 'User.CreateAttributes'
    return await invoke(rpcUrl, method, params, id, methodVersion, config)
  }

  static async updateAttributes(rpcUrl: string, params: UpdateAttributesRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<UpdateAttributesResponse> {
    const method = 'User.UpdateAttributes'
    return await invoke(rpcUrl, method, params, id, methodVersion, config)
  }

  static async deleteAttributes(rpcUrl: string, params: DeleteAttributesRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<DeleteAttributesResponse> {
    const method = 'User.DeleteAttributes'
    return await invoke(rpcUrl, method, params, id, methodVersion, config)
  }

  static async getAttributeHeadersByTypes(rpcUrl: string, params: GetAttributeHeadersByTypesRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<GetAttributeHeadersByTypesResponse> {
    const method = 'User.GetAttributeHeadersByTypes'
    return await invoke(rpcUrl, method, params, id, methodVersion, config)
  }

  static async getAttributesByIds(rpcUrl: string, params: GetAttributesByIdsRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<GetAttributesByIdsResponse> {
    const method = 'User.GetAttributesByIDs'
    return await invoke(rpcUrl, method, params, id, methodVersion, config)
  }

  // #endregion

  // #region Profiles

  static async createProfile(rpcUrl: string, params: CreateProfileRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<CreateProfileResponse> {
    const method = 'User.CreateProfile'
    return await invoke(rpcUrl, method, params, id, methodVersion, config)
  }

  static async deleteProfile(rpcUrl: string, params: DeleteProfileRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<DeleteProfileResponse> {
    const method = 'User.DeleteProfile'
    return await invoke(rpcUrl, method, params, id, methodVersion, config)
  }

  static async getOwnedProfileHeaders(rpcUrl: string, params: GetOwnedProfileHeadersRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<GetOwnedProfileHeadersResponse> {
    const method = 'User.GetOwnedProfileHeaders'
    return await invoke(rpcUrl, method, params, id, methodVersion, config)
  }

  static async modifyProfileComponents(rpcUrl: string, params: ModifyProfileComponentsRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<ModifyProfileComponentsResponse> {
    const method = 'User.ModifyProfileComponents'
    return await invoke(rpcUrl, method, params, id, methodVersion, config)
  }

  static async getProfileById(rpcUrl: string, params: GetProfileByIdRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<GetProfileByIdResponse> {
    const method = 'User.GetProfileByID'
    return await invoke(rpcUrl, method, params, id, methodVersion, config)
  }

  static async getFlatProfileById(rpcUrl: string, params: GetFlatProfileByIdRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<GetFlatProfileByIdResponse> {
    const method = 'User.GetFlatProfileByID'
    return await invoke(rpcUrl, method, params, id, methodVersion, config)
  }

  static async updateProfile(rpcUrl: string, params: UpdateProfileRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<UpdateProfileResponse> {
    const method = 'User.UpdateProfile'
    return await invoke(rpcUrl, method, params, id, methodVersion, config)
  }

  static async getProfileByToken(rpcUrl: string, params: GetProfileByTokenRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<GetProfileByTokenResponse> {
    const method = 'User.GetProfileByToken'
    return await invoke(rpcUrl, method, params, id, methodVersion, config)
  }

  // #endregion

  // #region Profile Privileges

  static async createProfilePrivToken(rpcUrl: string, params: CreateProfilePrivTokenRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<CreateProfilePrivTokenResponse> {
    const method = 'User.CreateProfilePrivToken'
    return await invoke(rpcUrl, method, params, id, methodVersion, config)
  }

  static async getProfilePrivs(rpcUrl: string, params: GetProfilePrivsRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<GetProfilePrivsResponse> {
    const method = 'User.GetProfilePrivs'
    return await invoke(rpcUrl, method, params, id, methodVersion, config)
  }

  static async updateProfilePriv(rpcUrl: string, params: UpdateProfilePrivRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<UpdateProfilePrivResponse> {
    const method = 'User.UpdateProfilePriv'
    return await invoke(rpcUrl, method, params, id, methodVersion, config)
  }

  static async deleteProfilePriv(rpcUrl: string, params: DeleteProfilePrivRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<DeleteProfilePrivResponse> {
    const method = 'User.DeleteProfilePriv'
    return await invoke(rpcUrl, method, params, id, methodVersion, config)
  }

  static async sendProfileTokenByEmail(rpcUrl: string, params: SendProfileTokenByEmailRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<SendProfileTokenByEmailResponse> {
    const method = 'User.SendProfileTokenByEmail'
    return await invoke(rpcUrl, method, params, id, methodVersion, config)
  }

  // #endregion

  // #region Logs

  static async getLogHeadersByTypes(rpcUrl: string, params: GetLogHeadersByTypesRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<GetLogHeadersByTypesResponse> {
    const method = 'User.GetLogHeadersByTypes'
    return await invoke(rpcUrl, method, params, id, methodVersion, config)
  }

  static async getLogsByIds(rpcUrl: string, params: GetLogsByIdsRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<GetLogsByIdsResponse> {
    const method = 'User.GetLogsByIDs'
    return await invoke(rpcUrl, method, params, id, methodVersion, config)
  }

  static async getLatestLogsByTypes(rpcUrl: string, params: GetLatestLogsByTypesRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<GetLatestLogsByTypesResponse> {
    const method = 'User.GetLatestLogsByTypes'
    return await invoke(rpcUrl, method, params, id, methodVersion, config)
  }

  // #endregion

  // #region Claims

  static async submitWorkflowToken(rpcUrl: string, params: SubmitWorkflowTokenRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<SubmitWorkflowTokenResponse> {
    const method = 'User.SubmitWorkflowToken'
    return await invoke(rpcUrl, method, params, id, methodVersion, config)
  }

  static async createClaim(rpcUrl: string, params: CreateClaimRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<CreateClaimResponse> {
    const method = 'User.CreateClaim'
    return await invoke(rpcUrl, method, params, id, methodVersion, config)
  }

  // #endregion
}
