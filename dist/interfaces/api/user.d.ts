import { EmptyObject } from '../misc';
import { UserAttribute, UserAttributeHeader, UserAttributeHeadersResponse } from '../attribute';
import { ModifyProfileItem, UserProfile, ModifyProfileComponentItem } from '../profile';
import { ProfilePrivItem } from '../profiles-privilege';
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
export interface UserAttributesResponse {
    attributes: UserAttribute[];
}
export interface CreateAttributesRequest {
    access_token: string;
    attributes: UserAttribute[];
}
export declare type CreateAttributesResponse = UserAttributesResponse;
export interface UpdateAttributesRequest {
    access_token: string;
    attributes: UserAttribute[];
}
export declare type UpdateAttributesResponse = UserAttributesResponse;
export interface DeleteAttributesRequest {
    access_token: string;
    attributes: UserAttributeHeader[];
}
export declare type DeleteAttributesResponse = UserAttributesResponse;
export interface GetAttributeHeadersByTypesRequest {
    access_token: string;
    types: string[];
}
export declare type GetAttributeHeadersByTypesResponse = UserAttributeHeadersResponse;
export interface GetAttributesByIdsRequest {
    access_token: string;
    attributes: UserAttributeHeader[];
}
export declare type GetAttributesByIdsRequestResponse = UserAttributesResponse;
export interface CreateProfileRequest {
    access_token: string;
    payload: {
        remark: string;
    };
}
export interface CreateProfileResponse {
    profile_id: string;
}
export interface DeleteProfileRequest {
    access_token: string;
    profile_id: string;
}
export declare type DeleteProfileResponse = EmptyObject;
export interface GetOwnedProfileHeadersRequest {
    access_token: string;
}
export interface GetOwnedProfileHeadersResponse {
    profiles: UserProfile[];
}
export interface ModifyProfileComponentsRequest {
    access_token: string;
    payload: ModifyProfileItem[];
}
export interface ModifyProfileComponentsResponse {
    components: ModifyProfileComponentItem[];
}
export interface GetProfileByIdRequest {
    access_token: string;
    profile_id: string;
}
export interface GetProfileByIdResponse {
    profile: UserProfile;
}
export interface GetFlatProfileByIdRequest {
    access_token: string;
    profile_id: string;
}
export interface GetFlatProfileByIdResponse {
    profile: UserProfile;
}
export interface UpdateProfileRequest {
    access_token: string;
    profile_id: string;
    payload: {
        remark: string;
    };
}
export declare type UpdateProfileResponse = EmptyObject;
export interface GetProfileByTokenRequest {
    dynamic_token: string;
}
export interface GetProfileByTokenResponse {
    profile: UserProfile;
}
export interface CreateProfilePrivTokenRequest {
    access_token: string;
    profile_id: string;
    payload: {
        remark: string;
        active: boolean;
    };
}
export interface CreateProfilePrivTokenResponse {
    privilege: ProfilePrivItem;
}
export interface GetProfilePrivsRequest {
    access_token: string;
    profile_id: string;
}
export interface GetProfilePrivsResponse {
    privileges: ProfilePrivItem[];
}
export interface UpdateProfilePrivRequest {
    access_token: string;
    priv_id: string;
    payload: {
        remark: string;
        active: boolean;
    };
}
export declare type UpdateProfilePrivResponse = EmptyObject;
export interface DeleteProfilePrivRequest {
    access_token: string;
    priv_id: string;
}
export declare type DeleteProfilePrivResponse = EmptyObject;
export interface SendProfileTokenByEmailRequest {
    access_token: string;
    target_emails: string[];
    message: string;
    priv_id: string;
}
export declare type SendProfileTokenByEmailResponse = EmptyObject;
