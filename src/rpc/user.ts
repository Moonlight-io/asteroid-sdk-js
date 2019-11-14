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

const defaultId: string = '0'
const defaultMethodVersion: number = 1

export class AsteroidUserRpc {
  // #region Register

  static async registerEmail(rpcUrl: string, params: RegisterEmailRequest, id = defaultId, methodVersion = defaultMethodVersion): Promise<RegisterEmailResponse> {
    const method = 'User.RegisterEmail'
    return await invoke(rpcUrl, method, params, id, methodVersion)
  }

  static async registerEmailWithSecret(rpcUrl: string, params: RegisterEmailWithSecretRequest, id = defaultId, methodVersion = defaultMethodVersion): Promise<RegisterEmailWithSecretResponse> {
    const method = 'User.RegisterEmailWithSecret'
    return await invoke(rpcUrl, method, params, id, methodVersion)
  }

  static async updatePassword(rpcUrl: string, params: UpdatePasswordRequest, id = defaultId, methodVersion = defaultMethodVersion): Promise<UpdatePasswordResponse> {
    const method = 'User.UpdatePassword'
    return await invoke(rpcUrl, method, params, id, methodVersion)
  }

  static async updatePasswordJwt(rpcUrl: string, params: UpdatePasswordJwtRequest, id = defaultId, methodVersion = defaultMethodVersion): Promise<UpdatePasswordJwtResponse> {
    const method = 'User.UpdatePasswordJWT'
    return await invoke(rpcUrl, method, params, id, methodVersion)
  }

  static async requestPasswordReset(rpcUrl: string, params: RequestPasswordResetRequest, id = defaultId, methodVersion = defaultMethodVersion): Promise<RequestPasswordResetResponse> {
    const method = 'User.RequestPasswordReset'
    return await invoke(rpcUrl, method, params, id, methodVersion)
  }

  // #endregion

  // #region Authenticate

  static async loginEmail(rpcUrl: string, params: LoginEmailRequest, id = defaultId, methodVersion = defaultMethodVersion): Promise<LoginEmailResponse> {
    const method = 'User.LoginEmail'
    return await invoke(rpcUrl, method, params, id, methodVersion)
  }

  static async loginOauth(rpcUrl: string, params: LoginOauthRequest, id = defaultId, methodVersion = defaultMethodVersion): Promise<LoginOauthResponse> {
    const method = 'User.LoginOauth'
    return await invoke(rpcUrl, method, params, id, methodVersion)
  }

  static async setUserGroupByEmail(rpcUrl: string, params: SetUserGroupByEmailRequest, id = defaultId, methodVersion = defaultMethodVersion): Promise<SetUserGroupByEmailResponse> {
    const method = 'User.SetUserGroupByEmail'
    return await invoke(rpcUrl, method, params, id, methodVersion)
  }

  static async newAccessToken(rpcUrl: string, params: NewAccessTokenRequest, id = defaultId, methodVersion = defaultMethodVersion): Promise<NewAccessTokenResponse> {
    const method = 'User.NewAccessToken'
    return await invoke(rpcUrl, method, params, id, methodVersion)
  }

  static async logout(rpcUrl: string, params: LogoutRequest, id = defaultId, methodVersion = defaultMethodVersion): Promise<LogoutResponse> {
    const method = 'User.Logout'
    return await invoke(rpcUrl, method, params, id, methodVersion)
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
