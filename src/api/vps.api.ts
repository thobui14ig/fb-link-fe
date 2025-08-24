
import { IPage } from "@/common/model/page";
import http from "./http";

export const createVps = (vps: { vps: string[] }) => http.post<IPage>(`/vps`, vps);
export const getVps = () => http.get(`/vps`);
export const deleteVps = (id: number) => http.delete<null>(`/vps/${id}`);