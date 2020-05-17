/// <reference types="node" />
import { KeychainKey, NetworkItem } from '../interfaces';
export declare class NeoContractIdentity {
    /**
     * creates a new root key for the user.  This can be used to issue group and delegated access rights without giving away
     * identity ownership.
     * @param network - the network
     * @param contractHash - the contract hash to invoke
     * @param wif - the wif of the user
     */
    static createRootKey(network: NetworkItem, contractHash: string, wif: string): Promise<any>;
    /**
     * attempts to get the root key pair for an identity
     * @param network
     * @param contractHash
     * @param sub
     */
    static getRootKeyByIdentity(network: NetworkItem, contractHash: string, sub: string): Promise<any>;
    /**
     * attempts to get a root key pair using a pointer
     * @param network
     * @param contractHash
     * @param pointer
     */
    static getRootKeyByPointer(network: NetworkItem, contractHash: string, pointer: number): Promise<any>;
    /**
     * gets the write head for root keys
     * @param network
     * @param contractHash
     */
    static getRootKeyWritePointer(network: NetworkItem, contractHash: string): Promise<any>;
    /**
     * Test whether `sub` exists on-chain and has a root key
     */
    static getIdentityExists(network: NetworkItem, contractHash: string, sub: string): Promise<boolean>;
    /**
     * issues a new key to an identity's keychain
     * @param network
     * @param contractHash
     * @param holder
     * @param owner
     * @param sub
     * @param type
     * @param payload
     * @param encryption
     * @param wif
     */
    static issueKey(network: NetworkItem, contractHash: string, holder: string, owner: string, sub: string, type: string, payload: Buffer, encryption: string, wif: string): Promise<any>;
    /**
     * attempts to remove a key from an identity's keychain
     * @param network
     * @param contractHash
     * @param pointer
     * @param wif
     */
    static revokeKeyByPointer(network: NetworkItem, contractHash: string, pointer: number, wif: string): Promise<any>;
    /**
     * gets the key at a specific write pointer
     * @param network
     * @param contractHash
     * @param pointer
     */
    static getKeyByPointer(network: NetworkItem, contractHash: string, pointer: number): Promise<KeychainKey | undefined>;
    /**
     * gets the write pointer for the keychain
     * @param network
     * @param contractHash
     */
    static getKeychainWritePointer(network: NetworkItem, contractHash: string): Promise<number | undefined>;
    /**
     * gets the key pointers for the holder
     * @param network
     * @param contractHash
     * @param holder
     * @param pointer
     */
    static getKeyByHolder(network: NetworkItem, contractHash: string, holder: string, pointer: number): Promise<KeychainKey | undefined>;
    /**
     * gets the key pointers for the owner
     * @param network
     * @param contractHash
     * @param owner
     * @param pointer
     */
    /**
     * gets the key pointers for the issuer
     * @param network
     * @param contractHash
     * @param issuer
     * @param pointer
     */
    static getKeyByIssuer(network: NetworkItem, contractHash: string, issuer: string, pointer: number): Promise<KeychainKey | undefined>;
    /**
     * gets the key pointers for the holder with a specific subject
     * @param network
     * @param contractHash
     * @param holder
     * @param sub
     * @param pointer
     */
    static getKeyByHolderSub(network: NetworkItem, contractHash: string, holder: string, sub: string, pointer: number): Promise<KeychainKey | undefined>;
    /**
     * gets the complete set of active keys for a holder and keysub
     * @param network
     * @param contractHash
     * @param holder
     * @param keySub
     */
    static getTargetKeys(network: NetworkItem, contractHash: string, holder: string, keySub: string): Promise<KeychainKey[]>;
}
