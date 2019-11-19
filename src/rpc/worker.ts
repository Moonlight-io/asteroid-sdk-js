import { AxiosRequestConfig } from 'axios'
import { invoke } from './base'
import {
  ClaimTaskRequest,
  ClaimTaskResponse,
  CreateTaskRequest,
  CreateTaskResponse,
  GetActiveTaskIdsRequest,
  GetActiveTaskIdsResponse,
  GetTaskByIdRequest,
  GetTaskByIdResponse,
  GetUnclaimedTaskRequest,
  GetUnclaimedTaskResponse,
  ResolveTaskRequest,
  ResolveTaskResponse,
  UnclaimTaskRequest,
  UnclaimTaskResponse,
  RegisterWorkerRequest,
  RegisterWorkerResponse,
} from '../interfaces/api/worker'
import { rpcDefaults } from '../constants/rpc-defaults'

export class AsteroidWorkerRpc {
  // #region Tasks

  static async claimTask(rpcUrl: string, params: ClaimTaskRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<ClaimTaskResponse> {
    const method = 'Worker.ClaimTask'
    return await invoke(rpcUrl, method, params, id, methodVersion, config)
  }

  static async createTask(rpcUrl: string, params: CreateTaskRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<CreateTaskResponse> {
    const method = 'Worker.CreateTask'
    return await invoke(rpcUrl, method, params, id, methodVersion, config)
  }

  static async getActiveTaskIds(rpcUrl: string, params: GetActiveTaskIdsRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<GetActiveTaskIdsResponse> {
    const method = 'Worker.GetActiveTaskIDs'
    return await invoke(rpcUrl, method, params, id, methodVersion, config)
  }

  static async getTaskById(rpcUrl: string, params: GetTaskByIdRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<GetTaskByIdResponse> {
    const method = 'Worker.GetTaskByID'
    return await invoke(rpcUrl, method, params, id, methodVersion, config)
  }

  static async getUnclaimedTask(rpcUrl: string, params: GetUnclaimedTaskRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<GetUnclaimedTaskResponse> {
    const method = 'Worker.GetUnclaimedTask'
    return await invoke(rpcUrl, method, params, id, methodVersion, config)
  }

  static async resolveTask(rpcUrl: string, params: ResolveTaskRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<ResolveTaskResponse> {
    const method = 'Worker.ResolveTask'
    return await invoke(rpcUrl, method, params, id, methodVersion, config)
  }

  static async unclaimTask(rpcUrl: string, params: UnclaimTaskRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<UnclaimTaskResponse> {
    const method = 'Worker.UnclaimTask'
    return await invoke(rpcUrl, method, params, id, methodVersion, config)
  }

  // #endregion

  // #region Workers

  static async registerWorker(rpcUrl: string, params: RegisterWorkerRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<RegisterWorkerResponse> {
    const method = 'Worker.RegisterWorker'
    return await invoke(rpcUrl, method, params, id, methodVersion, config)
  }

  // #endregion
}
