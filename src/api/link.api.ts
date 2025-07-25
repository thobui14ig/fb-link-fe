import { IComment } from '@/common/model/comment'
import { ILink, LinkStatus } from '@/common/model/link'
import { FormValues } from '@/components/Link/FilterLink'
import http from './http'

export interface ICreateLinkParams {
  links: {
    url: string
    delayTime: number
  }[]
  status: LinkStatus
  hideCmt: boolean
  thread: number
}
export interface ISettingLink {
  isDelete: boolean
  onOff: boolean
  delay: number
  linkIds: number[]
  hideCmt?: boolean
}

export interface IGetAllLink extends ILink {
  username: string
}
export const createLink = (links: ICreateLinkParams) =>
  http.post<ILink>(`/links`, links)
export const getLinks = (
  body: FormValues | null,
  status: LinkStatus,
  isFilter: number = 0,
  hideCmt: number = 0
) =>
  http.post<IGetAllLink[]>(
    `/links/query?status=${status}&isFilter=${isFilter}&hideCmt=${hideCmt}`,
    body ?? {}
  )
export const getLink = (id: number) =>
  http.get<Omit<ILink, 'user'>>(`/links/${id}`)
export const updateLink = (link: Omit<Partial<ILink>, 'user'>) =>
  http.put(`/links`, link)
export const deleteLink = (id: number) => http.delete<null>(`/links/${id}`)
export const processLink = (body: {
  id: number
  status: LinkStatus
  hideCmt: boolean
}) => http.post(`/monitoring/process`, body)
export const hideCmt = (comment: IComment) =>
  http.post(`/comments/hide-cmt`, comment)
export const getKeywordByLinkId = (id: number) =>
  http.get<Omit<ILink, 'user'>>(`/links/get-keywords/${id}`)
export const settingLink = (body: ISettingLink) =>
  http.post(`/links/setting-link`, body)
