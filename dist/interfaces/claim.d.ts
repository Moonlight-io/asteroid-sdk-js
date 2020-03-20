export interface ClaimTaskItem {
    task_id: string;
    task_type: string;
    task_version: string;
    task_priority: number;
    payload: {
        target: string;
    };
}
export interface ClaimTaskTypeItem {
    task_type: string;
    task_version: string;
}
export interface ClaimWorkflow {
    current_state: string;
    current_step: string;
    current_payload?: object;
    history: ClaimWorkflowStep[];
}
export interface ClaimWorkflowStep {
    step: number;
    state: string;
    payload?: object;
    created_date: number;
}
export interface UserClaim {
    claim_id: string;
    claim_topic: string;
    claim_state: string;
    claim_valid_start_date?: number;
    claim_valid_end_date?: number;
    workflow_id: string;
    workflow_version: string;
    workflow: ClaimWorkflow;
    create_date: number;
    edited_date?: number;
    deleted_date?: number;
}
export interface CreateClaimItem {
    claim_topic: string;
    payload: object;
}
export interface SecureAttestation {
    key: any;
    value: string;
}
