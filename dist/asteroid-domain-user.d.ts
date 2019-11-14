import { LoggerOptions } from 'node-log-it';
import { UpdatePasswordTokenType, ConnectionNetworkType, ConnectionNetworkConfig, GetVersionResponse } from './interfaces';
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
    private logger;
    constructor(options?: AsteroidDomainUserOptions);
    get baseUrl(): string;
    get rpcUrl(): string;
    get accessToken(): string;
    get refreshToken(): string | undefined;
    get id(): string;
    getVersionInfo(): Promise<GetVersionResponse>;
    registerEmail(email: string): Promise<void>;
    registerEmailWithSecret(email: string, secret: string): Promise<string>;
    updatePassword(password: string, dynamicToken: string, tokenType: UpdatePasswordTokenType): Promise<void>;
    updatePasswordJwt(password: string): Promise<void>;
    requestPasswordReset(email: string): Promise<void>;
    private validateOptionalParameters;
    private invokeOrRefreshToken;
    private setAccessToken;
}
