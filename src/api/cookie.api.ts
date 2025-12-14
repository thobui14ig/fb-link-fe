import { CookieHandle, ICookie } from '@/common/model/cookie'
import http from './http'

export const createCookies = (cookies: {
  cookies: string[]
  pageId: number | null
  type: CookieHandle
}) => http.post<ICookie>(`/cookies`, cookies)
export const getCookies = () => http.get<ICookie[]>(`/cookies`)
export const getCookie = (id: number) => http.get<ICookie>(`/cookies/${id}`)
export const updateCookie = (cookie: ICookie, id: number) =>
  http.put(`/cookies/${id}`, cookie)
export const deleteCookie = (id: number) => http.delete(`/cookies/${id}`)
