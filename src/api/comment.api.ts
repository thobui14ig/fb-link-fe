import { IComment } from '@/common/model/comment'
import http from './http'
import dayjs from 'dayjs'

export interface IGetCommentParams {
  startDate?: dayjs.Dayjs
  endDate?: dayjs.Dayjs
  limit?: number
  offset?: number
  keyword?: string
}

export interface IGetCommentResponse {
  data: IComment[]
  totalCount: number
}

export const getComments = (params: IGetCommentParams, hide: number = 0) =>
  http.post<IGetCommentResponse>(`/comments?hide=${hide}`, params)

export const hideCmt = (cmtId: string) =>
  http.post<IComment[]>(`/comments/hide-cmt/${cmtId}`)
