export declare class NeoContractIdentity {
    /**
     * gets the contract name
     * @param network
     * @param contractHash
     * @returns {Promise<any>}
     */
    static getContractName(network: any, contractHash: any): Promise<any>;
    /**
     * have the identity contract do a dynamic invoke to the CNS registering itself
     */
    static cnsRegister(network: any, contractHash: any, contractNameService: any, wif: any): Promise<void>;
    /**
     * Have the identity contract do a dynamic invoke to the CNS updating its scriptHash
     */
    static cnsUpdate(network: any, contractHash: any, contractNameService: any, wif: any): Promise<void>;
    /**
     * Test whether an address is registered with CNS
     */
    static cnsIntegration(network: any, contractHash: any, contractNameService: any, defaultContact: any, wif: any): Promise<void | boolean>;
    /**
     * return the contract version
     * @param network
     * @param contractHash
     * @returns {Promise<number>}
     */
    static contractVersion(network: any, contractHash: any): Promise<number | null>;
    /**
     * Test whether `identityId` exists on-chain
     */
    static identityExists(network: any, contractHash: any, identityId: any): Promise<boolean>;
    static keyExistsForIdentity(network: any, contractHash: any, identityId: any, targetKey: any): Promise<boolean>;
    static addKeyToIdentity(network: any, contractHash: any, identityId: any, targetKey: any, permissionLevel: any, wif: any): Promise<boolean>;
    static getKeyPermissionLevel(network: any, contractHash: any, identityId: any, targetKey: any): Promise<number>;
    static setKeyPermissionLevel(network: any, contractHash: any, identityId: any, targetKey: any, permissionLevel: any, wif: any): Promise<void>;
    static deleteKeyFromIdentity(network: any, contractHash: any, identityId: any, targetKey: any, wif: any): Promise<void>;
    static deleteIdentity(network: any, contractHash: any, identityId: any, adminKey: any, wif: any): Promise<void>;
    static createIdentity(network: any, contractHash: any, identityLabel: any, wif: any, secondOwnerPublicKey?: any): Promise<any>;
    static createObject(network: any, contractHash: any, objectId: any, identityId: any, object: any, wif: any): Promise<any>;
    static deleteObject(network: any, contractHash: any, objectId: any, identityId: any, wif: any): Promise<any>;
    static grantObjectRole(network: any, contractHash: any, objectId: any, identityId: any, permissionIdentity: any, role: any, wif: any): Promise<any>;
    static revokeObjectRole(network: any, contractHash: any, objectId: any, identityId: any, permissionIdentity: any, role: any, wif: any): Promise<any>;
    static updateObject(network: any, contractHash: any, objectId: any, identityId: any, object: any, wif: any): Promise<any>;
    static getObject(network: any, contractHash: any, objectId: any): Promise<any>;
    static getObjectRoles(network: any, contractHash: any, objectId: any, identityId: any): Promise<any>;
}
