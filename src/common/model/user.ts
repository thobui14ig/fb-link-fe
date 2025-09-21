export interface IUser {
  id: number
  username: string
  expiredAt: string
  linkOnLimit?: number
  linkOffLimit?: number
  linkOnHideLimit?: number
  linkOffHideLimit?: number
  password?: string
  level: number
  createdAt: string
  delayOnPrivate?: number
  delayOnPublic?: number
  getPhone: boolean
  accountFbUuid: string
  totalComments: number
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
  totalLinkOn: number
  totalLinkOff: number
  totalLinkOnHide: number
  totalLinkOffHide: number
}

export interface ICurrentUserLogin extends IUserLogin, IUser {}
