import { IComment } from "@/common/model/comment";
import http from "./http";

export const getComments = () => http.get<IComment[]>(`/comments`);