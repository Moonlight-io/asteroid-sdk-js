import { LoggerOptions } from 'node-log-it';
import { ConnectionNetworkType, ConnectionNetworkConfig, GetVersionResponse } from './interfaces';
export interface AsteroidDomainUserOptions {
    networkType?: ConnectionNetworkType;
    networkConfig?: ConnectionNetworkConfig;
    accessToken?: string;
    refreshToken?: string;
    autoUpdateTokens?: boolean;
    id?: string;
    loggerOptions?: LoggerOptions;
}
export declare class AsteroidDomainUser {
    private options;
    private currentAccessToken;
    private currentRefreshToken;
    private logger;
    constructor(options?: AsteroidDomainUserOptions);
    get baseUrl(): string;
    get accessToken(): string | undefined;
    get refreshToken(): string | undefined;
    get id(): string;
    setAccessToken(token: string): void;
    setRefreshToken(token: string): void;
    getVersionInfo(): Promise<GetVersionResponse>;
    requestPasswordReset(email: string): Promise<void>;
    loginOauth(provider: string, oauthPayload: object): Promise<void>;
    newAccessToken(): Promise<void>;
    private validateOptionalParameters;
    private invokeOrRefreshToken;
}
