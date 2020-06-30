import { ClaimInfo, NetworkItem, ScriptHash, WIF } from '../interfaces';
export declare class NeoVivid {
    /**
     * Gets a claim by its claim_id and attempts to access and resolve all of its attestations.  Resolutions are returned
     * as `decrypted_value` on each attestation object.
     * @param network  The Neo network target.
     * @param neoCNSScriptHash  The neoCNS script hash. This is relatively static and is published (Here)
     * @param claimId  The target claim id.
     * @param wif  The wif of the identity attempting to resolve the claim.
     *
     * **Example:**
     * ```
     * const neoCNS = "b434339f25b6f1bec68e99f620dfbf3ec27dacdc"
     * const wif = "KxDgvEKzgSBPPfuVfw67oPQBSjidEiqTHURKSDL1R7yGaGYAeYnr"
     * const network = {
     *   name: "network",
     *   extra: {
     *     neoscan: "https://p1.neo.blockchain.moonlight.io:4001/api/main_net",
     *     rpcServer: "https://p1.neo.blockchain.moonlight.io:60333"
     *   }
     * }
     *
     * claim = await sdk.NeoVivid.getDecryptedClaimByClaimID(
     *    network,
     *    neoCNS,
     *    "NLBnCtGcA6Gx4NJ8",
     *    wif
     * )
     * ```
     */
    static getDecryptedClaimByClaimID(network: NetworkItem, neoCNSScriptHash: ScriptHash, claimId: string, wif: WIF): Promise<ClaimInfo>;
    /**
     * This method will mux a claim id and its topic to return a pretty claim.
     * @param network  The Neo network target.
     * @param claimsScriptHash  The script hash of the claims contract.
     * @param claimId  The claim id being requested.
     */
    static getFormattedClaimByClaimID(network: NetworkItem, claimsScriptHash: ScriptHash, claimId: string): Promise<ClaimInfo>;
}
