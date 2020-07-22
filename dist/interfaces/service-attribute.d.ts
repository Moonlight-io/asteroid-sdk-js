import { UserAttributePayload, BaseUserAttribute } from './user-attribute';
export interface ServiceOauthAttributePayload extends UserAttributePayload {
    force_reauth?: boolean;
    redirect?: string;
}
export declare type ServiceOauthAttribute = BaseUserAttribute<ServiceOauthAttributePayload>;
