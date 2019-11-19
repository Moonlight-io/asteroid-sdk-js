import { merge } from 'lodash'
import { Logger, LoggerOptions } from 'node-log-it'
import buildUrl from 'build-url'
import { rpc } from './rpc'
import { ConnectionNetworkType, ConnectionNetworkConfig, GetVersionResponse, ClaimTaskItem, ClaimTaskTypeItem } from './interfaces'
import { rpcErrorCodes } from './constants'
import { rest } from './rest'
import { ClaimTaskRequest, CreateTaskRequest, GetActiveTaskIdsRequest, GetTaskByIdRequest, GetUnclaimedTaskRequest, ResolveTaskResponse, ResolveTaskRequest, UnclaimTaskRequest } from './interfaces/api/worker'

const MODULE_NAME = 'AsteroidDomainWorker'

const DEFAULT_OPTIONS: AsteroidDomainWorkerOptions = {
  networkType: 'production',
  networkConfig: undefined,
  accessToken: undefined,
  // refreshToken: undefined,
  // autoUpdateTokens: true,
  id: '0',
  loggerOptions: {},
}

export interface AsteroidDomainWorkerOptions {
  networkType?: ConnectionNetworkType
  networkConfig?: ConnectionNetworkConfig
  accessToken?: string
  // refreshToken?: string // TODO: verified if refresh_token is applicable in ADW
  // autoUpdateTokens?: boolean // TODO: verified if refresh_token is applicable in ADW
  id?: string
  loggerOptions?: LoggerOptions
}

export class AsteroidDomainWorker {
  private options: AsteroidDomainWorkerOptions
  private currentAccessToken: string | undefined
  // private currentRefreshToken: string | undefined
  private logger: Logger

  constructor(options: AsteroidDomainWorkerOptions = {}) {
    // Associate optional properties
    this.options = merge({}, DEFAULT_OPTIONS, options)
    this.validateOptionalParameters()

    // Bootstrapping
    this.currentAccessToken = this.options.accessToken
    // this.currentRefreshToken = this.options.refreshToken
    this.logger = new Logger(MODULE_NAME, this.options.loggerOptions)
    this.logger.debug('constructor completes.')
  }

  get baseUrl(): string {
    if (this.options.networkConfig) {
      return this.options.networkConfig.asteroidDomainUserBaseUrl
    }

    if (this.options.networkType) {
      // TODO: move constant to another location
      if (this.options.networkType === 'production') {
        return 'https://worker.asteroid.moonlight.io'
      }
      if (this.options.networkType === 'stage') {
        return 'https://stage-worker.asteroid.moonlight.io'
      }
    }

    throw new Error('Unable to determine baseUrl.')
  }

  get rpcUrl(): string {
    return buildUrl(this.baseUrl, {
      path: '/rpc',
    })
  }

  get accessToken(): string | undefined {
    return this.currentAccessToken
  }

  // get refreshToken(): string | undefined {
  //   return this.currentRefreshToken
  // }

  get id(): string {
    return this.options.id!
  }

  setAccessToken(token: string) {
    this.currentAccessToken = token
  }

  // setRefreshToken(token: string) {
  //   this.currentRefreshToken = token
  // }

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
    await rpc.worker.claimTask(this.rpcUrl, req, this.id)
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
    const res = await rpc.worker.createTask(this.rpcUrl, req, this.id)
    return res.task_id
  }

  async getActiveTaskIds(): Promise<string[]> {
    this.logger.debug('getActiveTaskIds triggered.')

    const req: GetActiveTaskIdsRequest = {
      access_token: this.accessToken!,
    }
    const res = await rpc.worker.getActiveTaskIds(this.rpcUrl, req, this.id)
    return res.task_ids
  }

  async getTaskById(taskId: string): Promise<ClaimTaskItem> {
    this.logger.debug('getTaskById triggered.')

    const req: GetTaskByIdRequest = {
      access_token: this.accessToken!,
      task_id: taskId,
    }
    const res = await rpc.worker.getTaskById(this.rpcUrl, req, this.id)
    return res
  }

  async getUnclaimedTask(taskTypes: ClaimTaskTypeItem[]): Promise<ClaimTaskItem> {
    this.logger.debug('getUnclaimedTask triggered.')

    const req: GetUnclaimedTaskRequest = {
      access_token: this.accessToken!,
      task_types: taskTypes,
    }
    const res = await rpc.worker.getUnclaimedTask(this.rpcUrl, req, this.id)
    return res
  }

  async resolveTask(taskId: string): Promise<void> {
    this.logger.debug('resolveTask triggered.')

    const req: ResolveTaskRequest = {
      access_token: this.accessToken!,
      task_id: taskId,
    }
    await rpc.worker.resolveTask(this.rpcUrl, req, this.id)
  }

  async unclaimTask(taskId: string): Promise<void> {
    this.logger.debug('unclaimTask triggered.')

    const req: UnclaimTaskRequest = {
      access_token: this.accessToken!,
      task_id: taskId,
    }
    await rpc.worker.unclaimTask(this.rpcUrl, req, this.id)
  }

  // #endregion

  // #region Workers

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
