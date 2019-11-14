import { AxiosRequestConfig } from 'axios';
import { RegisterEmailRequest, RegisterEmailResponse, RegisterEmailWithSecretResponse, RegisterEmailWithSecretRequest, UpdatePasswordRequest, UpdatePasswordResponse, UpdatePasswordJwtRequest, UpdatePasswordJwtResponse, RequestPasswordResetRequest, RequestPasswordResetResponse, NewAccessTokenRequest, NewAccessTokenResponse, LoginEmailRequest, LoginEmailResponse, LoginOauthRequest, LoginOauthResponse, SetUserGroupByEmailRequest, SetUserGroupByEmailResponse, LogoutRequest, LogoutResponse } from '../interfaces';
export declare class AsteroidUserRpc {
    static registerEmail(rpcUrl: string, params: RegisterEmailRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<RegisterEmailResponse>;
    static registerEmailWithSecret(rpcUrl: string, params: RegisterEmailWithSecretRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<RegisterEmailWithSecretResponse>;
    static updatePassword(rpcUrl: string, params: UpdatePasswordRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<UpdatePasswordResponse>;
    static updatePasswordJwt(rpcUrl: string, params: UpdatePasswordJwtRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<UpdatePasswordJwtResponse>;
    static requestPasswordReset(rpcUrl: string, params: RequestPasswordResetRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<RequestPasswordResetResponse>;
    static loginEmail(rpcUrl: string, params: LoginEmailRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<LoginEmailResponse>;
    static loginOauth(rpcUrl: string, params: LoginOauthRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<LoginOauthResponse>;
    static setUserGroupByEmail(rpcUrl: string, params: SetUserGroupByEmailRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<SetUserGroupByEmailResponse>;
    static newAccessToken(rpcUrl: string, params: NewAccessTokenRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<NewAccessTokenResponse>;
    static logout(rpcUrl: string, params: LogoutRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<LogoutResponse>;
}
