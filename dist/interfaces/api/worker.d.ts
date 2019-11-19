import { EmptyObject } from '../misc';
import { ClaimTaskItem, ClaimTaskTypeItem } from '../claim';
export interface ClaimTaskRequest {
    access_token: string;
    task_id: string;
}
export declare type ClaimTaskResponse = EmptyObject;
export interface CreateTaskRequest {
    access_token: string;
    task_type: string;
    task_version: string;
    task_priority: number;
    payload: {
        target: string;
    };
}
export interface CreateTaskResponse {
    task_id: string;
}
export interface GetActiveTaskIdsRequest {
    access_token: string;
}
export interface GetActiveTaskIdsResponse {
    task_ids: string[];
}
export interface GetTaskByIdRequest {
    access_token: string;
    task_id: string;
}
export declare type GetTaskByIdResponse = ClaimTaskItem;
export interface GetUnclaimedTaskRequest {
    access_token: string;
    task_types: ClaimTaskTypeItem[];
}
export declare type GetUnclaimedTaskResponse = ClaimTaskItem;
export interface ResolveTaskRequest {
    access_token: string;
    task_id: string;
}
export declare type ResolveTaskResponse = EmptyObject;
export interface UnclaimTaskRequest {
    access_token: string;
    task_id: string;
}
export declare type UnclaimTaskResponse = EmptyObject;
export interface RegisterWorkerRequest {
    access_token: string;
    access_point: string;
}
export declare type RegisterWorkerResponse = EmptyObject;
