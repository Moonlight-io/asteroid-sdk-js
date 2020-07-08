import { NetworkItem, PublicKey, ScriptHash, WIF } from '../interfaces';
export declare class NeoContractNameService {
    /**
     * Resolves a domain and subDomain to an on chain entity.
     * @param network  The Neo network target.
     * @param neoCNSScriptHash  The neoCNS script hash. This is relatively static and is published (Here).
     * @param domain  The root domain to target (i.e "moonlight").
     * @param subDomain  The subDomain to target (i.e "claims").
     */
    static getAddress(network: NetworkItem, neoCNSScriptHash: ScriptHash, domain: string, subDomain: string): Promise<string | undefined>;
    /**
     * Registers a new root level domain for use in the contract.
     * @param network  The Neo network target.
     * @param neoCNSScriptHash  The neoCNS script hash. This is relatively static and is published (Here).
     * @param domain  The requested root domain.
     * @param wif  The owner's wif.
     */
    static registerDomain(network: NetworkItem, neoCNSScriptHash: ScriptHash, domain: string, wif: WIF): Promise<any>;
    /**
     * Transfers a domain to a new owner
     * @param network  The Neo network target.
     * @param neoCNSScriptHash  The neoCNS script hash. This is relatively static and is published (Here)
     * @param domain  The domain being transfered.
     * @param target  The target public key.
     * @param wif  The wif of the owner.
     */
    static transferDomain(network: NetworkItem, neoCNSScriptHash: ScriptHash, domain: string, target: PublicKey, wif: WIF): Promise<any>;
    /**
     * Updates the domain registery
     * @param network  The Neo network target.
     * @param neoCNSScriptHash  The neoCNS script hash. This is relatively static and is published (Here).
     * @param domain  The root level domain to update.
     * @param subDomain  The subdomain to modify.
     * @param address  The new target. This can be a literal address or a script hash.
     * @param wif  The wif of the domain owner.
     */
    static upsertSubDomain(network: NetworkItem, neoCNSScriptHash: ScriptHash, domain: string, subDomain: string, address: string, wif: WIF): Promise<any>;
}
