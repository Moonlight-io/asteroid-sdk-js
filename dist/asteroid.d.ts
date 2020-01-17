import { LoggerOptions } from 'node-log-it';
import { ConnectionNetworkType, ConnectionNetworkConfig, UpdatePasswordTokenType, UserProfile } from './interfaces';
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
    getProfileByToken(token: string): Promise<UserProfile>;
    loginEmail(email: string, password: string): Promise<AsteroidUser>;
    registerEmail(email: string): Promise<void>;
    /**
     * @returns Dynamic token uses to update password.
     */
    registerEmailWithSecret(email: string, secret: string): Promise<string>;
    registerInterest(email: string): Promise<void>;
    setUserGroupByEmail(email: string, group: string, secret: string): Promise<void>;
    updatePassword(password: string, dynamicToken: string, tokenType: UpdatePasswordTokenType): Promise<void>;
    private validateOptionalParameters;
}
