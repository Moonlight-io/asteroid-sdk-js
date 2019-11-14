import { merge } from 'lodash'
import { Logger, LoggerOptions } from 'node-log-it'
// import axios from 'axios'
import { rpc } from './rpc'
import { RegisterEmailRequest, RegisterEmailWithSecretRequest, UpdatePasswordRequest, UpdatePasswordTokenType, UpdatePasswordJwtRequest, RequestPasswordResetRequest } from './interfaces'

const MODULE_NAME = 'AsteroidDomainUser'

const DEFAULT_OPTIONS: AsteroidDomainUserOptions = {
  // baseUrl: 'https://stage-user.asteroid.moonlight.io',
  network: 'production',
  accessToken: undefined,
  refreshToken: undefined,
  loggerOptions: {},
}

export interface AsteroidDomainUserOptions {
  // baseUrl?: string
  network?: string
  accessToken?: string
  refreshToken?: string
  loggerOptions?: LoggerOptions
}

export class AsteroidDomainUser {
  private options: AsteroidDomainUserOptions
  private logger: Logger

  constructor(options: AsteroidDomainUserOptions = {}) {
    // Associate optional properties
    this.options = merge({}, DEFAULT_OPTIONS, options)
    this.validateOptionalParameters()

    // Bootstrapping
    this.logger = new Logger(MODULE_NAME, this.options.loggerOptions)

    this.logger.debug('constructor completes.')
  }

  get rpcUrl(): string {
    // TODO
    return 'https://stage-user.asteroid.moonlight.io/rpc'
  }

  get accessToken(): string {
    // TODO
    return 'FOO'
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
    // TODO
  }
}
