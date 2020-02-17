/// <reference types="node" />
export declare class ClaimsHelper {
    static aes256CbcEncrypt(iv: Buffer, key: Buffer, plaintext: Buffer): Buffer;
    static aes256CbcDecrypt(iv: Buffer, key: Buffer, ciphertext: Buffer): Buffer;
    /**
     * decrypts an ECIES encryption payload
     * @param privateKey - the private key of the recipient
     * @param payload - the ECIES payload
     */
    static decryptECIES(privateKey: string, payload: any): Buffer;
    /**
     * formats an attestation using hybrid(PGP-like) encryption
     * @param attestation
     * @returns {string}
     */
    static encryptionHybrid(attestation: any): string;
    /**
     * formats an unencrypted attestation value
     * @param {Object} attestation
     * @returns {Object}
     */
    static encryptionUnencrypted(attestation: any): string;
    /**
     * formats an attestation using zkpp
     * @param attestation
     * @returns {string}
     */
    static encryptionZKPP(attestation: any): string;
    /**
     * formats an attestation value using symmentric encryption
     * @param attestation
     * @returns {string}
     */
    static encryptionSymmetric(attestation: any): string;
    /**
     * formats an attestation value signed by the claim issuer
     * @param {Object} attestation
     * @param {wallet.account} account
     * @returns {Object}
     */
    static encryptionAsymmetric(attestation: any, account: any): string;
    /**
     * encrypts a buffer using ECIES and returns a payload containing the message and signature.
     * @param publicKey - the public key of the recipient
     * @param payload - the payload buffer to encrypt
     * @param opts - optional parameters which will default if not configured
     */
    static encryptECIES(publicKey: string, payload: Buffer, opts?: any): object;
    static formatAttestation(attestation: any, issuer: any, sub: any): any;
    static hexLength(hexString: string): any;
    static hexStringWithLengthPrefix(hexValue: string): string;
    static encryptionModeStrFromHex(value: string): any;
    static intToHexWithLengthPrefix(value: any): string;
    static isInt(n: any): any;
    static isFloat(n: any): any;
    static stringToHexWithLengthPrefix(value: string): string;
}
