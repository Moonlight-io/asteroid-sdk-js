import { LoggerOptions } from 'node-log-it';
import { ConnectionNetworkType, UserAttribute, UserAttributeHeader, ProfilePrivItem, UserProfile, ModifyProfileItem, ModifyProfileComponentItem, UserLogHeader, UserLog, ClaimTaskItem, ClaimTaskTypeItem, ProfileType, GetUserMnemonicResponse } from './interfaces';
import { GetTasksByStateResponse, ResetTaskResponse } from './interfaces/api/worker';
import { UserClaim, CreateClaimItem } from './interfaces/claim';
export interface AsteroidUserOptions {
    networkType?: ConnectionNetworkType;
    accessToken?: string;
    refreshToken?: string;
    autoUpdateTokens?: boolean;
    id?: string;
    loggerOptions?: LoggerOptions;
}
export declare class AsteroidUser {
    private options;
    private currentAccessToken;
    private currentRefreshToken;
    private logger;
    constructor(options?: AsteroidUserOptions);
    get asteroidDomainUserBaseUrl(): string;
    get asteroidDomainWorkerBaseUrl(): string;
    get accessToken(): string | undefined;
    get refreshToken(): string | undefined;
    get id(): string;
    setAccessToken(token: string): void;
    setRefreshToken(token: string): void;
    claimTask(taskId: string): Promise<void>;
    createClaim(claim: CreateClaimItem): Promise<string>;
    createAttributes(attributes: UserAttribute[]): Promise<UserAttribute[]>;
    /**
     * @returns ID of the newly created profile
     */
    createProfile(remark: string, profileType: ProfileType): Promise<string>;
    createProfilePrivToken(profileId: string, remark: string, active?: boolean): Promise<ProfilePrivItem>;
    /**
     * @returns ID of the newly created task
     */
    createTask(taskType: string, taskVersion: string, taskPriority: number, payload: object): Promise<string>;
    deleteAttributes(attributes: UserAttribute[]): Promise<UserAttribute[]>;
    deleteProfile(profileId: string): Promise<void>;
    deleteProfilePriv(privilegeId: string): Promise<void>;
    getActiveTaskIds(): Promise<string[]>;
    getAttributeHeadersByTypes(types: string[]): Promise<UserAttributeHeader[]>;
    getAttributesByIds(attributeHeaders: UserAttributeHeader[]): Promise<UserAttribute[]>;
    getClaimById(claimId: string): Promise<UserClaim>;
    getFlatProfileById(profileId: string): Promise<UserProfile>;
    getLatestLogsByTypes(types: string[]): Promise<UserLog[]>;
    getLogHeadersByTypes(types: string[], startTimestamp: number, endTimestamp: number): Promise<UserLogHeader[]>;
    getLogsByIds(logHeaders: UserLogHeader[]): Promise<UserLog[]>;
    getOwnedProfileHeaders(profileType: ProfileType): Promise<UserProfile[]>;
    getProfileById(profileId: string): Promise<UserProfile>;
    getProfilePrivs(profileId: string): Promise<ProfilePrivItem[]>;
    getUnclaimedTask(taskTypes: ClaimTaskTypeItem[]): Promise<ClaimTaskItem>;
    getUserMnemonic(): Promise<GetUserMnemonicResponse>;
    getTaskById(taskId: string): Promise<ClaimTaskItem>;
    getTasksByState(state: string): Promise<GetTasksByStateResponse>;
    logout(): Promise<void>;
    modifyProfileComponents(modifyProfileItems: ModifyProfileItem[]): Promise<ModifyProfileComponentItem[]>;
    quarantineTask(taskId: string, quarantineReason: string): Promise<void>;
    registerWorker(accessPoint: string): Promise<void>;
    reissueClaim(claimId: string): Promise<void>;
    resetTask(taskId: string): Promise<ResetTaskResponse>;
    resolveTask(taskId: string): Promise<void>;
    sendProfileTokenByEmail(privilegeId: string, targetEmails: string[], message: string): Promise<void>;
    setUserGroupByEmail(email: string, group: string, secret: string): Promise<void>;
    submitWorkflowToken(dynamicToken: string, payload?: object): Promise<void>;
    updateAttributes(attributes: UserAttribute[]): Promise<UserAttribute[]>;
    updatePasswordJwt(password: string): Promise<void>;
    updateProfile(profileId: string, remark: string): Promise<void>;
    updateProfilePriv(privilegeId: string, remark: string, active: boolean): Promise<void>;
    unclaimTask(taskId: string): Promise<void>;
    private validateOptionalParameters;
    private invokeOrRefreshToken;
}
