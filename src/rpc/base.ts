import axios, { AxiosRequestConfig } from 'axios'
import * as JsonRpcError from 'json-rpc-error'

const invoke = async (rpcUrl: string, method: string, params: object, id: string, methodVersion: number, config?: AxiosRequestConfig): Promise<any> => {
  const payload = {
    jsonrpc: '2.0',
    id,
    method,
    params: {
      version: methodVersion,
      ...params,
    },
  }

  const res = await axios.post(rpcUrl, payload, config)
  if (res.data.error) {
    throw new JsonRpcError(res.data.error.message, res.data.error.code)
  }
  return res.data.result
}

export { invoke }
