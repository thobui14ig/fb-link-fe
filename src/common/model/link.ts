import { EKeyHideCmt } from '@/components/Link/LinkComponent'
import { IUser } from './user'
import { IKeyword } from './keyword'

export enum ELink {
    LINK_OFF = 'linkOff',
    LINK_ON = 'linkOn',
    LINK_ON_HIDE = 'linkOnHide',
    LINK_OFF_HIDE = 'linkOffHide',
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
    hideBy: EKeyHideCmt,
    createdAt?: Date
    user: IUser,
    keywords: IKeyword[],
    content: string
}
