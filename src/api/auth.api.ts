import { IUser } from "@/common/model/user";
import http from "./http";
import { IDataLogin } from "@/pages/Auth/Login";

interface ILoginResponse {
  token: {
    accessToken: string,
    refreshToken: string
  },
  info: IUser
}
export const login = (auth: IDataLogin) => http.post<ILoginResponse>(`/auth/login`, auth);

export const register = (auth: { email: string; password: string; nickName: string }) =>
  http.post(`/auth/register`, auth);

export const getRefreshToken = (refreshToken: string) =>
  http.post(`/auth/refresh-token`, { refreshToken });

