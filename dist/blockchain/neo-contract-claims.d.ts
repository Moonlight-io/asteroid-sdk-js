export declare class NeoContractClaims {
    static buildClaim(claim_id: string, attestations: any, expires: number, verification_uri: string, wif: string, verbose?: boolean): any;
    /**
     * checks if the script is deployed
     * @param network
     * @param contractHash
     * @returns {Promise<any>}
     */
    static deployed(network: any, contractHash: any): Promise<any>;
    /**
     * checks if a claim exists on the platform using claim_id
     * @param network
     * @param contractHash
     * @param claimId
     * @returns {Promise<any>}
     */
    static claimExists(network: any, contractHash: any, claimId: any): Promise<any>;
    /**
     * checks if the target claim is expired
     * @param network
     * @param contractHash
     * @param claimId
     * @returns {Promise<any>}
     */
    static claimHasExpired(network: any, contractHash: any, claimId: any): Promise<any>;
    /**
     * creates a new claim on the platform
     * @param network
     * @param contractHash
     * @param attestations
     * @param signedBy
     * @param signature
     * @param claimID
     * @param expires
     * @param verificationURI
     * @param wif
     * @returns {Promise<any>}
     */
    static createClaim(network: any, contractHash: any, attestations: any, signed_by: any, signature: any, claim_id: any, expires: any, verification_uri: any, wif: any): Promise<any>;
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
    static getClaimSignature(network: any, contractHash: any, claim_id: any): Promise<any>;
    /**
     * gets the verificationURI field of the claim
     * @param network
     * @param contractHash
     * @param claimId
     * @returns {Promise<any>}
     */
    static getClaimVerificationURI(network: any, contractHash: any, claim_id: any): Promise<any>;
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
     * retrieves an attestation message from a claim
     * @param network
     * @param contractHash
     * @param claimId
     * @param attestationIdentifier
     * @returns {Promise<any>}
     */
    static attestationIdentifierMessage(network: any, contractHash: any, claimId: any, attestationIdentifier: any): Promise<any>;
    /**
     * retrieves an attestation's value from a claim
     * @param network
     * @param contractHash
     * @param claimId
     * @param attestationIdentifier
     * @returns {Promise<any>}
     */
    static attestationIdentifierValue(network: any, contractHash: any, claimId: any, attestationIdentifier: any): Promise<any>;
    /**
     * checks if the attestation's value is encrypted
     * @param network
     * @param contractHash
     * @param claimId
     * @param attestationIdentifier
     * @returns {Promise<any>}
     */
    static isAttestationValueEncrypted(network: any, contractHash: any, claimId: any, attestationIdentifier: any): Promise<any>;
}
