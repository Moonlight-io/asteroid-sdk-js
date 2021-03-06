import { EmptyObject, TermsApprovalItem } from '../misc';
import { UserAttribute, UserAttributeHeader, UserAttributeHeadersResponse } from '../user-attribute';
import { ModifyProfileItem, UserProfile, ModifyProfileComponentItem, ProfileType } from '../profile';
import { ProfilePrivItem } from '../profiles-privilege';
import { UserLogHeader, UserLog } from '../log';
import { UserClaim, CreateClaimItem } from '../claim';
import { PlotStatistic, SimplePlot, StackedBarPlot } from '../analytics';
export interface GetPrivUniqueViewsRequest {
    access_token: string;
    profile_id: string;
}
export interface GetPrivUniqueViewsResponse {
    plot: SimplePlot;
    statistics: PlotStatistic[];
}
export declare type GetPrivViewsRequest = GetPrivUniqueViewsRequest;
export declare type GetPrivViewsResponse = GetPrivUniqueViewsResponse;
export declare type GetPrivViewsSeriesRequest = GetPrivUniqueViewsRequest;
export interface GetPrivViewsSeriesResponse {
    plot: StackedBarPlot;
    statistics: PlotStatistic[];
}
export interface GetProfileUniqueViewsRequest {
    access_token: string;
}
export declare type GetProfileUniqueViewsResponse = GetPrivUniqueViewsResponse;
export declare type GetProfileViewsRequest = GetProfileUniqueViewsRequest;
export declare type GetProfileViewsResponse = GetPrivUniqueViewsResponse;
export declare type GetProfileViewsSeriesRequest = GetProfileUniqueViewsRequest;
export declare type GetProfileViewsSeriesResponse = GetPrivViewsSeriesResponse;
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
export interface RegisterInterestRequest {
    email: string;
}
export declare type RegisterInterestResponse = EmptyObject;
export interface SetDisableRegistrationRequest {
    secret: string;
    state: boolean;
}
export declare type SetDisableRegistrationResponse = EmptyObject;
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
export interface VividGetAppInformationRequest {
    access_token: string;
    app_id: string;
}
export interface VividGetAppInformationResponse {
    app_name: string;
}
export interface VividRegisterEmailRequest {
    email: string;
    app_id: string;
    service_id: string;
    state: string;
}
export declare type VividRegisterEmailResponse = EmptyObject;
export interface LoginEmailRequest {
    email: string;
    password: string;
}
export interface LoginResponse {
    access_token: string;
    refresh_token: string;
    terms_approvals: TermsApprovalItem[];
}
export declare type LoginEmailResponse = LoginResponse;
export interface LoginOauthRequest {
    provider: string;
    payload: object;
}
export declare type LoginOauthResponse = LoginResponse;
export interface SetUserGroupByEmailRequest {
    access_token?: string;
    email: string;
    group: string;
    secret?: string;
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
export interface SetTermsApprovalsRequest {
    access_token: string;
    terms_types: string[];
}
export interface SetTermsApprovalsResponse {
    terms_approvals: TermsApprovalItem[];
}
export interface VividLoginEmailRequest {
    email: string;
    password: string;
    app_id: string;
    service_id: string;
}
export interface VividLoginEmailResponse {
    access_token: string;
    refresh_token: string;
    terms_approvals: TermsApprovalItem[];
    service: string;
}
export interface MailingListUnsubscribeRequest {
    token: string;
}
export declare type MailingListUnsubscribeResponse = EmptyObject;
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
export declare type GetAttributesByIdsResponse = UserAttributesResponse;
export interface GetUserMnemonicRequest {
    access_token: string;
}
export interface GetUserMnemonicResponse {
    encrypted_mnemonic: string;
}
export interface CreateProfileRequest {
    access_token: string;
    profile_type: ProfileType;
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
    profile_type: ProfileType;
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
export interface VividCreateProfileRequest {
    access_token: string;
    profile_type: string;
    app_id: string;
    service_id: string;
}
export interface VividCreateProfileResponse {
    code: string;
    redirect: string;
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
export interface VividCreateProfilePrivCodeRequest {
    access_token: string;
    profile_id: string;
    app_id: string;
    service_id: string;
}
export declare type VividCreateProfilePrivCodeResponse = VividCreateProfileResponse;
export interface VividExchangeCodeRequest {
    access_token: string;
    code: string;
}
export interface VividExchangeCodeResponse {
    token: string;
}
export interface GetLogHeadersByTypesRequest {
    access_token: string;
    types: string[];
    start_time: number;
    end_time: number;
}
export interface GetLogHeadersByTypesResponse {
    headers: UserLogHeader[];
}
export interface GetLogsByIdsRequest {
    access_token: string;
    logs: UserLogHeader[];
}
export interface GetLogsByIdsResponse {
    logs: UserLog[];
}
export interface GetLatestLogsByTypesRequest {
    access_token: string;
    types: string[];
}
export interface GetLatestLogsByTypesResponse {
    logs: UserLog[];
}
export interface CreateClaimRequest {
    access_token: string;
    claim: CreateClaimItem;
}
export interface CreateClaimResponse {
    claim_id: string;
}
export interface GetClaimByIdPublicRequest {
    claim_id: string;
}
export interface GetClaimByIdRequest {
    access_token: string;
    claim_id: string;
}
export interface GetClaimByIdResponse {
    claim: UserClaim;
}
export interface ReissueClaimRequest {
    access_token: string;
    claim_id: string;
}
export declare type ReissueClaimResponse = EmptyObject;
export interface SubmitWorkflowTokenRequest {
    dynamic_token: string;
    payload?: object;
}
export interface SubmitWorkflowTokenResponse {
    redirect: string;
}
