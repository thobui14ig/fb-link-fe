export interface IUser {
    id: number;
    email: string;
    expiredAt: string;
    linkAddLimit?: number;
    linkStartLimit?: number;
    password?: string;
    level: number;
    createdAt: string;
}

export enum Level {
    ADMIN = 1,
    USER = 0
}