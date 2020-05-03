export interface ClaimInfo {
    claim_id: string;
    attestations: ClaimAttestationItem[];
    signed_by?: string;
    signature?: string;
    sub: string;
    claim_topic: string;
    expires?: number;
    verification_uri: string;
    keys?: any[];
}
export interface ClaimKey {
    identifier: string;
    value: string;
}
export interface ClaimAttestationItem {
    remark: string;
    identifier?: string;
    value: string;
    encryption: string;
}
export interface ClaimTopicInfo {
    claim_topic: string;
    identifiers: string[];
    issuer: string;
}
