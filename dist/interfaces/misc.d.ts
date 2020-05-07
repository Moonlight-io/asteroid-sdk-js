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
export interface TermsApprovalItem {
    terms_type: string;
    approval_timestamp: number;
}
export declare type EncryptionMethod = 'unencrypted' | 'root_ecies' | 'holder_ecies' | 'symmetric_aes256';
export interface RootKeyItem {
    sub: string;
    rootPublicKey: string;
    rootPrivateKey: string;
}
