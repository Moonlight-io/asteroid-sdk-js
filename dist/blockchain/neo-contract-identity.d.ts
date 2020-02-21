/// <reference types="node" />
import { NetworkItem } from '../interfaces';
export declare class NeoContractIdentity {
    /**
     * creates a new identity for the user
     * @param network - the network
     * @param contractHash - the contract hash to invoke
     * @param wif - the wif of the user
     */
    static createIdentity(network: NetworkItem, contractHash: string, wif: string): Promise<any>;
    /**
     * gets the key at a specific write pointer
     * @param network
     * @param contractHash
     * @param identityId
     * @param writePointer
     */
    static getKey(network: any, contractHash: string, identityId: string, writePointer: number): Promise<any>;
    /**
     * gets the write pointer for the keychain
     * @param network
     * @param contractHash
     * @param identityId
     */
    static getKeychainHeight(network: any, contractHash: string, identityId: string): Promise<number | null>;
    /**
     * gets the contract name
     * @param network
     * @param contractHash
     * @returns {Promise<number|null>}
     */
    static getContractName(network: NetworkItem, contractHash: string): Promise<any>;
    /**
     * return the contract version
     * @param network
     * @param contractHash
     * @returns {Promise<number>}
     */
    static getContractVersion(network: NetworkItem, contractHash: string): Promise<number | null>;
    /**
     * Test whether `identityId` exists on-chain
     */
    static getIdentityExists(network: NetworkItem, contractHash: string, identityId: string): Promise<boolean>;
    /**
     * attempts to get the root public key for an identity
     * @param network
     * @param contractHash
     * @param identityId
     */
    static getRootPubKey(network: any, contractHash: string, identityId: string): Promise<any>;
    /**
     * attempts to get the encrypted root private key for an identity
     * @param network
     * @param contractHash
     * @param identityId
     */
    static getRootPrivKey(network: any, contractHash: string, identityId: string): Promise<any>;
    /**
     * issues a new key to an identity's keychain
     * @param network
     * @param contractHash
     * @param identityId
     * @param owner
     * @param sub
     * @param type
     * @param payload
     * @param encryption
     * @param wif
     */
    static issueKey(network: any, contractHash: string, identityId: string, owner: string, sub: string, type: string, payload: Buffer, encryption: string, wif: string): Promise<any>;
    /**
     * attempts to remove a key from an identity's keychain
     * @param network
     * @param contractHash
     * @param identityId
     * @param writePointer
     * @param wif
     */
    static revokeKey(network: any, contractHash: string, identityId: string, writePointer: number, wif: string): Promise<any>;
    /**
     * attempts to resolve a key from an identity's keychain
     * @param network
     * @param contractHash
     * @param identityId
     * @param sub
     * @param type
     */
    static getKeyBySubAndType(network: any, contractHash: string, identityId: string, sub: string, type: string): Promise<any>;
}
