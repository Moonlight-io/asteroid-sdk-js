import { ErrorResponse } from './api';
export interface UserLogHeader {
    log_id: string;
    type: string;
    created_date?: number | string;
    event_group?: string;
}
export interface BaseUserLog<T> {
    type: string;
    log_id: string;
    payload?: T;
    error?: ErrorResponse;
}
export interface UserSessionLogPayload {
    session_id: string;
    user_agent?: string;
    ip_address?: string;
    referer?: string;
    event?: string;
    created_date?: number;
}
export declare type UserSessionLog = BaseUserLog<UserSessionLogPayload>;
export interface UserAttributesLogPayload {
    attr_id: string;
    attr_type?: string;
    new_state?: string;
    event?: string;
    created_date?: number;
}
export declare type UserAttributesLog = BaseUserLog<UserAttributesLogPayload>;
export declare type UserLog = UserSessionLog | UserAttributesLog;
