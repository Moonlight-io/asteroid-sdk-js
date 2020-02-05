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
  RegisterWorkerResponse, QuarantineTaskRequest, QuarantineTaskResponse,
} from '../interfaces/api/worker'
import { rpcDefaults } from '../constants/rpc-defaults'
import { UrlHelper } from '../helpers'

export class AsteroidWorkerRpc {
  // #region Tasks

  static async claimTask(baseUrl: string, params: ClaimTaskRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<ClaimTaskResponse> {
    const method = 'Worker.ClaimTask'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async createTask(baseUrl: string, params: CreateTaskRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<CreateTaskResponse> {
    const method = 'Worker.CreateTask'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async getActiveTaskIds(baseUrl: string, params: GetActiveTaskIdsRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<GetActiveTaskIdsResponse> {
    const method = 'Worker.GetActiveTaskIDs'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async getTaskById(baseUrl: string, params: GetTaskByIdRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<GetTaskByIdResponse> {
    const method = 'Worker.GetTaskByID'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async getUnclaimedTask(baseUrl: string, params: GetUnclaimedTaskRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<GetUnclaimedTaskResponse> {
    const method = 'Worker.GetUnclaimedTask'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async quarantineTask(baseUrl: string, params: QuarantineTaskRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<QuarantineTaskResponse> {
    const method = 'Worker.QuarantineTask'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async resolveTask(baseUrl: string, params: ResolveTaskRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<ResolveTaskResponse> {
    const method = 'Worker.ResolveTask'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  static async unclaimTask(baseUrl: string, params: UnclaimTaskRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<UnclaimTaskResponse> {
    const method = 'Worker.UnclaimTask'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  // #endregion

  // #region Workers

  static async registerWorker(baseUrl: string, params: RegisterWorkerRequest, id = rpcDefaults.id, methodVersion = rpcDefaults.methodVersion, config?: AxiosRequestConfig): Promise<RegisterWorkerResponse> {
    const method = 'Worker.RegisterWorker'
    return await invoke(UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)
  }

  // #endregion
}
