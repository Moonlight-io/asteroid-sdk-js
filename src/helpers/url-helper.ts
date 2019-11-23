import BuildUrl = require('build-url')

export class UrlHelper {
  static getRpcUrl(baseUrl: string): string {
    return BuildUrl(baseUrl, {
      path: '/rpc',
    })
  }

  static getVersionUrl(baseUrl: string): string {
    return BuildUrl(baseUrl, {
      path: '/version',
    })
  }
}
