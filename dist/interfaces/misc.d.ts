export interface EmptyObject {
    [key: string]: never;
}
export declare type ConnectionNetworkType = 'stage' | 'production';
export interface ConnectionNetworkConfig {
    asteroidDomainUserBaseUrl: string;
    asteroidDomainWorkerBaseUrl: string;
}
export declare type UpdatePasswordTokenType = 'NewAccount' | 'PasswordReset';
