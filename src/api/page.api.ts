import { IPage } from '@/common/model/page'
import http from './http'

export const createPages = (pages: { pages: string[] }) =>
  http.post<IPage>(`/pages`, pages)
export const getPages = () => http.get<IPage[]>(`/pages`)
export const getPage = () => http.get<IPage[]>(`/pages`)
export const deletePage = (id: number) => http.delete<null>(`/pages/${id}`)
