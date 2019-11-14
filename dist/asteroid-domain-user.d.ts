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
    private currentRefreshToken;
    private logger;
    constructor(options?: AsteroidDomainUserOptions);
    get baseUrl(): string;
    get rpcUrl(): string;
    get accessToken(): string | undefined;
    get refreshToken(): string | undefined;
    get id(): string;
    setAccessToken(token: string): void;
    setRefreshToken(token: string): void;
    getVersionInfo(): Promise<GetVersionResponse>;
    registerEmail(email: string): Promise<void>;
    registerEmailWithSecret(email: string, secret: string): Promise<string>;
    updatePassword(password: string, dynamicToken: string, tokenType: UpdatePasswordTokenType): Promise<void>;
    updatePasswordJwt(password: string): Promise<void>;
    requestPasswordReset(email: string): Promise<void>;
    loginEmail(email: string, password: string): Promise<void>;
    loginOauth(provider: string, oauthPayload: object): Promise<void>;
    setUserGroupByEmail(email: string, group: string): Promise<void>;
    newAccessToken(): Promise<void>;
    logout(): Promise<void>;
    private validateOptionalParameters;
    private invokeOrRefreshToken;
}
