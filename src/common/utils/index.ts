import { ELink, LinkStatus } from '../model/link'

const getTypeLink = (type: ELink) => {
  if (type === ELink.LINK_ON || type === ELink.LINK_ON_HIDE) {
    return LinkStatus.Started
  }
  if (type === ELink.LINK_OFF || type === ELink.LINK_OFF_HIDE) {
    return LinkStatus.Pending
  }
  return LinkStatus.Started
}

const isLinkHide = (type: ELink) => {
  return type === ELink.LINK_ON_HIDE || type === ELink.LINK_OFF_HIDE
    ? true
    : false
}

export { getTypeLink, isLinkHide }
