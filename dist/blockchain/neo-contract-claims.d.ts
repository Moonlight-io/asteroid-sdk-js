export declare class NeoContractClaims {
    static buildAndCreateClaim(network: string, contractHash: string, rawClaim: any, issuerWif: any): Promise<any>;
    static buildClaim({ attestations, claimId, sub, claimTopic, expires, verificationUri }: any, issuerWif: string): any;
    /**
     * checks if the script is deployed
     * @param network
     * @param contractHash
     * @returns {Promise<any>}
     */
    static deployed(network: any, contractHash: any): Promise<any>;
    /**
     * invokes the createClaim method to publish a new claim on the blockchain
     * @param network
     * @param contractHash
     * @param formatted_claim
     * @param wif
     * @returns {Promise<any>}
     */
    static createClaim(network: any, contractHash: any, { attestations, signed_by, signature, claim_id, sub, claim_topic, expires, verification_uri }: any, wif: any): Promise<any>;
    /**
     * checks if a claim exists on the platform using claim_id
     * @param network
     * @param contractHash
     * @param claimId
     * @returns {Promise<any>}
     */
    static getClaimExists(network: any, contractHash: any, claimId: any): Promise<any>;
    /**
     * checks if the target claim is expired
     * @param network
     * @param contractHash
     * @param claimId
     * @returns {Promise<any>}
     */
    static getClaimHasExpired(network: any, contractHash: any, claimId: any): Promise<any>;
    /**
     * gets the claim issuer
     * @param network
     * @param contractHash
     * @param claimId
     * @returns {Promise<any>}
     */
    static getClaimIssuer(network: any, contractHash: any, claimId: any): Promise<any>;
    /**
     * gets the target claim's signature
     * @param network
     * @param contractHash
     * @param claimId
     * @returns {Promise<any>}
     */
    static getClaimSignature(network: any, contractHash: any, claimId: any): Promise<any>;
    /**
     * gets the claim subject
     * @param network
     * @param contractHash
     * @param claimId
     * @returns {Promise<any>}
     */
    static getClaimSubject(network: any, contractHash: any, claimId: any): Promise<any>;
    /**
     * gets the claim topic
     * @param network
     * @param contractHash
     * @param claimId
     * @returns {Promise<any>}
     */
    static getClaimTopic(network: any, contractHash: any, claimId: any): Promise<any>;
    /**
     * gets the verificationURI field of the claim
     * @param network
     * @param contractHash
     * @param claimId
     * @returns {Promise<any>}
     */
    static getClaimVerificationURI(network: any, contractHash: any, claimId: any): Promise<any>;
    /**
     * gets the contract name
     * @param network
     * @param contractHash
     * @returns {Promise<any>}
     */
    static getContractName(network: any, contractHash: any): Promise<any>;
    /**
     * registers the contract against the neo contract name service
     * @param network
     * @param contractHash
     * @param cnsHash
     * @param wif
     * @returns {Promise<any>}
     */
    static registerContractName(network: any, contractHash: any, cnsHash: any, wif: any): Promise<any>;
    /**
     * updates the contract's address on neo contract name service
     * @param network
     * @param contractHash
     * @param cnsHash
     * @param wif
     * @returns {Promise<any>}
     */
    static updateContractAddress(network: any, contractHash: any, cnsHash: any, wif: any): Promise<any>;
    static attestationEncryptionMethod(network: any, contractHash: any, claimId: any, attestationIdentifier: any): Promise<any>;
    /**
     * checks if an attestation identifier exists on a claim
     * @param network
     * @param contractHash
     * @param claimId
     * @param attestationIdentifier
     * @returns {Promise<any>}
     */
    static attestationIdentifierExists(network: any, contractHash: any, claimId: any, attestationIdentifier: any): Promise<any>;
    /**
     * retrieves an attestation remark from a claim
     * @param network
     * @param contractHash
     * @param claimId
     * @param attestationIdentifier
     * @returns {Promise<any>}
     */
    static attestationIdentifierRemark(network: any, contractHash: any, claimId: any, attestationIdentifier: any): Promise<any>;
    /**
     * retrieves an attestation's value from a claim
     * @param network
     * @param contractHash
     * @param claimId
     * @param attestationIdentifier
     * @returns {Promise<any>}
     */
    static attestationIdentifierValue(network: any, contractHash: any, claimId: any, attestationIdentifier: any): Promise<any>;
}
