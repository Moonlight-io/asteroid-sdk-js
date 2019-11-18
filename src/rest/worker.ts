import axios, { AxiosRequestConfig } from 'axios'
import buildUrl from 'build-url'
import { GetVersionResponse } from '../interfaces'

export class AsteroidWorkerRest {
  static async getVersion(baseUrl: string, config?: AxiosRequestConfig): Promise<GetVersionResponse> {
    const url = buildUrl(baseUrl, { path: '/version' })
    const res = await axios.get(url, config)
    return res.data
  }
}
