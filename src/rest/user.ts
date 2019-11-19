import axios, { AxiosRequestConfig } from 'axios'
import { GetVersionResponse } from '../interfaces'
import { UrlHelper } from '../helpers'

export class AsteroidUserRest {
  static async getVersion(baseUrl: string, config?: AxiosRequestConfig): Promise<GetVersionResponse> {
    const url = UrlHelper.getVersionUrl(baseUrl)
    const res = await axios.get(url, config)
    return res.data
  }
}
