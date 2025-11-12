import { ILink } from './link'
import { IUser } from './user'

export interface IReaction {
  id: number
  uid?: string
  name?: string
  postId?: string,
  timeCreated?: Date
  linkId: number
  link: ILink
  user: IUser
}