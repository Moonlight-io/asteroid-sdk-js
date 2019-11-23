import { AxiosRequestConfig } from 'axios';
/**
 * @returns RPC response data within its `results` property.
 * @throws {JsonRpcError}
 */
declare const invoke: (rpcUrl: string, method: string, params: object, id: string, methodVersion: number, config?: AxiosRequestConfig | undefined) => Promise<any>;
export { invoke };
