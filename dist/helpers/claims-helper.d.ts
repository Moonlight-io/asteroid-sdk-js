export declare class ClaimsHelper {
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
    static formatAttestation(attestation: any, issuer: any, sub: any): string;
    static hexLength(hexString: string): string;
    static hexStringWithLengthPrefix(hexValue: string): string;
    static encryptionModeStrFromHex(value: string): string | undefined;
    static intToHexWithLengthPrefix(value: number): string;
    static isInt(n: any): boolean;
    static isFloat(n: any): boolean;
    static stringToHexWithLengthPrefix(value: string): string;
}
