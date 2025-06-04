import { ELink, LinkStatus } from '../model/link'

const getTypeLink = (type: ELink) => {
    return type === ELink.LINK_ON
        ? LinkStatus.Started
        : type === ELink.LINK_OFF
            ? LinkStatus.Pending
            : LinkStatus.Hide
}

export { getTypeLink }
