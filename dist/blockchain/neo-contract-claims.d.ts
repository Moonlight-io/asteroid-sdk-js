import { DoInvokeConfig } from '@cityofzion/neon-api/lib/funcs/types';
import { NetworkItem, ClaimInfo, ClaimTopicInfo, FormattedClaimInfo, ScriptHash, WIF } from '../interfaces';
export declare class NeoContractClaims {
    /**
     * Builds and creates a claim.
     * @param network  The Neo network target.
     * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     * @param rawClaim  The raw claim to be issued.
     * @param issuerWif  This issuer's WIF.
     */
    static buildAndCreateClaim(network: NetworkItem, claimsContractHash: ScriptHash, rawClaim: ClaimInfo, issuerWif: WIF): Promise<ClaimInfo>;
    /**
     * Builds a claim payload from a raw claim for submission.
     * @param rawClaim  The raw claim to be issued
     * @param issuerWif  The issuer's WIF
     */
    static buildClaim(rawClaim: ClaimInfo, issuerWif: WIF): FormattedClaimInfo;
    /**
     * Checks is the contract has been deployed.
     * @param network  The Neo network target.
     * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     */
    static deployed(network: NetworkItem, claimsContractHash: ScriptHash): Promise<boolean>;
    /**
     * Issues an on-chain claim against an identity.
     * @param network  The Neo network target.
     * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     * @param claimInfo the claim payload built by [[`buildClaim`]].
     * @param wif the claim issuer's WIF.
     */
    static createClaim(network: NetworkItem, claimsContractHash: ScriptHash, claimInfo: FormattedClaimInfo, wif: WIF): Promise<DoInvokeConfig>;
    /**
     * Creates a new claim topic
     * @param network  The Neo network target.
     * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     * @param claimTopic The name of the claim topic.
     * @param identifiers An array of the different fields within claims that are issued to against this topic.
     * @param wif  The claim topic creator.
     */
    static createClaimTopic(network: NetworkItem, claimsContractHash: ScriptHash, claimTopic: string, identifiers: string[], wif: WIF): Promise<DoInvokeConfig>;
    /**
     * Retrieves a claim by its claim id.
     * @param network  The Neo network target.
     * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     * @param claimID The claim id of the claim being requested.
     */
    static getClaimByClaimID(network: NetworkItem, claimsContractHash: ScriptHash, claimID: string): Promise<ClaimInfo | undefined>;
    /**
     * Gets a claim by its pointer.
     * @param network  The Neo network target.
     * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     * @param pointer The pointer to retrieve a claim from.
     */
    static getClaimByPointer(network: NetworkItem, claimsContractHash: ScriptHash, pointer: number): Promise<ClaimInfo | undefined>;
    /**
     * Checks if a claim exists.
     * @param network  The Neo network target.
     * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     * @param claimId The claim id to check the existance of.
     */
    static getClaimExists(network: NetworkItem, claimsContractHash: ScriptHash, claimId: string): Promise<boolean>;
    /**
     * Checks if the target claim has expired.
     * @param network  The Neo network target.
     * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     * @param claimId the claim id of the claim to check.
     */
    static getClaimHasExpired(network: NetworkItem, claimsContractHash: ScriptHash, claimId: string): Promise<boolean | undefined>;
    /**
     * Retrieves the issuer of a claim.
     * @param network  The Neo network target.
     * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     * @param claimId The claim id of the claim to target.
     */
    static getClaimIssuer(network: NetworkItem, claimsContractHash: ScriptHash, claimId: string): Promise<string | undefined>;
    /**
     * Retrieves the signature of a claim.
     * @param network  The Neo network target.
     * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     * @param claimId The claim id of the target claim.
     */
    static getClaimSignature(network: NetworkItem, claimsContractHash: ScriptHash, claimId: string): Promise<string | undefined>;
    /**
     * Retrieves the subject of a claim.
     * @param network  The Neo network target.
     * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     * @param claimId The target claim.
     */
    static getClaimSubject(network: NetworkItem, claimsContractHash: ScriptHash, claimId: string): Promise<string | undefined>;
    /**
     * Retrieves the topic of a claim
     * @param network  The Neo network target.
     * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     * @param claimId The target claim.
     */
    static getClaimTopic(network: NetworkItem, claimsContractHash: ScriptHash, claimId: string): Promise<string | undefined>;
    /**
     * Retrieves a claim topic definition by the claim topic.
     * @param network  The Neo network target.
     * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     * @param claimTopic The claim topic to retrieve.
     */
    static getClaimTopicByTopic(network: NetworkItem, claimsContractHash: ScriptHash, claimTopic: string): Promise<ClaimTopicInfo | undefined>;
    /**
     * Retrieves a claim topic by its pointer.
     * @param network  The Neo network target.
     * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     * @param pointer The pointer to retrieve.
     */
    static getClaimTopicByPointer(network: NetworkItem, claimsContractHash: ScriptHash, pointer: number): Promise<ClaimTopicInfo | undefined>;
    /**
     * Retrieves the claim topic write pointer.  This can be used with an iterator and [[`getClaimTopicByPointer`]] to grab all the claim topics.
     * @param network  The Neo network target.
     * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     */
    static getClaimTopicWritePointer(network: NetworkItem, claimsContractHash: ScriptHash): Promise<number | undefined>;
    /**
     * Retrieves the verification URI of a claim
     * @param network  The Neo network target.
     * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     * @param claimId  The claim id being targeted.
     */
    static getClaimVerificationURI(network: NetworkItem, claimsContractHash: ScriptHash, claimId: string): Promise<string | undefined>;
    /**
     * Retrieves the claim write pointer.  This can be used with [[`getClaimByPointer`]] to iterate over and retrieve all claims.
     * @param network  The Neo network target.
     * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     */
    static getClaimWritePointer(network: NetworkItem, claimsContractHash: ScriptHash): Promise<number | undefined>;
    /**
     * Gets the contract name
     * @param network  The Neo network target.
     * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     */
    static getContractName(network: NetworkItem, claimsContractHash: ScriptHash): Promise<string | undefined>;
    /**
     * Registers the contract with the contract name service
     * @param network  The Neo network target.
     * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     * @param cnsHash The contract name service script hash.
     * @param wif The issuer WIF.
     */
    static registerContractName(network: NetworkItem, claimsContractHash: ScriptHash, cnsHash: ScriptHash, wif: WIF): Promise<DoInvokeConfig>;
    /**
     * Updates the contract's hash in the contract name service
     * @param network  The Neo network target.
     * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     * @param cnsHash The contract name service script hash.
     * @param wif The issuer's WIF.
     */
    static updateContractAddress(network: NetworkItem, claimsContractHash: ScriptHash, cnsHash: ScriptHash, wif: WIF): Promise<DoInvokeConfig>;
}
