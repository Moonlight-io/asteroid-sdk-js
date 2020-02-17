import { NetworkItem } from '../interfaces';
export declare class NeoContractIdentity {
    /**
     * gets the contract name
     * @param network
     * @param contractHash
     * @returns {Promise<any>}
     */
    static getContractName(network: NetworkItem, contractHash: string): Promise<any>;
    /**
     * have the identity contract do a dynamic invoke to the CNS registering itself
     */
    static cnsRegister(network: NetworkItem, contractHash: string, contractNameService: string, wif: string): Promise<void>;
    /**
     * Have the identity contract do a dynamic invoke to the CNS updating its scriptHash
     */
    static cnsUpdate(network: NetworkItem, contractHash: string, contractNameService: string, wif: string): Promise<void>;
    /**
     * Test whether an address is registered with CNS
     */
    static cnsIntegration(network: NetworkItem, contractHash: string, contractNameService: string, defaultContact: string, wif: string): Promise<void | boolean>;
    /**
     * return the contract version
     * @param network
     * @param contractHash
     * @returns {Promise<number>}
     */
    static contractVersion(network: NetworkItem, contractHash: string): Promise<number | null>;
    /**
     * Test whether `identityId` exists on-chain
     */
    static identityExists(network: NetworkItem, contractHash: string, identityId: string): Promise<boolean>;
    static keyExistsForIdentity(network: NetworkItem, contractHash: string, identityId: string, targetKey: string): Promise<boolean>;
    static addKeyToIdentity(network: NetworkItem, contractHash: string, identityId: string, targetKey: string, permissionLevel: any, wif: string): Promise<boolean>;
    static getKeyPermissionLevel(network: NetworkItem, contractHash: string, identityId: string, targetKey: string): Promise<number>;
    static setKeyPermissionLevel(network: NetworkItem, contractHash: string, identityId: string, targetKey: string, permissionLevel: any, wif: string): Promise<void>;
    static deleteKeyFromIdentity(network: NetworkItem, contractHash: string, identityId: string, targetKey: string, wif: string): Promise<void>;
    static deleteIdentity(network: NetworkItem, contractHash: string, identityId: string, adminKey: string, wif: string): Promise<void>;
    static createIdentity(network: NetworkItem, contractHash: string, identityLabel: string, wif: string, secondOwnerPublicKey?: string): Promise<any>;
    static createObject(network: NetworkItem, contractHash: string, objectId: string, identityId: string, object: string, wif: string): Promise<any>;
    static deleteObject(network: NetworkItem, contractHash: string, objectId: string, identityId: string, wif: string): Promise<any>;
    static grantObjectRole(network: NetworkItem, contractHash: string, objectId: string, identityId: string, permissionIdentity: string, role: string, wif: string): Promise<any>;
    static revokeObjectRole(network: NetworkItem, contractHash: string, objectId: string, identityId: string, permissionIdentity: string, role: string, wif: string): Promise<any>;
    static updateObject(network: NetworkItem, contractHash: string, objectId: string, identityId: string, object: string, wif: string): Promise<any>;
    static getObject(network: NetworkItem, contractHash: string, objectId: string): Promise<string | null>;
    static getObjectRoles(network: NetworkItem, contractHash: string, objectId: string, identityId: string): Promise<string | null>;
}
