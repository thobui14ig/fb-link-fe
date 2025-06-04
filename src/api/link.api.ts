import { ILink, LinkStatus } from '@/common/model/link'
import http from './http'
import { FormValues } from '@/components/Link/FilterLink'
import { EKeyHideCmt } from '@/components/Link/LinkComponent'

export interface ICreateLinkParams {
  links: {
    url: string
    delayTime: number
  }[]
  status: LinkStatus,
  hideCmt: boolean
}

export interface IGetAllLink extends ILink {
  email: string
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
export const processLink = (body: { id: number; status: LinkStatus }) =>
  http.post(`/monitoring/process`, body)
export const hideCmt = (id: number, type: EKeyHideCmt) =>
  http.post(`/links/hide-cmt/${id}?type=${type}`)
