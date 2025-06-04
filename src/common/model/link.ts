import { IUser } from './user'

export enum ELink {
    LINK_OFF = 'linkOff',
    LINK_ON = 'linkOn',
    LINK_HIDE = 'linkHide'
}

export enum LinkStatus {
    Pending = 'pending',
    Started = 'started',
    Hide = 'hide'
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
    countBefore: number
    countAfter: number
    likeBefore: number
    likeAfter: number
    delayTime: number
    like: number
    status: LinkStatus
    type: Type
    errorMessage?: string
    process?: boolean,
    hideCmt: boolean,
    createdAt?: Date
    user: IUser
}
