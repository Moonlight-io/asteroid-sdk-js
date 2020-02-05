import { EmptyObject } from '../misc'
import { ClaimTaskItem, ClaimTaskTypeItem } from '../claim'
import {stringifyConfiguration} from 'tslint/lib/configuration'

// #region Tasks

export interface ClaimTaskRequest {
  access_token: string
  task_id: string
}

export type ClaimTaskResponse = EmptyObject

// TODO: need to verify
export interface CreateTaskRequest {
  access_token?: string
  shared_secret?: string
  task_type: string
  task_version: string
  task_priority: number
  payload: object
}

export interface CreateTaskResponse {
  task_id: string
}

export interface GetActiveTaskIdsRequest {
  access_token: string
}

// TODO: need to verify
export interface GetActiveTaskIdsResponse {
  task_ids: string[]
}

export interface GetTaskByIdRequest {
  access_token: string
  task_id: string
}

export type GetTaskByIdResponse = ClaimTaskItem

export interface GetUnclaimedTaskRequest {
  access_token: string
  task_types: ClaimTaskTypeItem[]
}

export type GetUnclaimedTaskResponse = ClaimTaskItem

export interface QuarantineTaskRequest {
  access_token: string
  task_id: string
  quarantine_reason: string

}

export type QuarantineTaskResponse = EmptyObject

export interface ResolveTaskRequest {
  access_token: string
  task_id: string
}

export type ResolveTaskResponse = EmptyObject

export interface UnclaimTaskRequest {
  access_token: string
  task_id: string
}

export type UnclaimTaskResponse = EmptyObject

// #endregion

// #region Workers

export interface RegisterWorkerRequest {
  access_token: string
  access_point: string
}

export type RegisterWorkerResponse = EmptyObject

// #endregion
