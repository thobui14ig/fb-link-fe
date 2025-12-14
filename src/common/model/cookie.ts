import { IPage } from './page'
import { IUser } from './user'

export enum CookieStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  LIMIT = 'limit',
  DIE = 'die',
}

export enum CookieHandle {
  CRAWL_CMT = 1,
  GET_UID = 2,
}

export interface ICookie {
  id: number
  cookie: string
  status: CookieStatus
  pageId: number
  user: IUser
  page: IPage
  type: CookieHandle
}
