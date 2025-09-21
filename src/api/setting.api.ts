import { IKeyword } from '@/common/model/keyword'
import http from './http'
import { ICreateDelayParams } from '@/pages/Admin/Delay'
import { IDelay } from '@/common/model/delay'

export const createKeywords = (keywords: { keywords: string[] }) =>
  http.post<IKeyword>(`/setting/create-keyword`, keywords)
export const getKeywords = () => http.get<IKeyword[]>(`/setting/get-keywords`)
export const getDelay = () => http.get<IDelay>(`/setting/get-delay`)
export const createDelay = (delay: ICreateDelayParams) =>
  http.post<IDelay>(`/setting/create-delay`, delay)
export const createKeywordsLink = (keywords: {
  keywords: string[]
  linkId: number
}) => http.post<IKeyword>(`/setting/create-keyword-link`, keywords)
