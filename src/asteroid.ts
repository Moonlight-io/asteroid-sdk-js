import { merge } from 'lodash'
import { Logger, LoggerOptions } from 'node-log-it'
import { rpc } from './rpc'
import {
  ConnectionNetworkType,
  ConnectionNetworkConfig,
  GetProfileByTokenRequest,
  GetProfileByTokenResponse,
  LoginEmailRequest,
  RegisterEmailRequest,
  RegisterEmailWithSecretRequest,
  SetUserGroupByEmailRequest,
  UpdatePasswordTokenType,
  UpdatePasswordRequest,
  UserProfile,
  RegisterInterestRequest,
} from './interfaces'
import { NetworkHelper } from './helpers'
import { AsteroidUser } from './asteroid-user'

const MODULE_NAME = 'Asteroid'

const DEFAULT_OPTIONS: AsteroidOptions = {
  networkType: 'production',
  networkConfig: undefined,
  accessToken: undefined,
  id: '0',
  loggerOptions: {},
}

export interface AsteroidOptions {
  networkType?: ConnectionNetworkType
  networkConfig?: ConnectionNetworkConfig
  accessToken?: string
  id?: string
  loggerOptions?: LoggerOptions
}

export class Asteroid {
  private options: AsteroidOptions
  private user: AsteroidUser | undefined
  private logger: Logger

  constructor(options: AsteroidOptions = {}) {
    // Associate optional properties
    this.options = merge({}, DEFAULT_OPTIONS, options)
    this.validateOptionalParameters()

    // Bootstrapping
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

  get id(): string {
    return this.options.id!
  }

  async getProfileByToken(token: string): Promise<UserProfile> {
    this.logger.debug('getProfileByToken triggered.')

    const req: GetProfileByTokenRequest = {
      dynamic_token: token,
    }
    const res: GetProfileByTokenResponse = await rpc.user.getProfileByToken(this.asteroidDomainUserBaseUrl, req, this.id)
    return res.profile
  }

  async loginEmail(email: string, password: string): Promise<AsteroidUser> {
    this.logger.debug('loginEmail triggered.')

    const req: LoginEmailRequest = {
      email,
      password,
    }
    const res = await rpc.user.loginEmail(this.asteroidDomainUserBaseUrl, req, this.id)

    this.user = new AsteroidUser({
      networkType: this.options.networkType,
      accessToken: res.access_token,
      refreshToken: res.refresh_token,
      id: this.id,
      loggerOptions: this.options.loggerOptions,
    })

    return this.user
  }

  async registerEmail(email: string): Promise<void> {
    this.logger.debug('registerEmail triggered.')

    const req: RegisterEmailRequest = {
      email,
    }
    await rpc.user.registerEmail(this.asteroidDomainUserBaseUrl, req, this.id)
  }

  /**
   * @returns Dynamic token uses to update password.
   */
  async registerEmailWithSecret(email: string, secret: string): Promise<string> {
    this.logger.debug('registerEmailWithSecret triggered.')

    const req: RegisterEmailWithSecretRequest = {
      email,
      secret,
    }
    const res = await rpc.user.registerEmailWithSecret(this.asteroidDomainUserBaseUrl, req, this.id)
    return res.dynamic_token
  }

  async registerInterest(email: string): Promise<void> {
    this.logger.debug('registerInterest triggered.')

    const req: RegisterInterestRequest = {
      email,
    }
    await rpc.user.registerInterest(this.asteroidDomainUserBaseUrl, req, this.id)
  }

  async setUserGroupByEmail(email: string, group: string, secret: string): Promise<void> {
    this.logger.debug('setUserGroupByEmail triggered.')

    const req: SetUserGroupByEmailRequest = {
      email,
      group,
      secret,
    }
    await rpc.user.setUserGroupByEmail(this.asteroidDomainUserBaseUrl, req, this.id)
  }

  async updatePassword(password: string, dynamicToken: string, tokenType: UpdatePasswordTokenType): Promise<void> {
    this.logger.debug('updatePassword triggered.')

    const req: UpdatePasswordRequest = {
      password,
      dynamic_token: dynamicToken,
      token_type: tokenType,
    }
    await rpc.user.updatePassword(this.asteroidDomainUserBaseUrl, req, this.id)
  }

  private validateOptionalParameters() {
    if (!this.options.networkType && !this.options.networkConfig) {
      throw new Error(`Require to provide either 'networkType' or 'networkConfig'.`)
    }
    if (this.options.id === undefined) {
      throw new Error(`Require to provide 'id'.`)
    }
  }
}
