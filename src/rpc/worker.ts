import { AxiosRequestConfig } from 'axios'
import { invoke } from './base'
import { ClaimTaskRequest, ClaimTaskResponse } from '../interfaces/api/worker'
import { rpcDefaults } from '../constants'

export class AsteroidWorkerRpc {
  // #region Tasks

  static async claimTask(rpcUrl: string, params: ClaimTaskRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<ClaimTaskResponse> {
    const method = 'Worker.ClaimTask'
    return await invoke(rpcUrl, method, params, id, methodVersion, config)
  }

  // #endregion

  // #region Workers

  // #endregion
}
