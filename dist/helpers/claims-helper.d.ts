export declare class ClaimsHelper {
    static encryptionModeStrFromHex(value: string): string | undefined;
    static formatAttestation(attestation: any, issuer: any, sub: any): string;
    static hexLength(hexString: string): string;
    static hexStringWithLengthPrefix(hexValue: string): string;
    static intToHexWithLengthPrefix(value: number): string;
    static isInt(n: any): boolean;
    static isFloat(n: any): boolean;
    static stringToHexWithLengthPrefix(value: string): string;
}
