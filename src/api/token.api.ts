import { ETokenHandleType, IToken } from '@/common/model/token'
import http from './http'

export const createTokens = (tokens: {
    tokens: string[]
    type: ETokenHandleType
}) => http.post<IToken>(`/tokens`, tokens)
export const getTokens = () => http.get<IToken[]>(`/tokens`)
export const deleteToken = (id: number) => http.delete<null>(`/tokens/${id}`)
