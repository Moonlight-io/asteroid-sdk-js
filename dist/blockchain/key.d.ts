/// <reference types="node" />
interface KeyFields {
    childNumber: number;
    chainCode: Buffer;
    key: Buffer;
    fingerprint: Buffer;
    depth: number;
    isPrivate: boolean;
}
export declare class Key {
    f: KeyFields;
    constructor(fields: KeyFields);
    getWIF(): string;
}
export {};
