export interface IUser {
    id: number
    username: string
    expiredAt: string
    linkOnLimit?: number
    linkOffLimit?: number
    password?: string
    level: number
    createdAt: string
}

export enum Level {
    ADMIN = 1,
    USER = 0,
}

export interface IUserLogin {
    totalPublic: number
    totalPrivate: number
    totalPublicRunning: number
    totalPrivateRunning: number
}


export interface ICurrentUserLogin extends IUserLogin, IUser { }