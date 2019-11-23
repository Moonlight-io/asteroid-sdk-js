import { LoggerOptions } from 'node-log-it';
import { ConnectionNetworkType, ConnectionNetworkConfig, UpdatePasswordTokenType } from './interfaces';
import { AsteroidUser } from './asteroid-user';
export interface AsteroidOptions {
    networkType?: ConnectionNetworkType;
    networkConfig?: ConnectionNetworkConfig;
    accessToken?: string;
    id?: string;
    loggerOptions?: LoggerOptions;
}
export declare class Asteroid {
    private options;
    private user;
    private logger;
    constructor(options?: AsteroidOptions);
    get asteroidDomainUserBaseUrl(): string;
    get asteroidDomainWorkerBaseUrl(): string;
    get id(): string;
    loginEmail(email: string, password: string): Promise<AsteroidUser>;
    registerEmail(email: string): Promise<void>;
    /**
     * @returns Dynamic token uses to update password.
     */
    registerEmailWithSecret(email: string, secret: string): Promise<string>;
    updatePassword(password: string, dynamicToken: string, tokenType: UpdatePasswordTokenType): Promise<void>;
    private validateOptionalParameters;
}
