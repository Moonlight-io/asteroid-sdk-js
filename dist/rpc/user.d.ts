import { RegisterEmailRequest, RegisterEmailResponse, RegisterEmailWithSecretResponse, RegisterEmailWithSecretRequest, UpdatePasswordRequest, UpdatePasswordResponse, UpdatePasswordJwtRequest, UpdatePasswordJwtResponse, RequestPasswordResetRequest, RequestPasswordResetResponse, NewAccessTokenRequest, NewAccessTokenResponse } from '../interfaces';
export declare class AsteroidUserRpc {
    static registerEmail(rpcUrl: string, params: RegisterEmailRequest, id?: string, methodVersion?: number): Promise<RegisterEmailResponse>;
    static registerEmailWithSecret(rpcUrl: string, params: RegisterEmailWithSecretRequest, id?: string, methodVersion?: number): Promise<RegisterEmailWithSecretResponse>;
    static updatePassword(rpcUrl: string, params: UpdatePasswordRequest, id?: string, methodVersion?: number): Promise<UpdatePasswordResponse>;
    static updatePasswordJwt(rpcUrl: string, params: UpdatePasswordJwtRequest, id?: string, methodVersion?: number): Promise<UpdatePasswordJwtResponse>;
    static requestPasswordReset(rpcUrl: string, params: RequestPasswordResetRequest, id?: string, methodVersion?: number): Promise<RequestPasswordResetResponse>;
    static newAccessToken(rpcUrl: string, params: NewAccessTokenRequest, id?: string, methodVersion?: number): Promise<NewAccessTokenResponse>;
}
