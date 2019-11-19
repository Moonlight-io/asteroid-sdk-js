import { merge } from 'lodash'
import { Logger, LoggerOptions } from 'node-log-it'
import { rpc } from './rpc'
import { ConnectionNetworkType, ConnectionNetworkConfig, GetVersionResponse, ClaimTaskItem, ClaimTaskTypeItem } from './interfaces'
import { rest } from './rest'
import { ClaimTaskRequest, CreateTaskRequest, GetActiveTaskIdsRequest, GetTaskByIdRequest, GetUnclaimedTaskRequest, ResolveTaskRequest, UnclaimTaskRequest, RegisterWorkerRequest } from './interfaces/api/worker'
import { NetworkHelper, UrlHelper } from './helpers'

const MODULE_NAME = 'AsteroidDomainWorker'

const DEFAULT_OPTIONS: AsteroidDomainWorkerOptions = {
  networkType: 'production',
  networkConfig: undefined,
  accessToken: undefined,
  id: '0',
  loggerOptions: {},
}

export interface AsteroidDomainWorkerOptions {
  networkType?: ConnectionNetworkType
  networkConfig?: ConnectionNetworkConfig
  accessToken?: string
  id?: string
  loggerOptions?: LoggerOptions
}

export class AsteroidDomainWorker {
  private options: AsteroidDomainWorkerOptions
  private currentAccessToken: string | undefined
  private logger: Logger

  constructor(options: AsteroidDomainWorkerOptions = {}) {
    // Associate optional properties
    this.options = merge({}, DEFAULT_OPTIONS, options)
    this.validateOptionalParameters()

    // Bootstrapping
    this.currentAccessToken = this.options.accessToken
    this.logger = new Logger(MODULE_NAME, this.options.loggerOptions)
    this.logger.debug('constructor completes.')
  }

  get baseUrl(): string {
    if (this.options.networkConfig) {
      return this.options.networkConfig.asteroidDomainUserBaseUrl
    }

    if (this.options.networkType) {
      return NetworkHelper.getAsteroidDomainWorkerBaseUrl(this.options.networkType)
    }

    throw new Error('Unable to determine baseUrl.')
  }

  get accessToken(): string | undefined {
    return this.currentAccessToken
  }

  get id(): string {
    return this.options.id!
  }

  setAccessToken(token: string) {
    this.currentAccessToken = token
  }

  async getVersionInfo(): Promise<GetVersionResponse> {
    return await rest.worker.getVersion(this.baseUrl)
  }

  // #region Tasks

  async claimTask(taskId: string): Promise<void> {
    this.logger.debug('claimTask triggered.')

    const req: ClaimTaskRequest = {
      access_token: this.accessToken!,
      task_id: taskId,
    }
    await rpc.worker.claimTask(this.baseUrl, req, this.id)
  }

  async createTask(taskType: string, taskVersion: string, taskPriority: number, target: string): Promise<string> {
    this.logger.debug('createTask triggered.')

    const req: CreateTaskRequest = {
      access_token: this.accessToken!,
      task_type: taskType,
      task_version: taskVersion,
      task_priority: taskPriority,
      payload: {
        target,
      },
    }
    const res = await rpc.worker.createTask(this.baseUrl, req, this.id)
    return res.task_id
  }

  async getActiveTaskIds(): Promise<string[]> {
    this.logger.debug('getActiveTaskIds triggered.')

    const req: GetActiveTaskIdsRequest = {
      access_token: this.accessToken!,
    }
    const res = await rpc.worker.getActiveTaskIds(this.baseUrl, req, this.id)
    return res.task_ids
  }

  async getTaskById(taskId: string): Promise<ClaimTaskItem> {
    this.logger.debug('getTaskById triggered.')

    const req: GetTaskByIdRequest = {
      access_token: this.accessToken!,
      task_id: taskId,
    }
    const res = await rpc.worker.getTaskById(this.baseUrl, req, this.id)
    return res
  }

  async getUnclaimedTask(taskTypes: ClaimTaskTypeItem[]): Promise<ClaimTaskItem> {
    this.logger.debug('getUnclaimedTask triggered.')

    const req: GetUnclaimedTaskRequest = {
      access_token: this.accessToken!,
      task_types: taskTypes,
    }
    const res = await rpc.worker.getUnclaimedTask(this.baseUrl, req, this.id)
    return res
  }

  async resolveTask(taskId: string): Promise<void> {
    this.logger.debug('resolveTask triggered.')

    const req: ResolveTaskRequest = {
      access_token: this.accessToken!,
      task_id: taskId,
    }
    await rpc.worker.resolveTask(this.baseUrl, req, this.id)
  }

  async unclaimTask(taskId: string): Promise<void> {
    this.logger.debug('unclaimTask triggered.')

    const req: UnclaimTaskRequest = {
      access_token: this.accessToken!,
      task_id: taskId,
    }
    await rpc.worker.unclaimTask(this.baseUrl, req, this.id)
  }

  // #endregion

  // #region Workers

  async registerWorker(accessPoint: string): Promise<void> {
    this.logger.debug('registerWorker triggered.')

    const req: RegisterWorkerRequest = {
      access_token: this.accessToken!,
      access_point: accessPoint,
    }
    await rpc.worker.registerWorker(this.baseUrl, req, this.id)
  }

  // #endregion

  private validateOptionalParameters() {
    if (!this.options.networkType && !this.options.networkConfig) {
      throw new Error(`Require to provide either 'networkType' or 'networkConfig'.`)
    }
    if (this.options.id === undefined) {
      throw new Error(`Require to provide 'id'.`)
    }
  }
}
