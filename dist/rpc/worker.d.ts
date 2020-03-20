import { AxiosRequestConfig } from 'axios';
import { ClaimTaskRequest, ClaimTaskResponse, CreateTaskRequest, CreateTaskResponse, GetActiveTaskIdsRequest, GetActiveTaskIdsResponse, GetTaskByIdRequest, GetTaskByIdResponse, GetTasksByStateRequest, GetTasksByStateResponse, ResetTaskRequest, ResetTaskResponse, GetUnclaimedTaskRequest, GetUnclaimedTaskResponse, ResolveTaskRequest, ResolveTaskResponse, UnclaimTaskRequest, UnclaimTaskResponse, RegisterWorkerRequest, RegisterWorkerResponse, QuarantineTaskRequest, QuarantineTaskResponse } from '../interfaces/api/worker';
export declare class AsteroidWorkerRpc {
    static claimTask(baseUrl: string, params: ClaimTaskRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<ClaimTaskResponse>;
    static createTask(baseUrl: string, params: CreateTaskRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<CreateTaskResponse>;
    static getActiveTaskIds(baseUrl: string, params: GetActiveTaskIdsRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<GetActiveTaskIdsResponse>;
    static getTaskById(baseUrl: string, params: GetTaskByIdRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<GetTaskByIdResponse>;
    static getTasksByState(baseUrl: string, params: GetTasksByStateRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<GetTasksByStateResponse>;
    static getUnclaimedTask(baseUrl: string, params: GetUnclaimedTaskRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<GetUnclaimedTaskResponse>;
    static quarantineTask(baseUrl: string, params: QuarantineTaskRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<QuarantineTaskResponse>;
    static resetTask(baseUrl: string, params: ResetTaskRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<ResetTaskResponse>;
    static resolveTask(baseUrl: string, params: ResolveTaskRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<ResolveTaskResponse>;
    static unclaimTask(baseUrl: string, params: UnclaimTaskRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<UnclaimTaskResponse>;
    static registerWorker(baseUrl: string, params: RegisterWorkerRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<RegisterWorkerResponse>;
}
