export interface KeychainKey {
    holder?: string;
    owner?: string;
    iss?: string;
    sub?: string;
    type?: string;
    payload?: string;
    signature?: string;
    encryption?: string;
    deleted: boolean;
    pointer: number;
}
