import { EUrl } from '@/common/constant'
import { IHeaderItems } from './HeaderItems'

export const menus: IHeaderItems[] = [
    {
        urlName: EUrl.USERS,
        name: 'Users',
        className: 'fas fa-users',
    },
    {
        urlName: EUrl.LINK_ON,
        name: 'LinkOn',
        className: 'fas fa-link',
    },
    {
        urlName: EUrl.LINK_OFF,
        name: 'LinkOff',
        className: 'fas fa-link-slash',
    },
    {
        urlName: EUrl.COMMENT,
        name: 'Comments',
        className: 'fas fa-comments',
    },
    {
        urlName: EUrl.COOKIE,
        name: 'Cookie',
        className: 'fas fa-cookie',
    }
]
