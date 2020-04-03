export interface EmptyObject {
    [key: string]: never;
}
export declare type ConnectionNetworkType = 'stage' | 'production';
export interface ConnectionNetworkConfig {
    asteroidDomainUserBaseUrl: string;
    asteroidDomainWorkerBaseUrl: string;
}
export declare type UpdatePasswordTokenType = 'NewAccount' | 'PasswordReset';
export interface NetworkItem {
    name: string;
    protocol?: ProtocolItem;
    nodes?: string[];
    extra: {
        [key: string]: string;
    };
}
export interface ProtocolItem {
    magic: number;
    addressVersion: number;
    standbyValidators: string[];
    seedList: string[];
    systemFee: {
        [key: string]: number;
    };
}
export interface Terms {
    terms_type: string;
    approval_timestamp: string;
}
