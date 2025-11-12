import { IComment } from '@/common/model/comment'
import http from './http'
import dayjs from 'dayjs'

export interface IGetReactionParams {
  startDate?: dayjs.Dayjs
  endDate?: dayjs.Dayjs
  limit?: number
  offset?: number
  keyword?: string
}

export interface IGetReactionResponse {
  data: IComment[]
  totalCount: number
}

export const getReactions = (params: IGetReactionParams) =>
  http.post<IGetReactionResponse>(`/reactions`, params)
