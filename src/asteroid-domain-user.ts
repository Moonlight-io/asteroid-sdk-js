import { merge } from 'lodash'
import { Logger, LoggerOptions } from 'node-log-it'
import buildUrl from 'build-url'
import { rpc } from './rpc'
import { RegisterEmailRequest, RegisterEmailWithSecretRequest, UpdatePasswordRequest, UpdatePasswordTokenType, UpdatePasswordJwtRequest, RequestPasswordResetRequest, ConnectionNetworkType, ConnectionNetworkConfig } from './interfaces'

const MODULE_NAME = 'AsteroidDomainUser'

const DEFAULT_OPTIONS: AsteroidDomainUserOptions = {
  networkType: 'production',
  networkConfig: undefined,
  accessToken: undefined,
  refreshToken: undefined,
  autoUpdateTokens: true,
  loggerOptions: {},
}

export interface AsteroidDomainUserOptions {
  networkType?: ConnectionNetworkType
  networkConfig?: ConnectionNetworkConfig
  accessToken?: string
  refreshToken?: string
  autoUpdateTokens?: boolean
  loggerOptions?: LoggerOptions
}

export class AsteroidDomainUser {
  private options: AsteroidDomainUserOptions
  private currentAccessToken: string
  private logger: Logger

  constructor(options: AsteroidDomainUserOptions = {}) {
    // Associate optional properties
    this.options = merge({}, DEFAULT_OPTIONS, options)
    this.validateOptionalParameters()

    // Bootstrapping
    this.currentAccessToken = this.options.accessToken!
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

  get accessToken(): string {
    return this.currentAccessToken
  }

  get refreshToken(): string | undefined {
    return this.options.refreshToken
  }

  async registerEmail(email: string): Promise<void> {
    this.logger.debug('registerEmail triggered.')

    const req: RegisterEmailRequest = {
      email,
    }
    await rpc.user.registerEmail(this.rpcUrl, req)
  }

  async registerEmailWithSecret(email: string, secret: string): Promise<string> {
    this.logger.debug('registerEmailWithSecret triggered.')

    const req: RegisterEmailWithSecretRequest = {
      email,
      secret,
    }
    const res = await rpc.user.registerEmailWithSecret(this.rpcUrl, req)
    return res.dynamic_token
  }

  async updatePassword(password: string, dynamicToken: string, tokenType: UpdatePasswordTokenType): Promise<void> {
    this.logger.debug('updatePassword triggered.')

    const req: UpdatePasswordRequest = {
      password,
      dynamic_token: dynamicToken,
      token_type: tokenType,
    }
    await rpc.user.updatePassword(this.rpcUrl, req)
  }

  async updatePasswordJwt(password: string): Promise<void> {
    this.logger.debug('updatePasswordJwt triggered.')

    const req: UpdatePasswordJwtRequest = {
      access_token: this.accessToken,
      password,
    }
    // TODO: need mechanism to handle refresh of accessToken
    await rpc.user.updatePasswordJwt(this.rpcUrl, req)
  }

  async requestPasswordReset(email: string): Promise<void> {
    this.logger.debug('requestPasswordReset triggered.')

    const req: RequestPasswordResetRequest = {
      email,
    }
    await rpc.user.requestPasswordReset(this.rpcUrl, req)
  }

  // async getAsteroidUserVersion(): Promise<any> {
  //   const url = 'https://stage-user.asteroid.moonlight.io/version'
  //   const res = await axios.get(url)
  //   return res.data.version
  // }

  private validateOptionalParameters() {
    if (!this.options.networkType && !this.options.networkConfig) {
      throw new Error(`Require to provide either 'networkType' or 'networkConfig'.`)
    }
    if (!this.options.accessToken) {
      throw new Error(`Require to provide 'accessToken'.`)
    }
    if (this.options.autoUpdateTokens && !this.options.refreshToken) {
      throw new Error(`Require to provide 'refreshToken' when 'autoUpdateTokens' is enabled.`)
    }
  }
}
