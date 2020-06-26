/// <reference types="node" />
import { KeychainKey, NetworkItem, RootKeyItem } from '../interfaces';
export declare class NeoContractIdentity {
    /**
     * creates a new root key for the user.  This can be used to issue group and delegated access rights without giving away
     * identity ownership.
     * @param network - the network
     * @param contractHash - the contract hash to invoke
     * @param wif - the wif of the user
     */
    static createRootKey(network: NetworkItem, contractHash: string, wif: string): Promise<void>;
    /**
     * attempts to get the root key pair for an identity
     */
    static getRootKeyByIdentity(network: NetworkItem, contractHash: string, sub: string): Promise<RootKeyItem | null>;
    /**
     * attempts to get a root key pair using a pointer
     */
    static getRootKeyByPointer(network: NetworkItem, contractHash: string, pointer: number): Promise<RootKeyItem | null>;
    /**
     * gets the write head for root keys
     */
    static getRootKeyWritePointer(network: NetworkItem, contractHash: string): Promise<number | null>;
    /**
     * Test whether `sub` exists on-chain and has a root key
     */
    static getIdentityExists(network: NetworkItem, contractHash: string, sub: string): Promise<boolean>;
    /**
     * issues a new key to an identity's keychain
     */
    static issueKey(network: NetworkItem, contractHash: string, holder: string, owner: string, sub: string, type: string, payload: Buffer, encryption: string, wif: string): Promise<void>;
    /**
     * attempts to remove a key from an identity's keychain
     */
    static revokeKeyByPointer(network: NetworkItem, contractHash: string, pointer: number, wif: string): Promise<void>;
    /**
     * gets the key at a specific write pointer
     */
    static getKeyByPointer(network: NetworkItem, contractHash: string, pointer: number): Promise<KeychainKey | undefined>;
    /**
     * gets the write pointer for the keychain
     */
    static getKeychainWritePointer(network: NetworkItem, contractHash: string): Promise<number | undefined>;
    /**
     * gets the key pointers for the holder
     */
    static getKeyByHolder(network: NetworkItem, contractHash: string, holder: string, pointer: number): Promise<KeychainKey | undefined>;
    /**
     * gets the key pointers for the owner
     */
    /**
     * gets the key pointers for the issuer
     */
    static getKeyByIssuer(network: NetworkItem, contractHash: string, issuer: string, pointer: number): Promise<KeychainKey | undefined>;
    /**
     * gets the key pointers for the holder with a specific subject
     */
    static getKeyByHolderSub(network: NetworkItem, contractHash: string, holder: string, sub: string, pointer: number): Promise<KeychainKey | undefined>;
    /**
     * gets the complete set of active keys for a holder and keysub
     */
    static getTargetKeys(network: NetworkItem, contractHash: string, holder: string, keySub: string): Promise<KeychainKey[]>;
}
