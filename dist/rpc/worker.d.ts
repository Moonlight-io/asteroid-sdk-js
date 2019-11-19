import { AxiosRequestConfig } from 'axios';
import { ClaimTaskRequest, ClaimTaskResponse, CreateTaskRequest, CreateTaskResponse, GetActiveTaskIdsRequest, GetActiveTaskIdsResponse, GetTaskByIdRequest, GetTaskByIdResponse, GetUnclaimedTaskRequest, GetUnclaimedTaskResponse, ResolveTaskRequest, ResolveTaskResponse, UnclaimTaskRequest, UnclaimTaskResponse, RegisterWorkerRequest, RegisterWorkerResponse } from '../interfaces/api/worker';
export declare class AsteroidWorkerRpc {
    static claimTask(rpcUrl: string, params: ClaimTaskRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<ClaimTaskResponse>;
    static createTask(rpcUrl: string, params: CreateTaskRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<CreateTaskResponse>;
    static getActiveTaskIds(rpcUrl: string, params: GetActiveTaskIdsRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<GetActiveTaskIdsResponse>;
    static getTaskById(rpcUrl: string, params: GetTaskByIdRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<GetTaskByIdResponse>;
    static getUnclaimedTask(rpcUrl: string, params: GetUnclaimedTaskRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<GetUnclaimedTaskResponse>;
    static resolveTask(rpcUrl: string, params: ResolveTaskRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<ResolveTaskResponse>;
    static unclaimTask(rpcUrl: string, params: UnclaimTaskRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<UnclaimTaskResponse>;
    static registerWorker(rpcUrl: string, params: RegisterWorkerRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<RegisterWorkerResponse>;
}
