import { IProxy, ProxyStatus } from '@/common/model/proxy'
import http from './http'
import { IToken } from '@/common/model/token'

interface IGetProxy {
  isFbBlock: boolean | null,
  status: ProxyStatus | null,
}

export const createProxies = (proxies: { proxies: string[] }) =>
  http.post<IToken>(`/proxies`, proxies)
export const getProxies = (body: IGetProxy) => http.post<IProxy[]>(`/proxies/get-proxies`, body)
export const getProxy = () => http.get<IProxy[]>(`/proxies`)
export const deleteProxy = (id: number) => http.delete<null>(`/proxies/${id}`)
export const deleteProxies = (ids: number[]) => http.post<null>(`/proxies/delete`, ids)
