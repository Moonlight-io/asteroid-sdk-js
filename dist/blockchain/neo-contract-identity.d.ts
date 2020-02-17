/// <reference types="node" />
export declare class NeoContractIdentity {
    /**
     * gets the contract name
     * @param network
     * @param contractHash
     * @returns {Promise<any>}
     */
    static getContractName(network: any, contractHash: any): Promise<any>;
    /**
     * return the contract version
     * @param network
     * @param contractHash
     * @returns {Promise<number>}
     */
    static getContractVersion(network: any, contractHash: any): Promise<number | null>;
    /**
     * Test whether `identityId` exists on-chain
     */
    static getIdentityExists(network: any, contractHash: any, identityId: any): Promise<boolean>;
    static deleteIdentity(network: any, contractHash: any, identityId: any, adminKey: any, wif: any): Promise<void>;
    /**
     * creates a new identity for the user
     * @param network - the network
     * @param contractHash - the contract hash to invoke
     * @param wif - the wif of the user
     */
    static createIdentity(network: any, contractHash: any, wif: any): Promise<any>;
    static getRootPubKey(network: any, contractHash: any, identityId: any): Promise<any>;
    static getRootPrivKey(network: any, contractHash: any, identityId: any): Promise<any>;
    static issueProof(network: any, contractHash: any, identityId: any, owner: any, sub: any, type: any, payload: Buffer, encryption: any, wif: any): Promise<any>;
    static getKeyBySubAndType(network: any, contractHash: any, identityId: any, sub: any, type: any): Promise<any>;
}
