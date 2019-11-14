import { AxiosRequestConfig } from 'axios';
declare const invoke: (rpcUrl: string, method: string, params: object, id: string, methodVersion: number, config?: AxiosRequestConfig | undefined) => Promise<any>;
export { invoke };
