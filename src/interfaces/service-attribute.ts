import { UserAttributePayload, BaseUserAttribute } from './user-attribute'

export interface ServiceOauthAttributePayload extends UserAttributePayload {
  force_reauth?: boolean
  redirect?: string
}
export type ServiceOauthAttribute = BaseUserAttribute<ServiceOauthAttributePayload>
