import { merge } from 'lodash'
import { Logger, LoggerOptions } from 'node-log-it'
import { rpc } from './rpc'
import {
  UpdatePasswordJwtRequest,
  ConnectionNetworkType,
  NewAccessTokenRequest,
  SetUserGroupByEmailRequest,
  LogoutRequest,
  UserAttribute,
  CreateAttributesRequest,
  CreateAttributesResponse,
  UpdateAttributesRequest,
  UpdateAttributesResponse,
  DeleteAttributesRequest,
  DeleteAttributesResponse,
  UserAttributeHeader,
  GetAttributeHeadersByTypesRequest,
  GetAttributeHeadersByTypesResponse,
  GetAttributesByIdsRequest,
  GetAttributesByIdsResponse,
  CreateProfilePrivTokenRequest,
  CreateProfilePrivTokenResponse,
  ProfilePrivItem,
  CreateProfileRequest,
  CreateProfileResponse,
  DeleteProfileRequest,
  GetOwnedProfileHeadersRequest,
  GetOwnedProfileHeadersResponse,
  UserProfile,
  ModifyProfileComponentsRequest,
  ModifyProfileItem,
  ModifyProfileComponentsResponse,
  ModifyProfileComponentItem,
  GetProfileByIdRequest,
  GetProfileByIdResponse,
  GetFlatProfileByIdRequest,
  GetFlatProfileByIdResponse,
  UpdateProfileRequest,
  GetProfilePrivsRequest,
  GetProfilePrivsResponse,
  UpdateProfilePrivRequest,
  DeleteProfilePrivRequest,
  SendProfileTokenByEmailRequest,
  GetLogHeadersByTypesRequest,
  GetLogHeadersByTypesResponse,
  UserLogHeader,
  GetLogsByIdsRequest,
  GetLogsByIdsResponse,
  GetLatestLogsByTypesRequest,
  GetLatestLogsByTypesResponse,
  SubmitWorkflowTokenRequest,
  UserLog,
  CreateClaimRequest,
  AttributeClaimItem,
  ClaimTaskItem,
  ClaimTaskTypeItem,
} from './interfaces'
import { ClaimTaskRequest, CreateTaskRequest, GetActiveTaskIdsRequest, GetTaskByIdRequest, GetUnclaimedTaskRequest, ResolveTaskRequest, UnclaimTaskRequest, RegisterWorkerRequest } from './interfaces/api/worker'
import { NetworkHelper } from './helpers'
import { rpcErrorCodes } from './constants/rpc-error-codes'

const MODULE_NAME = 'AsteroidUser'

const DEFAULT_OPTIONS: AsteroidUserOptions = {
  networkType: 'production',
  accessToken: undefined,
  refreshToken: undefined,
  autoUpdateTokens: true,
  id: '0',
  loggerOptions: {},
}

export interface AsteroidUserOptions {
  networkType?: ConnectionNetworkType
  accessToken?: string
  refreshToken?: string
  autoUpdateTokens?: boolean
  id?: string
  loggerOptions?: LoggerOptions
}

export class AsteroidUser {
  private options: AsteroidUserOptions
  private currentAccessToken: string | undefined
  private currentRefreshToken: string | undefined
  private logger: Logger

  constructor(options: AsteroidUserOptions = {}) {
    // Associate optional properties
    this.options = merge({}, DEFAULT_OPTIONS, options)
    this.validateOptionalParameters()

    // Bootstrapping
    this.setAccessToken(this.options.accessToken!)
    this.setRefreshToken(this.options.refreshToken!)
    this.logger = new Logger(MODULE_NAME, this.options.loggerOptions)
    this.logger.debug('constructor completes.')
  }

  get asteroidDomainUserBaseUrl(): string {
    if (this.options.networkType) {
      return NetworkHelper.getAsteroidDomainUserBaseUrl(this.options.networkType)
    }

    throw new Error('Unable to determine baseUrl for AsteroidDomainUser.')
  }

  get asteroidDomainWorkerBaseUrl(): string {
    if (this.options.networkType) {
      return NetworkHelper.getAsteroidDomainWorkerBaseUrl(this.options.networkType)
    }

    throw new Error('Unable to determine baseUrl for AsteroidDomainWorker.')
  }

  get accessToken(): string | undefined {
    return this.currentAccessToken
  }

  get refreshToken(): string | undefined {
    return this.currentRefreshToken
  }

  get id(): string {
    return this.options.id!
  }

  setAccessToken(token: string) {
    this.currentAccessToken = token
  }

  setRefreshToken(token: string) {
    this.currentRefreshToken = token
  }

  async claimTask(taskId: string): Promise<void> {
    this.logger.debug('claimTask triggered.')

    const req: ClaimTaskRequest = {
      access_token: this.accessToken!,
      task_id: taskId,
    }
    await rpc.worker.claimTask(this.asteroidDomainWorkerBaseUrl, req, this.id)
  }

  async createClaim(claim: AttributeClaimItem): Promise<void> {
    this.logger.debug('createClaim triggered.')

    const req: CreateClaimRequest = {
      access_token: this.accessToken!,
      claim,
    }
    await this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc.user.createClaim, req)
  }

  async createAttributes(attributes: UserAttribute[]): Promise<UserAttribute[]> {
    this.logger.debug('createAttributes triggered.')

    const req: CreateAttributesRequest = {
      access_token: this.accessToken!,
      attributes,
    }
    const res: CreateAttributesResponse = await this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc.user.createAttributes, req)
    return res.attributes
  }

  /**
   * @returns ID of the newly created profile
   */
  async createProfile(remark: string, profileType: string): Promise<string> {
    this.logger.debug('createProfile triggered.')

    const req: CreateProfileRequest = {
      access_token: this.accessToken!,
      profile_type: profileType,
      payload: {
        remark,
      },
    }
    const res: CreateProfileResponse = await this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc.user.createProfile, req)
    return res.profile_id
  }

  async createProfilePrivToken(profileId: string, remark: string, active = true): Promise<ProfilePrivItem> {
    this.logger.debug('createProfilePrivToken triggered.')

    const req: CreateProfilePrivTokenRequest = {
      access_token: this.accessToken!,
      profile_id: profileId,
      payload: {
        remark,
        active,
      },
    }
    const res: CreateProfilePrivTokenResponse = await this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc.user.createProfilePrivToken, req)
    return res.privilege
  }

  /**
   * @returns ID of the newly created task
   */
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
    const res = await rpc.worker.createTask(this.asteroidDomainWorkerBaseUrl, req, this.id)
    return res.task_id
  }

  async deleteAttributes(attributes: UserAttribute[]): Promise<UserAttribute[]> {
    this.logger.debug('deleteAttributes triggered.')

    const req: DeleteAttributesRequest = {
      access_token: this.accessToken!,
      attributes,
    }
    const res: DeleteAttributesResponse = await this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc.user.deleteAttributes, req)
    return res.attributes
  }

  async deleteProfile(profileId: string): Promise<void> {
    this.logger.debug('deleteProfile triggered.')

    const req: DeleteProfileRequest = {
      access_token: this.accessToken!,
      profile_id: profileId,
    }
    await this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc.user.deleteProfile, req)
  }

  async deleteProfilePriv(privilegeId: string): Promise<void> {
    this.logger.debug('deleteProfilePriv triggered.')

    const req: DeleteProfilePrivRequest = {
      access_token: this.accessToken!,
      priv_id: privilegeId,
    }
    await this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc.user.deleteProfilePriv, req)
  }

  async getActiveTaskIds(): Promise<string[]> {
    this.logger.debug('getActiveTaskIds triggered.')

    const req: GetActiveTaskIdsRequest = {
      access_token: this.accessToken!,
    }
    const res = await rpc.worker.getActiveTaskIds(this.asteroidDomainWorkerBaseUrl, req, this.id)
    return res.task_ids
  }

  async getAttributeHeadersByTypes(types: string[]): Promise<UserAttributeHeader[]> {
    this.logger.debug('getAttributeHeadersByTypes triggered.')

    const req: GetAttributeHeadersByTypesRequest = {
      access_token: this.accessToken!,
      types,
    }
    const res: GetAttributeHeadersByTypesResponse = await this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc.user.getAttributeHeadersByTypes, req)
    return res.headers
  }

  async getAttributesByIds(attributeHeaders: UserAttributeHeader[]): Promise<UserAttribute[]> {
    this.logger.debug('getAttributesByIds triggered.')

    const req: GetAttributesByIdsRequest = {
      access_token: this.accessToken!,
      attributes: attributeHeaders,
    }
    const res: GetAttributesByIdsResponse = await this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc.user.getAttributesByIds, req)
    return res.attributes
  }

  async getFlatProfileById(profileId: string): Promise<UserProfile> {
    this.logger.debug('getFlatProfileById triggered.')

    const req: GetFlatProfileByIdRequest = {
      access_token: this.accessToken!,
      profile_id: profileId,
    }
    const res: GetFlatProfileByIdResponse = await this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc.user.getFlatProfileById, req)
    return res.profile
  }

  async getLatestLogsByTypes(types: string[]): Promise<UserLog[]> {
    this.logger.debug('getLatestLogsByTypes triggered.')

    const req: GetLatestLogsByTypesRequest = {
      access_token: this.accessToken!,
      types,
    }
    const res: GetLatestLogsByTypesResponse = await this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc.user.getLatestLogsByTypes, req)
    return res.logs
  }

  async getLogHeadersByTypes(types: string[], startTimestamp: number, endTimestamp: number): Promise<UserLogHeader[]> {
    this.logger.debug('getLogHeadersByTypes triggered.')

    const req: GetLogHeadersByTypesRequest = {
      access_token: this.accessToken!,
      types,
      start_time: startTimestamp,
      end_time: endTimestamp,
    }
    const res: GetLogHeadersByTypesResponse = await this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc.user.getLogHeadersByTypes, req)
    return res.headers
  }

  async getLogsByIds(logHeaders: UserLogHeader[]): Promise<UserLog[]> {
    this.logger.debug('getLogsByIds triggered.')

    const req: GetLogsByIdsRequest = {
      access_token: this.accessToken!,
      logs: logHeaders,
    }
    const res: GetLogsByIdsResponse = await this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc.user.getLogsByIds, req)
    return res.logs
  }

  async getOwnedProfileHeaders(profileType: string): Promise<UserProfile[]> {
    this.logger.debug('getOwnedProfileHeaders triggered.')

    const req: GetOwnedProfileHeadersRequest = {
      access_token: this.accessToken!,
      profile_type: profileType
    }
    const res: GetOwnedProfileHeadersResponse = await this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc.user.getOwnedProfileHeaders, req)
    return res.profiles
  }

  async getProfileById(profileId: string): Promise<UserProfile> {
    this.logger.debug('getProfileById triggered.')

    const req: GetProfileByIdRequest = {
      access_token: this.accessToken!,
      profile_id: profileId,
    }
    const res: GetProfileByIdResponse = await this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc.user.getProfileById, req)
    return res.profile
  }

  async getProfilePrivs(profileId: string): Promise<ProfilePrivItem[]> {
    this.logger.debug('getProfilePrivs triggered.')

    const req: GetProfilePrivsRequest = {
      access_token: this.accessToken!,
      profile_id: profileId,
    }
    const res: GetProfilePrivsResponse = await this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc.user.getProfilePrivs, req)
    return res.privileges
  }

  async getUnclaimedTask(taskTypes: ClaimTaskTypeItem[]): Promise<ClaimTaskItem> {
    this.logger.debug('getUnclaimedTask triggered.')

    const req: GetUnclaimedTaskRequest = {
      access_token: this.accessToken!,
      task_types: taskTypes,
    }
    const res = await rpc.worker.getUnclaimedTask(this.asteroidDomainUserBaseUrl, req, this.id)
    return res
  }

  async getTaskById(taskId: string): Promise<ClaimTaskItem> {
    this.logger.debug('getTaskById triggered.')

    const req: GetTaskByIdRequest = {
      access_token: this.accessToken!,
      task_id: taskId,
    }
    const res = await rpc.worker.getTaskById(this.asteroidDomainWorkerBaseUrl, req, this.id)
    return res
  }

  async logout(): Promise<void> {
    this.logger.debug('logout triggered.')

    const req: LogoutRequest = {
      access_token: this.accessToken!,
      refresh_token: this.refreshToken!,
    }
    await rpc.user.logout(this.asteroidDomainUserBaseUrl, req, this.id)

    this.setAccessToken('')
    // TODO: emit change of access token
    this.setRefreshToken('')
    // TODO: emit change of refresh token
  }

  async modifyProfileComponents(modifyProfileItems: ModifyProfileItem[]): Promise<ModifyProfileComponentItem[]> {
    this.logger.debug('modifyProfileComponents triggered.')

    const req: ModifyProfileComponentsRequest = {
      access_token: this.accessToken!,
      payload: modifyProfileItems,
    }
    const res: ModifyProfileComponentsResponse = await this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc.user.modifyProfileComponents, req)
    return res.components
  }

  async registerWorker(accessPoint: string): Promise<void> {
    this.logger.debug('registerWorker triggered.')

    const req: RegisterWorkerRequest = {
      access_token: this.accessToken!,
      access_point: accessPoint,
    }
    await rpc.worker.registerWorker(this.asteroidDomainWorkerBaseUrl, req, this.id)
  }

  async resolveTask(taskId: string): Promise<void> {
    this.logger.debug('resolveTask triggered.')

    const req: ResolveTaskRequest = {
      access_token: this.accessToken!,
      task_id: taskId,
    }
    await rpc.worker.resolveTask(this.asteroidDomainWorkerBaseUrl, req, this.id)
  }

  async sendProfileTokenByEmail(privilegeId: string, targetEmails: string[], message: string): Promise<void> {
    this.logger.debug('sendProfileTokenByEmail triggered.')

    const req: SendProfileTokenByEmailRequest = {
      access_token: this.accessToken!,
      priv_id: privilegeId,
      target_emails: targetEmails,
      message,
    }
    await this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc.user.sendProfileTokenByEmail, req)
  }

  async setUserGroupByEmail(email: string, group: string): Promise<void> {
    this.logger.debug('setUserGroupByEmail triggered.')

    const req: SetUserGroupByEmailRequest = {
      access_token: this.accessToken!,
      email,
      group,
    }
    await rpc.user.setUserGroupByEmail(this.asteroidDomainUserBaseUrl, req, this.id)
  }

  async submitWorkflowToken(dynamicToken: string): Promise<void> {
    this.logger.debug('submitWorkflowToken triggered.')

    const req: SubmitWorkflowTokenRequest = {
      access_token: this.accessToken!,
      dynamic_token: dynamicToken,
    }
    await this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc.user.submitWorkflowToken, req)
  }

  async updateAttributes(attributes: UserAttribute[]): Promise<UserAttribute[]> {
    this.logger.debug('updateAttributes triggered.')

    const req: UpdateAttributesRequest = {
      access_token: this.accessToken!,
      attributes,
    }
    const res: UpdateAttributesResponse = await this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc.user.updateAttributes, req)
    return res.attributes
  }

  async updatePasswordJwt(password: string): Promise<void> {
    this.logger.debug('updatePasswordJwt triggered.')

    const req: UpdatePasswordJwtRequest = {
      access_token: this.accessToken!,
      password,
    }
    await this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc.user.updatePasswordJwt, req)
  }

  async updateProfile(profileId: string, remark: string): Promise<void> {
    this.logger.debug('updateProfile triggered.')

    const req: UpdateProfileRequest = {
      access_token: this.accessToken!,
      profile_id: profileId,
      payload: {
        remark,
      },
    }
    await this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc.user.updateProfile, req)
  }

  async updateProfilePriv(privilegeId: string, remark: string, active: boolean): Promise<void> {
    this.logger.debug('updateProfilePriv triggered.')

    const req: UpdateProfilePrivRequest = {
      access_token: this.accessToken!,
      priv_id: privilegeId,
      payload: {
        remark,
        active,
      },
    }
    await this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc.user.updateProfilePriv, req)
  }

  async unclaimTask(taskId: string): Promise<void> {
    this.logger.debug('unclaimTask triggered.')

    const req: UnclaimTaskRequest = {
      access_token: this.accessToken!,
      task_id: taskId,
    }
    await rpc.worker.unclaimTask(this.asteroidDomainWorkerBaseUrl, req, this.id)
  }

  // ...

  private validateOptionalParameters() {
    // TODO: validate accessToken
    // TODO: validate refreshToken
  }

  // TODO: Need better input/output typings
  private async invokeOrRefreshToken(baseUrl: string, method: any, req: object): Promise<any> {
    try {
      return await method(baseUrl, req, this.id)
    } catch (err) {
      // Standard behavior of it is not a Invalid Token error
      if (err.code !== rpcErrorCodes.InvalidJwtToken) {
        throw err
      }

      // Determine if need to attempt for refresh token
      if (!this.options.autoUpdateTokens) {
        throw err
      }

      // Attempt to refresh the access_token
      const tokenReq: NewAccessTokenRequest = { refresh_token: this.refreshToken! }
      const tokenRes = await rpc.user.newAccessToken(baseUrl, tokenReq, this.id)
      this.setAccessToken(tokenRes.access_token)
      // TODO: emit change of access token

      // Reattempt the original RPC invoke
      return await method(baseUrl, req, this.id)
    }
  }
}
