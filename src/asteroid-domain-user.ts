import { merge } from 'lodash'
import { Logger, LoggerOptions } from 'node-log-it'
import buildUrl from 'build-url'
import { rpc } from './rpc'
import {
  RegisterEmailRequest,
  RegisterEmailWithSecretRequest,
  UpdatePasswordRequest,
  UpdatePasswordTokenType,
  UpdatePasswordJwtRequest,
  RequestPasswordResetRequest,
  ConnectionNetworkType,
  ConnectionNetworkConfig,
  NewAccessTokenRequest,
  GetVersionResponse,
  LoginEmailRequest,
  LoginOauthRequest,
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
  DeleteProfileResponse,
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
  UpdateProfileResponse,
  GetProfileByTokenRequest,
  GetProfileByTokenResponse,
} from './interfaces'
import { rpcErrorCodes } from './constants'
import { rest } from './rest'

const MODULE_NAME = 'AsteroidDomainUser'

const DEFAULT_OPTIONS: AsteroidDomainUserOptions = {
  networkType: 'production',
  networkConfig: undefined,
  accessToken: undefined,
  refreshToken: undefined,
  autoUpdateTokens: true,
  id: '0',
  loggerOptions: {},
}

export interface AsteroidDomainUserOptions {
  networkType?: ConnectionNetworkType
  networkConfig?: ConnectionNetworkConfig
  accessToken?: string
  refreshToken?: string
  autoUpdateTokens?: boolean
  id?: string
  loggerOptions?: LoggerOptions
}

export class AsteroidDomainUser {
  private options: AsteroidDomainUserOptions
  private currentAccessToken: string | undefined
  private currentRefreshToken: string | undefined
  private logger: Logger

  constructor(options: AsteroidDomainUserOptions = {}) {
    // Associate optional properties
    this.options = merge({}, DEFAULT_OPTIONS, options)
    this.validateOptionalParameters()

    // Bootstrapping
    this.currentAccessToken = this.options.accessToken
    this.currentRefreshToken = this.options.refreshToken
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
        return 'https://user.asteroid.moonlight.io'
      }
      if (this.options.networkType === 'stage') {
        return 'https://stage-user.asteroid.moonlight.io'
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

  async getVersionInfo(): Promise<GetVersionResponse> {
    return await rest.user.getVersion(this.baseUrl)
  }

  // #region Register

  async registerEmail(email: string): Promise<void> {
    this.logger.debug('registerEmail triggered.')

    const req: RegisterEmailRequest = {
      email,
    }
    await rpc.user.registerEmail(this.rpcUrl, req, this.id)
  }

  async registerEmailWithSecret(email: string, secret: string): Promise<string> {
    this.logger.debug('registerEmailWithSecret triggered.')

    const req: RegisterEmailWithSecretRequest = {
      email,
      secret,
    }
    const res = await rpc.user.registerEmailWithSecret(this.rpcUrl, req, this.id)
    return res.dynamic_token
  }

  async updatePassword(password: string, dynamicToken: string, tokenType: UpdatePasswordTokenType): Promise<void> {
    this.logger.debug('updatePassword triggered.')

    const req: UpdatePasswordRequest = {
      password,
      dynamic_token: dynamicToken,
      token_type: tokenType,
    }
    await rpc.user.updatePassword(this.rpcUrl, req, this.id)
  }

  async updatePasswordJwt(password: string): Promise<void> {
    this.logger.debug('updatePasswordJwt triggered.')

    const req: UpdatePasswordJwtRequest = {
      access_token: this.accessToken!,
      password,
    }
    await this.invokeOrRefreshToken(rpc.user.updatePasswordJwt, req)
  }

  async requestPasswordReset(email: string): Promise<void> {
    this.logger.debug('requestPasswordReset triggered.')

    const req: RequestPasswordResetRequest = {
      email,
    }
    await rpc.user.requestPasswordReset(this.rpcUrl, req, this.id)
  }

  // #endregion

  // #region Authenticate

  async loginEmail(email: string, password: string): Promise<void> {
    this.logger.debug('loginEmail triggered.')

    const req: LoginEmailRequest = {
      email,
      password,
    }
    const res = await rpc.user.loginEmail(this.rpcUrl, req, this.id)

    this.setAccessToken(res.access_token)
    // TODO: emit change of access token
    this.setRefreshToken(res.refresh_token)
    // TODO: emit change of refresh token
  }

  async loginOauth(provider: string, oauthPayload: object): Promise<void> {
    this.logger.debug('loginOauth triggered.')

    const req: LoginOauthRequest = {
      provider,
      payload: oauthPayload,
    }
    const res = await rpc.user.loginOauth(this.rpcUrl, req, this.id)

    this.setAccessToken(res.access_token)
    // TODO: emit change of access token
    this.setRefreshToken(res.refresh_token)
    // TODO: emit change of refresh token
  }

  async setUserGroupByEmail(email: string, group: string): Promise<void> {
    this.logger.debug('setUserGroupByEmail triggered.')

    const req: SetUserGroupByEmailRequest = {
      access_token: this.accessToken!,
      email,
      group,
    }
    await rpc.user.setUserGroupByEmail(this.rpcUrl, req, this.id)
  }

  async newAccessToken(): Promise<void> {
    this.logger.debug('newAccessToken triggered.')

    const req: NewAccessTokenRequest = {
      refresh_token: this.refreshToken!,
    }
    const res = await rpc.user.newAccessToken(this.rpcUrl, req, this.id)

    this.setAccessToken(res.access_token)
    // TODO: emit change of access token
  }

  async logout(): Promise<void> {
    this.logger.debug('logout triggered.')

    const req: LogoutRequest = {
      access_token: this.accessToken!,
      refresh_token: this.refreshToken!,
    }
    await rpc.user.logout(this.rpcUrl, req, this.id)

    this.setAccessToken('')
    // TODO: emit change of access token
    this.setRefreshToken('')
    // TODO: emit change of refresh token
  }

  // #endregion

  // #region Attributes

  async createAttributes(attributes: UserAttribute[]): Promise<UserAttribute[]> {
    this.logger.debug('createAttributes triggered.')

    const req: CreateAttributesRequest = {
      access_token: this.accessToken!,
      attributes,
    }
    const res: CreateAttributesResponse = await this.invokeOrRefreshToken(rpc.user.createAttributes, req)
    return res.attributes
  }

  async updateAttributes(attributes: UserAttribute[]): Promise<UserAttribute[]> {
    this.logger.debug('updateAttributes triggered.')

    const req: UpdateAttributesRequest = {
      access_token: this.accessToken!,
      attributes,
    }
    const res: UpdateAttributesResponse = await this.invokeOrRefreshToken(rpc.user.updateAttributes, req)
    return res.attributes
  }

  async deleteAttributes(attributes: UserAttribute[]): Promise<UserAttribute[]> {
    this.logger.debug('deleteAttributes triggered.')

    const req: DeleteAttributesRequest = {
      access_token: this.accessToken!,
      attributes,
    }
    const res: DeleteAttributesResponse = await this.invokeOrRefreshToken(rpc.user.deleteAttributes, req)
    return res.attributes
  }

  async getAttributeHeadersByTypes(types: string[]): Promise<UserAttributeHeader[]> {
    this.logger.debug('getAttributeHeadersByTypes triggered.')

    const req: GetAttributeHeadersByTypesRequest = {
      access_token: this.accessToken!,
      types,
    }
    const res: GetAttributeHeadersByTypesResponse = await this.invokeOrRefreshToken(rpc.user.getAttributeHeadersByTypes, req)
    return res.headers
  }

  async getAttributesByIds(attributeHeaders: UserAttributeHeader[]): Promise<UserAttribute[]> {
    this.logger.debug('getAttributesByIds triggered.')

    const req: GetAttributesByIdsRequest = {
      access_token: this.accessToken!,
      attributes: attributeHeaders,
    }
    const res: GetAttributesByIdsResponse = await this.invokeOrRefreshToken(rpc.user.getAttributesByIds, req)
    return res.attributes
  }

  // #endregion

  // #region Profiles

  async createProfile(remark: string): Promise<string> {
    this.logger.debug('createProfile triggered.')

    const req: CreateProfileRequest = {
      access_token: this.accessToken!,
      payload: {
        remark,
      },
    }
    const res: CreateProfileResponse = await this.invokeOrRefreshToken(rpc.user.createProfile, req)
    return res.profile_id
  }

  async deleteProfile(profileId: string): Promise<void> {
    this.logger.debug('deleteProfile triggered.')

    const req: DeleteProfileRequest = {
      access_token: this.accessToken!,
      profile_id: profileId,
    }
    await this.invokeOrRefreshToken(rpc.user.deleteProfile, req)
  }

  async getOwnedProfileHeaders(): Promise<UserProfile[]> {
    this.logger.debug('getOwnedProfileHeaders triggered.')

    const req: GetOwnedProfileHeadersRequest = {
      access_token: this.accessToken!,
    }
    const res: GetOwnedProfileHeadersResponse = await this.invokeOrRefreshToken(rpc.user.getOwnedProfileHeaders, req)
    return res.profiles
  }

  async modifyProfileComponents(modifyProfileItems: ModifyProfileItem[]): Promise<ModifyProfileComponentItem[]> {
    this.logger.debug('modifyProfileComponents triggered.')

    const req: ModifyProfileComponentsRequest = {
      access_token: this.accessToken!,
      payload: modifyProfileItems,
    }
    const res: ModifyProfileComponentsResponse = await this.invokeOrRefreshToken(rpc.user.modifyProfileComponents, req)
    return res.components
  }

  async getProfileById(profileId: string): Promise<UserProfile> {
    this.logger.debug('getProfileById triggered.')

    const req: GetProfileByIdRequest = {
      access_token: this.accessToken!,
      profile_id: profileId,
    }
    const res: GetProfileByIdResponse = await this.invokeOrRefreshToken(rpc.user.getProfileById, req)
    return res.profile
  }

  async getFlatProfileById(profileId: string): Promise<UserProfile> {
    this.logger.debug('getFlatProfileById triggered.')

    const req: GetFlatProfileByIdRequest = {
      access_token: this.accessToken!,
      profile_id: profileId,
    }
    const res: GetFlatProfileByIdResponse = await this.invokeOrRefreshToken(rpc.user.getFlatProfileById, req)
    return res.profile
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
    await this.invokeOrRefreshToken(rpc.user.updateProfile, req)
  }

  async getProfileByToken(token: string): Promise<UserProfile> {
    this.logger.debug('getProfileByToken triggered.')

    const req: GetProfileByTokenRequest = {
      dynamic_token: token,
    }
    const res: GetProfileByTokenResponse = await rpc.user.getProfileByToken(this.rpcUrl, req, this.id)
    return res.profile
  }

  // #endregion

  // #region Profile Privileges

  // #endregion

  // #region Logs

  // #endregion

  // #region Claims

  // #endregion

  private validateOptionalParameters() {
    if (!this.options.networkType && !this.options.networkConfig) {
      throw new Error(`Require to provide either 'networkType' or 'networkConfig'.`)
    }
    // if (!this.options.accessToken) {
    //   throw new Error(`Require to provide 'accessToken'.`)
    // }
    // if (this.options.autoUpdateTokens && !this.options.refreshToken) {
    //   throw new Error(`Require to provide 'refreshToken' when 'autoUpdateTokens' is enabled.`)
    // }
    if (this.options.id === undefined) {
      throw new Error(`Require to provide 'id'.`)
    }
  }

  // TODO: Need better input/output typings
  private async invokeOrRefreshToken(method: any, req: object): Promise<any> {
    try {
      return await method(this.rpcUrl, req, this.id)
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
      const tokenRes = await rpc.user.newAccessToken(this.rpcUrl, tokenReq, this.id)
      this.setAccessToken(tokenRes.access_token)
      // TODO: emit change of access token

      // Reattempt the original RPC invoke
      return await method(this.rpcUrl, req, this.id)
    }
  }
}
