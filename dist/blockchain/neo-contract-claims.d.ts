import { NetworkItem, ClaimInfo, ClaimTopicInfo, FormattedClaimInfo } from '../interfaces';
export declare class NeoContractClaims {
    static buildAndCreateClaim(network: NetworkItem, contractHash: string, rawClaim: ClaimInfo, issuerWif: string): Promise<ClaimInfo>;
    static buildClaim(claimInfo: ClaimInfo, issuerWif: string): FormattedClaimInfo;
    /**
     * checks if the script is deployed
     */
    static deployed(network: NetworkItem, contractHash: string): Promise<boolean>;
    /**
     * invokes the createClaim method to publish a new claim on the blockchain
     */
    static createClaim(network: NetworkItem, contractHash: string, claimInfo: FormattedClaimInfo, wif: string): Promise<any>;
    static createClaimTopic(network: NetworkItem, contractHash: string, claimTopic: string, identifiers: string[], wif: string): Promise<any>;
    static getClaimByClaimID(network: NetworkItem, contractHash: string, claimID: string): Promise<ClaimInfo | undefined>;
    static getClaimByPointer(network: NetworkItem, contractHash: string, pointer: number): Promise<ClaimInfo | undefined>;
    /**
     * checks if a claim exists on the platform using claim_id
     */
    static getClaimExists(network: NetworkItem, contractHash: string, claimId: string): Promise<boolean>;
    /**
     * checks if the target claim is expired
     */
    static getClaimHasExpired(network: NetworkItem, contractHash: string, claimId: string): Promise<boolean | undefined>;
    /**
     * gets the claim issuer
     */
    static getClaimIssuer(network: NetworkItem, contractHash: string, claimId: string): Promise<string | undefined>;
    /**
     * gets the target claim's signature
     */
    static getClaimSignature(network: NetworkItem, contractHash: string, claimId: string): Promise<string | undefined>;
    /**
     * gets the claim subject
     */
    static getClaimSubject(network: NetworkItem, contractHash: string, claimId: string): Promise<string | undefined>;
    /**
     * gets the claim topic
     */
    static getClaimTopic(network: NetworkItem, contractHash: string, claimId: string): Promise<string | undefined>;
    static getClaimTopicByTopic(network: NetworkItem, contractHash: string, claimTopic: string): Promise<ClaimTopicInfo | undefined>;
    static getClaimTopicByPointer(network: NetworkItem, contractHash: string, pointer: number): Promise<ClaimTopicInfo | undefined>;
    static getClaimTopicWritePointer(network: NetworkItem, contractHash: string): Promise<number | undefined>;
    /**
     * gets the verificationURI field of the claim
     */
    static getClaimVerificationURI(network: NetworkItem, contractHash: string, claimId: string): Promise<string | undefined>;
    static getClaimWritePointer(network: NetworkItem, contractHash: string): Promise<number | undefined>;
    /**
     * gets the contract name
     */
    static getContractName(network: NetworkItem, contractHash: string): Promise<string | undefined>;
    /**
     * registers the contract against the neo contract name service
     */
    static registerContractName(network: NetworkItem, contractHash: string, cnsHash: string, wif: string): Promise<any>;
    /**
     * updates the contract's address on neo contract name service
     */
    static updateContractAddress(network: NetworkItem, contractHash: string, cnsHash: string, wif: string): Promise<any>;
}
