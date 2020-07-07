import { Account } from '@cityofzion/neon-core/lib/wallet';
import { ClaimAttestationItem, SecureAttestation } from '../interfaces';
export declare class ClaimsHelper {
    static encryptionModeStrFromHex(value: string): string | undefined;
    static formatAttestation(attestation: ClaimAttestationItem, issuer: Account, sub: Account): SecureAttestation;
    /**
     * formats an value to a hex string
     */
    static fieldToHexString(value: boolean | number | string, includePrefix: boolean): string;
    static hexLength(hexString: string): string;
    static hexStringWithLengthPrefix(hexValue: string): string;
    static intToHexWithLengthPrefix(value: number): string;
    static isInt(n: any): boolean;
    static isFloat(n: any): boolean;
    static stringToHexWithLengthPrefix(value: string): string;
}
