import { AxiosRequestConfig } from 'axios';
import { GetVersionResponse } from '../interfaces';
export declare class AsteroidUserRest {
    static getVersion(baseUrl: string, config?: AxiosRequestConfig): Promise<GetVersionResponse>;
}
