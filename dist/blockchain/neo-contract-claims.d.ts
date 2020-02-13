import { NetworkItem } from '../interfaces';
export declare class NeoContractClaims {
    static buildAndCreateClaim(network: NetworkItem, contractHash: string, rawClaim: any, issuerWif: string): Promise<any>;
    static buildClaim({ attestations, claim_id, sub, claim_topic, expires, verification_uri }: any, issuerWif: string): any;
    /**
     * checks if the script is deployed
     * @param network
     * @param contractHash
     * @returns {Promise<any>}
     */
    static deployed(network: NetworkItem, contractHash: string): Promise<boolean>;
    /**
     * invokes the createClaim method to publish a new claim on the blockchain
     * @param network
     * @param contractHash
     * @param formatted_claim
     * @param wif
     * @returns {Promise<any>}
     */
    static createClaim(network: NetworkItem, contractHash: string, { attestations, signed_by, signature, claim_id, sub, claim_topic, expires, verification_uri }: any, wif: string): Promise<any>;
    /**
     * checks if a claim exists on the platform using claim_id
     * @param network
     * @param contractHash
     * @param claimId
     * @returns {Promise<any>}
     */
    static getClaimExists(network: NetworkItem, contractHash: string, claimId: string): Promise<boolean>;
    /**
     * checks if the target claim is expired
     * @param network
     * @param contractHash
     * @param claimId
     */
    static getClaimHasExpired(network: NetworkItem, contractHash: string, claimId: string): Promise<boolean | null>;
    /**
     * gets the claim issuer
     * @param network
     * @param contractHash
     * @param claimId
     * @returns {Promise<any>}
     */
    static getClaimIssuer(network: NetworkItem, contractHash: string, claimId: string): Promise<string | null>;
    /**
     * gets the target claim's signature
     * @param network
     * @param contractHash
     * @param claimId
     * @returns {Promise<any>}
     */
    static getClaimSignature(network: NetworkItem, contractHash: string, claimId: string): Promise<string | null>;
    /**
     * gets the claim subject
     * @param network
     * @param contractHash
     * @param claimId
     * @returns {Promise<any>}
     */
    static getClaimSubject(network: NetworkItem, contractHash: string, claimId: string): Promise<string | null>;
    /**
     * gets the claim topic
     * @param network
     * @param contractHash
     * @param claimId
     * @returns {Promise<any>}
     */
    static getClaimTopic(network: NetworkItem, contractHash: string, claimId: string): Promise<string | null>;
    /**
     * gets the verificationURI field of the claim
     * @param network
     * @param contractHash
     * @param claimId
     * @returns {Promise<any>}
     */
    static getClaimVerificationURI(network: NetworkItem, contractHash: string, claimId: string): Promise<string | null>;
    /**
     * gets the contract name
     * @param network
     * @param contractHash
     * @returns {Promise<any>}
     */
    static getContractName(network: NetworkItem, contractHash: string): Promise<string | null>;
    /**
     * registers the contract against the neo contract name service
     * @param network
     * @param contractHash
     * @param cnsHash
     * @param wif
     * @returns {Promise<any>}
     */
    static registerContractName(network: NetworkItem, contractHash: string, cnsHash: string, wif: string): Promise<any>;
    /**
     * updates the contract's address on neo contract name service
     * @param network
     * @param contractHash
     * @param cnsHash
     * @param wif
     * @returns {Promise<any>}
     */
    static updateContractAddress(network: NetworkItem, contractHash: string, cnsHash: string, wif: string): Promise<any>;
    static attestationEncryptionMethod(network: NetworkItem, contractHash: string, claimId: string, attestationIdentifier: string): Promise<string | null | undefined>;
    /**
     * checks if an attestation identifier exists on a claim
     * @param network
     * @param contractHash
     * @param claimId
     * @param attestationIdentifier
     * @returns {Promise<any>}
     */
    static attestationIdentifierExists(network: NetworkItem, contractHash: string, claimId: string, attestationIdentifier: string): Promise<boolean | null>;
    /**
     * retrieves an attestation remark from a claim
     * @param network
     * @param contractHash
     * @param claimId
     * @param attestationIdentifier
     * @returns {Promise<any>}
     */
    static attestationIdentifierRemark(network: NetworkItem, contractHash: string, claimId: string, attestationIdentifier: string): Promise<string | null>;
    /**
     * retrieves an attestation's value from a claim
     * @param network
     * @param contractHash
     * @param claimId
     * @param attestationIdentifier
     * @returns {Promise<any>}
     */
    static attestationIdentifierValue(network: NetworkItem, contractHash: string, claimId: string, attestationIdentifier: string): Promise<string | null>;
}
