import { EmptyObject } from '../misc';
export interface RegisterEmailRequest {
    email: string;
}
export declare type RegisterEmailResponse = EmptyObject;
export interface RegisterEmailWithSecretRequest {
    email: string;
    secret: string;
}
export interface RegisterEmailWithSecretResponse {
    dynamic_token: string;
}
export interface UpdatePasswordRequest {
    dynamic_token: string;
    password: string;
    token_type: string;
}
export declare type UpdatePasswordResponse = EmptyObject;
export interface UpdatePasswordJwtRequest {
    access_token: string;
    password: string;
}
export declare type UpdatePasswordJwtResponse = EmptyObject;
export interface RequestPasswordResetRequest {
    email: string;
}
export declare type RequestPasswordResetResponse = EmptyObject;
export interface LoginEmailRequest {
    email: string;
    password: string;
}
export interface LoginResponse {
    access_token: string;
    refresh_token: string;
    first_session: boolean;
}
export declare type LoginEmailResponse = LoginResponse;
export interface LoginOauthRequest {
    provider: string;
    payload: object;
}
export declare type LoginOauthResponse = LoginResponse;
export interface SetUserGroupByEmailRequest {
    access_token: string;
    email: string;
    group: string;
}
export declare type SetUserGroupByEmailResponse = EmptyObject;
export interface NewAccessTokenRequest {
    refresh_token: string;
}
export interface NewAccessTokenResponse {
    access_token: string;
}
export interface LogoutRequest {
    access_token: string;
    refresh_token: string;
}
export declare type LogoutResponse = EmptyObject;
