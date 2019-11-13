import { invoke } from './base'
import { RegisterEmailRequest, RegisterEmailResponse } from '../interfaces'

const defaultId: string = '0'
const defaultMethodVersion: number = 1
// const defaultOnUploadProgress = undefined

export class AsteroidUserRpc {
  static async registerEmail(rpcUrl: string, params: RegisterEmailRequest, id = defaultId, methodVersion = defaultMethodVersion): Promise<RegisterEmailResponse> {
    const method = 'User.RegisterEmail'
    const res = await invoke(rpcUrl, method, params, id, methodVersion)
    return res
  }
}
