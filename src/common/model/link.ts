import { IUser } from './user'

export enum ELink {
    LINK_OFF = 'linkOff',
    LINK_ON = 'linkOn',
}

export enum LinkStatus {
    Pending = 'pending',
    Started = 'started',
}

export type Type = 'die' | 'undefined' | 'public' | 'private'
export interface ILink {
    id?: number
    userId: number
    linkName: string
    linkUrl: string
    postId: string | null
    lastCommentTime: Date | null
    commentCount: number
    delayTime: number
    like: number
    status: LinkStatus
    type: Type
    errorMessage?: string
    process?: boolean
    createdAt?: Date
    user: IUser
}
