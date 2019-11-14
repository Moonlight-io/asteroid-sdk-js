export interface ProfilePrivItem {
  priv_id?: string
  priv_type?: string
  profile_id?: string
  payload: {
    dynamic_token?: string
    active?: boolean
    remark?: string
    created_date?: number
    share_url?: string
  }
}
