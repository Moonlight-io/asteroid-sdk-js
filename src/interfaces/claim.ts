export interface ClaimTaskItem {
  task_id: string
  task_type: string
  task_version: string
  task_priority: number
  payload: {
    target: string
  }
}

export interface ClaimTaskTypeItem {
  task_type: string
  task_version: string
}
