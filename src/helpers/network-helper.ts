import { ConnectionNetworkType } from '../interfaces'

export class NetworkHelper {
  static getAsteroidDomainUserBaseUrl(networkType: ConnectionNetworkType): string {
    // TODO: place magic strings are constant
    if (networkType === 'production') {
      return 'https://user.asteroid.moonlight.io'
    }
    if (networkType === 'stage') {
      return 'https://stage-user.asteroid.moonlight.io'
    }
    throw new Error(`Unknown networkType: [${networkType}]`)
  }

  static getAsteroidDomainWorkerBaseUrl(networkType: ConnectionNetworkType): string {
    if (networkType === 'production') {
      return 'https://worker.asteroid.moonlight.io'
    }
    if (networkType === 'stage') {
      return 'https://stage-worker.asteroid.moonlight.io'
    }
    throw new Error(`Unknown networkType: [${networkType}]`)
  }
}
