import { ClaimInfo, NetworkItem } from '../interfaces';
export declare class NeoVivid {
    static getDecryptedClaimByClaimID(network: NetworkItem, neoCNSScriptHash: string, claimId: string, wif: string): Promise<ClaimInfo>;
    static getFormattedClaimByClaimID(network: NetworkItem, claimsScriptHash: string, claimId: string): Promise<ClaimInfo>;
}
