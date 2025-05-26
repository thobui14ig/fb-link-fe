import { ILink, LinkStatus } from '@/common/model/link'
import http from './http'
import { FormValues } from '@/components/Link/FilterLink'

export interface ICreateLinkParams {
  links: {
    url: string
    delayTime: number
  }[]
  status: LinkStatus
}

export interface IGetAllLink extends ILink {
  email: string
}
export const createLink = (links: ICreateLinkParams) =>
  http.post<ILink>(`/links`, links)
export const getLinks = (
  body: FormValues | null,
  status: LinkStatus,
  isFilter: boolean = false
) =>
  http.post<IGetAllLink[]>(
    `/links/query?status=${status}&isFilter=${isFilter}`,
    body ?? {}
  )
export const getLink = (id: number) =>
  http.get<Omit<ILink, 'user'>>(`/links/${id}`)
export const updateLink = (link: Omit<Partial<ILink>, 'user'>) =>
  http.put(`/links`, link)
export const deleteLink = (id: number) => http.delete<null>(`/links/${id}`)
export const processLink = (body: { id: number; status: LinkStatus }) =>
  http.post(`/monitoring/process`, body)
