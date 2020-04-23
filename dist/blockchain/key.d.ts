/// <reference types="node" />
/**
 * A blockchain keykeychain for elliptic curve-based platforms
 * implements: BIP32, BIP39, BIP44
 */
export declare class Key {
    mnemonic: Buffer;
    seed: Buffer;
    secret: string;
    constructor();
    /**
     * gernates a new child key for a chain along a derivation vector
     * @param platform
     * @param derivationPath (example:
     */
    generateChildKey(platform: string, derivationPath: string): any;
    /**
     * generates a bip39 mnemonic for the key
     * @param strength
     */
    generateMnemonic(strength?: number): Buffer;
    /**
     * generates a bip39 compliant seed
     * @param secret
     */
    generateSeed(secret?: string): Buffer;
    /**
     * imports a mnemonic into the key
     * @param mnemonic
     */
    importMnemonic(mnemonic: string): void;
    /**
     * generates a new child key along a childIdx
     * @param platform
     * @param parentKey
     * @param childIdx
     */
    private newChildKey;
    /**
     * generates a bip32 compliant master key
     * @param platform
     */
    private generateMasterKey;
}
