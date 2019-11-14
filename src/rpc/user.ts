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
} from '../interfaces'
import { rpcDefaults } from '../constants'

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

  // #endregion

  // #region Profiles

  // #endregion

  // #region Logs

  // #endregion

  // #region Claims

  // #endregion
}
