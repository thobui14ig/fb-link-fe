import { IProxy } from "@/common/model/proxy";
import http from "./http";
import { IToken } from "@/common/model/token";

export const createProxies = (proxies: { proxies: string[] }) => http.post<IToken>(`/proxies`, proxies);
export const getProxies = () => http.get<IProxy[]>(`/proxies`);
export const getProxy = () => http.get<IProxy[]>(`/proxies`);
export const deleteProxy = (id: number) => http.delete<null>(`/proxies/${id}`);