/// <reference types="node" />
import { EncryptionMethod, Identity, KeychainKey, NetworkItem, RootKeyItem, ScriptHash, WIF } from '../interfaces';
export declare class NeoContractIdentity {
    /**
     * creates a new root key for the user.  This can be used to issue group and delegated access rights without giving away
     * identity ownership.
     * @param network  The Neo network target.
     * @param identityContractHash  The identity script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     * @param wif  the wif of the identity.
     */
    static createRootKey(network: NetworkItem, identityContractHash: ScriptHash, wif: WIF): Promise<void>;
    /**
     * Resolves the root key pair of an identity.
     * @param network  The Neo network target.
     * @param identityContractHash  The identity script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     * @param sub  The identity to retrieve the root key from.
     */
    static getRootKeyByIdentity(network: NetworkItem, identityContractHash: ScriptHash, sub: Identity): Promise<RootKeyItem | undefined>;
    /**
     * Resolves the root key of an identity using a pointer.
     * @param network  The Neo network target.
     * @param identityContractHash  The identity script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     * @param pointer  A pointer to the identity requested.
     */
    static getRootKeyByPointer(network: NetworkItem, identityContractHash: ScriptHash, pointer: number): Promise<RootKeyItem | undefined>;
    /**
     * Gets the Write Pointer of the root keys.  This can be used when building an iterator in conjunction with [[`getRootKeyByPointer`]].
     * @param network  The Neo network target.
     * @param identityContractHash  The identity script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     */
    static getRootKeyWritePointer(network: NetworkItem, identityContractHash: ScriptHash): Promise<number | undefined>;
    /**
     * Checks if the identity exists in the system.  Technically, this is checking whether a root key-pair exists.
     * @param network  The Neo network target.
     * @param identityContractHash  The identity script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     * @param sub The identity in question.
     */
    static getIdentityExists(network: NetworkItem, identityContractHash: ScriptHash, sub: Identity): Promise<boolean>;
    /**
     * Issues a new key to an identity's keychain.
     * @param network  The Neo network target.
     * @param identityContractHash  The identity script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     * @param holder The identity which the key will be issued to.  When using a security method, this user's information will be used to secure the payload.
     * @param owner  The owner of the key.  This user has the ability to operate on the key using methods to edit and delete it.
     * @param sub  The subject of the key.  For example, `claim_id:0` maybe refer to the first attestation in a claim.
     * @param type  The type of the key.  This is primarily used for query efficiency and grouping. It is free form.  For Vivid, we use `proof` to indicate a key against an attestation.
     * @param payload  The unsecured payload which will be secured and issued to the holder.
     * @param encryption  The encryption regime to use.
     * @param wif  The key issuer's WIF.
     */
    static issueKey(network: NetworkItem, identityContractHash: ScriptHash, holder: Identity, owner: Identity, sub: Identity, type: string, payload: Buffer, encryption: EncryptionMethod, wif: WIF): Promise<void>;
    /**
     * Revokes an owned key using the key's pointer
     * @param network  The Neo network target.
     * @param identityContractHash  The identity script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     * @param pointer  The pointer to the key being revoked.
     * @param wif  The wif of the key owner.
     */
    static revokeKeyByPointer(network: NetworkItem, identityContractHash: ScriptHash, pointer: number, wif: WIF): Promise<void>;
    /**
     * Retrieves a key using its pointer.
     * @param network  The Neo network target.
     * @param identityContractHash  The identity script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     * @param pointer  The pointer to the key.
     */
    static getKeyByPointer(network: NetworkItem, identityContractHash: ScriptHash, pointer: number): Promise<KeychainKey | undefined>;
    /**
     * Gets the write pointer for the keychain.  This can be used to globally iterate on keys using [[`getKeyByPointer`]]
     * @param network  The Neo network target.
     * @param identityContractHash  The identity script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     */
    static getKeychainWritePointer(network: NetworkItem, identityContractHash: ScriptHash): Promise<number | undefined>;
    /**
     * Gets a key by its holder using a symbolic pointer.  This can be used to iterate over every key on a holder's keychain.
     * @param network  The Neo network target.
     * @param identityContractHash  The identity script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     * @param holder  The holder's identity.
     * @param pointer A symbollic pointer that starts at 0.
     */
    static getKeyByHolder(network: NetworkItem, identityContractHash: ScriptHash, holder: Identity, pointer: number): Promise<KeychainKey | undefined>;
    /**
     * gets the key pointers for the owner
     */
    /**
     * Gets a key by its issuer using a symbolic pointer. This can be used to iterate over every active key issued by an identity.
     * @param network  The Neo network target.
     * @param identityContractHash  The identity script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     * @param issuer The key issuer.
     * @param pointer  The symbolic pointer.
     */
    static getKeyByIssuer(network: NetworkItem, identityContractHash: ScriptHash, issuer: Identity, pointer: number): Promise<KeychainKey | undefined>;
    /**
     * Gets a key by its holder and subject using a symbolic pointer. This can be used to iterate over every active keys issued to a holder for a subject.
     * @param network  The Neo network target.
     * @param identityContractHash  The identity script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     * @param holder The key holder.
     * @param sub The key's subject.
     * @param pointer  The symbolic pointer.
     */
    static getKeyByHolderSub(network: NetworkItem, identityContractHash: ScriptHash, holder: Identity, sub: Identity, pointer: number): Promise<KeychainKey | undefined>;
    /**
     * Used to get every key issued to an identity with a specific subject.
     * @param network  The Neo network target.
     * @param identityContractHash  The identity script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     * @param holder  The holder identity of the keys being requested.
     * @param keySub  The subject of the key.
     */
    static getTargetKeys(network: NetworkItem, identityContractHash: ScriptHash, holder: Identity, keySub: string): Promise<KeychainKey[]>;
}
