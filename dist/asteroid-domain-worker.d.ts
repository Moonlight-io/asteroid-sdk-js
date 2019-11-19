import { LoggerOptions } from 'node-log-it';
import { ConnectionNetworkType, ConnectionNetworkConfig, GetVersionResponse, ClaimTaskItem, ClaimTaskTypeItem } from './interfaces';
export interface AsteroidDomainWorkerOptions {
    networkType?: ConnectionNetworkType;
    networkConfig?: ConnectionNetworkConfig;
    accessToken?: string;
    id?: string;
    loggerOptions?: LoggerOptions;
}
export declare class AsteroidDomainWorker {
    private options;
    private currentAccessToken;
    private logger;
    constructor(options?: AsteroidDomainWorkerOptions);
    get baseUrl(): string;
    get accessToken(): string | undefined;
    get id(): string;
    setAccessToken(token: string): void;
    getVersionInfo(): Promise<GetVersionResponse>;
    claimTask(taskId: string): Promise<void>;
    createTask(taskType: string, taskVersion: string, taskPriority: number, target: string): Promise<string>;
    getActiveTaskIds(): Promise<string[]>;
    getTaskById(taskId: string): Promise<ClaimTaskItem>;
    getUnclaimedTask(taskTypes: ClaimTaskTypeItem[]): Promise<ClaimTaskItem>;
    resolveTask(taskId: string): Promise<void>;
    unclaimTask(taskId: string): Promise<void>;
    registerWorker(accessPoint: string): Promise<void>;
    private validateOptionalParameters;
}
