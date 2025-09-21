import { IPage } from './page'
import { IUser } from './user'

export enum CookieStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  LIMIT = 'limit',
  DIE = 'die',
}

export interface ICookie {
  id: number
  cookie: string
  status: CookieStatus
  pageId: number
  user: IUser
  page: IPage
}
