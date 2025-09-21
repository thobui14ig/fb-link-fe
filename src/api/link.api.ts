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
  tablePageId: number | null
}
export interface ISettingLink {
  isDelete: boolean
  onOff: boolean
  delay: number
  linkIds: number[]
  hideCmt?: boolean
  type: LinkStatus
}

export interface IGetAllLink extends ILink {
  username: string
  totalCount: number
}

export interface LinkDeleted {
  data: {
    id: number
    linkName: string
    linkUrl: string
    username: string
  }[]
  totalCount: number
}

export const createLink = (links: ICreateLinkParams) =>
  http.post<ILink>(`/links`, links)
export const getLinks = (
  body: FormValues | null,
  status: LinkStatus,
  isFilter: number = 0,
  hideCmt: number = 0,
  limit: number,
  offset: number
) =>
  http.post<{ data: IGetAllLink[]; totalCount: number }>(
    `/links/query?status=${status}&isFilter=${isFilter}&hideCmt=${hideCmt}&limit=${limit}&offset=${offset}`,
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
export const hideOption = (linkId: number, key: string) =>
  http.post(`/links/hide-cmt/${linkId}?type=${key}`)
export const priority = (body: { priority: boolean; linkId: number }) =>
  http.post(`/links/priority`, body)
export const getLinkDeleted = (
  body:
    | {
        userId: number | null
        keyword: string | null
        limit: number
        offset: number
      }
    | {}
) =>
  http.post<{ data: IGetAllLink[]; totalCount: number }>(
    `/links/get-link-deleted`,
    body
  )
export const updateLinkDelete = (body: {
  status: LinkStatus
  linkIds: number[]
}) => http.post(`/links/update-link-delete`, body)
