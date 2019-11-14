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
}
