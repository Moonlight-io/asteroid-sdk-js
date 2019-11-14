import { LoggerOptions } from 'node-log-it';
import { UpdatePasswordTokenType } from './interfaces';
export interface AsteroidDomainUserOptions {
    network?: string;
    accessToken?: string;
    refreshToken?: string;
    loggerOptions?: LoggerOptions;
}
export declare class AsteroidDomainUser {
    private options;
    private logger;
    constructor(options?: AsteroidDomainUserOptions);
    get rpcUrl(): string;
    get accessToken(): string;
    registerEmail(email: string): Promise<void>;
    registerEmailWithSecret(email: string, secret: string): Promise<string>;
    updatePassword(password: string, dynamicToken: string, tokenType: UpdatePasswordTokenType): Promise<void>;
    updatePasswordJwt(password: string): Promise<void>;
    requestPasswordReset(email: string): Promise<void>;
    private validateOptionalParameters;
}
