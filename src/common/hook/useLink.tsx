import {
  createLink,
  getLink as getLinkApi,
  getLinks as getLinksApi,
} from '@/api/link.api'
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
      status: type === ELink.LINK_ON ? LinkStatus.Started : LinkStatus.Pending,
    }
    return createLink(argCreate)
  }

  const getLinks = async (status: LinkStatus) => {
    const { data } = await getLinksApi(status)
    return data
  }

  const getLink = async (id: number) => {
    const { data } = await getLinkApi(id)
    return data
  }

  return { addLink, getLinks, getLink }
}

export default useLink
