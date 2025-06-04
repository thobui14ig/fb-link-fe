import { IComment } from '@/common/model/comment'
import http from './http'
import dayjs from 'dayjs'

export interface IGetCommentParams {
    startDate: dayjs.Dayjs
    endDate: dayjs.Dayjs
}

export const getComments = (params: IGetCommentParams, hide: number = 0) =>
    http.post<IComment[]>(`/comments?hide=${hide}`, params)

export const hideCmt = (cmtId: string) =>
    http.post<IComment[]>(`/comments/hide-cmt/${cmtId}`)
