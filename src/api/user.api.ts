import { IUser } from "@/common/model/user";
import http from "./http";
import { IUserRegister } from "@/components/ModalUser/ModalAddUser";

export const createUser = (user: IUserRegister) => http.post<IUser>(`/users`, user);
export const getUserInfo = () => http.get<IUser>(`/users/info`);
export const getUsers = () => http.get<IUser[]>(`/users`);
export const getUser = (id: number) => http.get<IUser>(`/users/${id}`);
export const updateUser = (user: IUser) => http.put(`/users`, user);
export const deleteUser = (id: number) => http.delete(`/users/${id}`);
