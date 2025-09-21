import { IVps } from '@/common/model/vps'
import http from './http'

export const createVps = (vps: { vps: string[] }) =>
  http.post<IVps>(`/vps`, vps)
export const getVps = () => http.get(`/vps`)
export const deleteVps = (id: number) => http.delete<null>(`/vps/${id}`)
