import { merge } from 'lodash'
import { Logger, LoggerOptions } from 'node-log-it'
import axios from 'axios'

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

  async getAsteroidUserVersion(): Promise<any> {
    const url = 'https://stage-user.asteroid.moonlight.io/version'
    const res = await axios.get(url)
    return res.data.version
  }

  private validateOptionalParameters() {
    // TODO
  }
}
