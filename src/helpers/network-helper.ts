import { ConnectionNetworkType } from '../interfaces'
import { urls } from '../constants/urls'

export class NetworkHelper {
  static getAsteroidDomainUserBaseUrl(networkType: ConnectionNetworkType): string {
    if (networkType === 'production') {
      return urls.asteroidDomainUser.baseUrl.production
    }
    if (networkType === 'stage') {
      return urls.asteroidDomainUser.baseUrl.stage
    }
    if (networkType === 'dev') {
      return urls.asteroidDomainUser.baseUrl.dev
    }
    throw new Error(`Unknown networkType: [${networkType}]`)
  }

  static getAsteroidDomainWorkerBaseUrl(networkType: ConnectionNetworkType): string {
    if (networkType === 'production') {
      return urls.asteroidDomainWorker.baseUrl.production
    }
    if (networkType === 'stage') {
      return urls.asteroidDomainWorker.baseUrl.stage
    }
    if (networkType === 'dev') {
      return urls.asteroidDomainWorker.baseUrl.dev
    }
    throw new Error(`Unknown networkType: [${networkType}]`)
  }
}