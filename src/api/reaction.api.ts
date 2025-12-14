import { IComment } from '@/common/model/comment'
import http from './http'
import dayjs from 'dayjs'
import { IReaction } from '@/common/model/reaction'

export interface IGetReactionParams {
  startDate?: dayjs.Dayjs
  endDate?: dayjs.Dayjs
  limit?: number
  offset?: number
  keyword?: string
}

export interface IGetReactionResponse {
  data: IReaction[]
  totalCount: number
}

export interface TaskDetailResponse {
  totalRunning: number
  totalSuccess: number
  createdAt: string
}

export const getReactions = (params: IGetReactionParams) =>
  http.post<IGetReactionResponse>(`/reactions`, params)
export const getTaskDetail = () =>
  http.get<TaskDetailResponse[]>(`/reactions/detail`)
