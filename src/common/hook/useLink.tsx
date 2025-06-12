import { createLink, getLink as getLinkApi } from '@/api/link.api'
import { ELink, LinkStatus } from '@/common/model/link'

function useLink() {
  const addLink = async (link: string, type: ELink) => {
    const links = link
      .split('\n')
      .map((url) => url.trim())
      .filter((url) => url.length > 0)
      .map((item) => {
        const splitItem = item.split('|')
        return {
          url: splitItem[0],
          name: splitItem[1],
          delayTime: 1,
        }
      })

    const argCreate = {
      links,
      status:
        type === ELink.LINK_ON || type === ELink.LINK_ON_HIDE
          ? LinkStatus.Started
          : LinkStatus.Pending,
      hideCmt:
        type === ELink.LINK_ON_HIDE || type === ELink.LINK_OFF_HIDE
          ? true
          : false,
    }
    return createLink(argCreate)
  }

  const getLink = async (id: number) => {
    const { data } = await getLinkApi(id)
    return data
  }

  return { addLink, getLink }
}

export default useLink
