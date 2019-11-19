import { LoggerOptions } from 'node-log-it';
import { ConnectionNetworkType, ConnectionNetworkConfig, GetVersionResponse } from './interfaces';
export interface AsteroidDomainWorkerOptions {
    networkType?: ConnectionNetworkType;
    networkConfig?: ConnectionNetworkConfig;
    accessToken?: string;
    id?: string;
    loggerOptions?: LoggerOptions;
}
export declare class AsteroidDomainWorker {
    private options;
    private currentAccessToken;
    private logger;
    constructor(options?: AsteroidDomainWorkerOptions);
    get baseUrl(): string;
    get rpcUrl(): string;
    get accessToken(): string | undefined;
    get id(): string;
    setAccessToken(token: string): void;
    getVersionInfo(): Promise<GetVersionResponse>;
    private validateOptionalParameters;
}
