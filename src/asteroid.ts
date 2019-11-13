import { merge } from 'lodash'
import request, { RequestPromiseOptions } from 'request-promise'
import { Logger, LoggerOptions } from 'node-log-it'

const MODULE_NAME = 'Asteroid'

const DEFAULT_OPTIONS: AsteroidOptions = {
  baseUrl: 'https://stage-user.asteroid.moonlight.io',
  loggerOptions: {},
}

export interface AsteroidOptions {
  baseUrl?: string
  loggerOptions?: LoggerOptions
}

export class Asteroid {
  private options: AsteroidOptions
  private logger: Logger

  constructor(options: AsteroidOptions = {}) {
    // Associate optional properties
    this.options = merge({}, DEFAULT_OPTIONS, options)
    this.validateOptionalParameters()

    // Bootstrapping
    this.logger = new Logger(MODULE_NAME, this.options.loggerOptions)
  }

  greet(name: string = 'World'): string {
    return `Hello, ${name}`
  }

  sum(a: number, b: number): number {
    return a + b
  }

  async getAsteroidUserVersion(): Promise<string> {
    const url = 'https://stage-user.asteroid.moonlight.io/version'
    const opt = {
      uri: url,
      json: true,
    }
    const res = await request(opt)
    return res.version
  }

  private validateOptionalParameters() {
    // TODO
  }
}
