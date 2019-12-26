import { AxiosRequestConfig } from 'axios';
import { RegisterEmailRequest, RegisterEmailResponse, RegisterEmailWithSecretResponse, RegisterEmailWithSecretRequest, UpdatePasswordRequest, UpdatePasswordResponse, UpdatePasswordJwtRequest, UpdatePasswordJwtResponse, RequestPasswordResetRequest, RequestPasswordResetResponse, NewAccessTokenRequest, NewAccessTokenResponse, LoginEmailRequest, LoginEmailResponse, LoginOauthRequest, LoginOauthResponse, SetUserGroupByEmailRequest, SetUserGroupByEmailResponse, LogoutRequest, LogoutResponse, CreateAttributesRequest, CreateAttributesResponse, UpdateAttributesRequest, UpdateAttributesResponse, DeleteAttributesRequest, DeleteAttributesResponse, GetAttributeHeadersByTypesRequest, GetAttributeHeadersByTypesResponse, GetAttributesByIdsRequest, GetAttributesByIdsResponse, CreateProfileRequest, CreateProfileResponse, DeleteProfileRequest, DeleteProfileResponse, GetOwnedProfileHeadersRequest, GetOwnedProfileHeadersResponse, ModifyProfileComponentsRequest, ModifyProfileComponentsResponse, GetProfileByIdRequest, GetProfileByIdResponse, GetFlatProfileByIdRequest, GetFlatProfileByIdResponse, UpdateProfileRequest, UpdateProfileResponse, GetProfileByTokenRequest, GetProfileByTokenResponse, CreateProfilePrivTokenRequest, CreateProfilePrivTokenResponse, GetProfilePrivsRequest, GetProfilePrivsResponse, UpdateProfilePrivRequest, UpdateProfilePrivResponse, DeleteProfilePrivRequest, DeleteProfilePrivResponse, SendProfileTokenByEmailRequest, SendProfileTokenByEmailResponse, GetLogHeadersByTypesRequest, GetLogHeadersByTypesResponse, GetLogsByIdsRequest, GetLogsByIdsResponse, GetLatestLogsByTypesRequest, GetLatestLogsByTypesResponse, SubmitWorkflowTokenRequest, SubmitWorkflowTokenResponse, CreateClaimRequest, CreateClaimResponse, GetClaimByIdRequest, GetClaimByIdResponse } from '../interfaces';
export declare class AsteroidUserRpc {
    static registerEmail(baseUrl: string, params: RegisterEmailRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<RegisterEmailResponse>;
    static registerEmailWithSecret(baseUrl: string, params: RegisterEmailWithSecretRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<RegisterEmailWithSecretResponse>;
    static updatePassword(baseUrl: string, params: UpdatePasswordRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<UpdatePasswordResponse>;
    static updatePasswordJwt(baseUrl: string, params: UpdatePasswordJwtRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<UpdatePasswordJwtResponse>;
    static requestPasswordReset(baseUrl: string, params: RequestPasswordResetRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<RequestPasswordResetResponse>;
    static loginEmail(baseUrl: string, params: LoginEmailRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<LoginEmailResponse>;
    static loginOauth(baseUrl: string, params: LoginOauthRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<LoginOauthResponse>;
    static setUserGroupByEmail(baseUrl: string, params: SetUserGroupByEmailRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<SetUserGroupByEmailResponse>;
    static newAccessToken(baseUrl: string, params: NewAccessTokenRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<NewAccessTokenResponse>;
    static logout(baseUrl: string, params: LogoutRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<LogoutResponse>;
    static createAttributes(baseUrl: string, params: CreateAttributesRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<CreateAttributesResponse>;
    static updateAttributes(baseUrl: string, params: UpdateAttributesRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<UpdateAttributesResponse>;
    static deleteAttributes(baseUrl: string, params: DeleteAttributesRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<DeleteAttributesResponse>;
    static getAttributeHeadersByTypes(baseUrl: string, params: GetAttributeHeadersByTypesRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<GetAttributeHeadersByTypesResponse>;
    static getAttributesByIds(baseUrl: string, params: GetAttributesByIdsRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<GetAttributesByIdsResponse>;
    static createProfile(baseUrl: string, params: CreateProfileRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<CreateProfileResponse>;
    static deleteProfile(baseUrl: string, params: DeleteProfileRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<DeleteProfileResponse>;
    static getOwnedProfileHeaders(baseUrl: string, params: GetOwnedProfileHeadersRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<GetOwnedProfileHeadersResponse>;
    static modifyProfileComponents(baseUrl: string, params: ModifyProfileComponentsRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<ModifyProfileComponentsResponse>;
    static getProfileById(baseUrl: string, params: GetProfileByIdRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<GetProfileByIdResponse>;
    static getFlatProfileById(baseUrl: string, params: GetFlatProfileByIdRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<GetFlatProfileByIdResponse>;
    static updateProfile(baseUrl: string, params: UpdateProfileRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<UpdateProfileResponse>;
    static getProfileByToken(baseUrl: string, params: GetProfileByTokenRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<GetProfileByTokenResponse>;
    static createProfilePrivToken(baseUrl: string, params: CreateProfilePrivTokenRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<CreateProfilePrivTokenResponse>;
    static getProfilePrivs(baseUrl: string, params: GetProfilePrivsRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<GetProfilePrivsResponse>;
    static updateProfilePriv(baseUrl: string, params: UpdateProfilePrivRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<UpdateProfilePrivResponse>;
    static deleteProfilePriv(baseUrl: string, params: DeleteProfilePrivRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<DeleteProfilePrivResponse>;
    static sendProfileTokenByEmail(baseUrl: string, params: SendProfileTokenByEmailRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<SendProfileTokenByEmailResponse>;
    static getLogHeadersByTypes(baseUrl: string, params: GetLogHeadersByTypesRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<GetLogHeadersByTypesResponse>;
    static getLogsByIds(baseUrl: string, params: GetLogsByIdsRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<GetLogsByIdsResponse>;
    static getLatestLogsByTypes(baseUrl: string, params: GetLatestLogsByTypesRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<GetLatestLogsByTypesResponse>;
    static createClaim(baseUrl: string, params: CreateClaimRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<CreateClaimResponse>;
    static getClaimById(baseUrl: string, params: GetClaimByIdRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<GetClaimByIdResponse>;
    static submitWorkflowToken(baseUrl: string, params: SubmitWorkflowTokenRequest, id?: string, methodVersion?: number, config?: AxiosRequestConfig): Promise<SubmitWorkflowTokenResponse>;
}
