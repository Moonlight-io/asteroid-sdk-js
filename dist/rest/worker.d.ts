import { AxiosRequestConfig } from 'axios';
import { GetVersionResponse } from '../interfaces';
export declare class AsteroidWorkerRest {
    static getVersion(baseUrl: string, config?: AxiosRequestConfig): Promise<GetVersionResponse>;
}
