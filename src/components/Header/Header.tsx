import { useApp } from '@/common/store/AppContext'
import './header.css'
import { menus } from './header.i'
import HeaderItems, { IHeaderItems } from './HeaderItems'
import { EUrl } from '@/common/constant'
import { useEffect, useState } from 'react'

function Header() {
  const [mn, setMn] = useState<IHeaderItems[]>([])
  const { isAdmin, userLogin } = useApp()
  const isShowLinkOnMenu = userLogin?.linkOnLimit && Number(userLogin?.linkOnLimit) > 0
  const isShowLinkOffMenu = userLogin?.linkOffLimit && Number(userLogin?.linkOffLimit ) > 0
  const isShowLinkOnHideMenu = userLogin?.linkOnHideLimit && Number(userLogin?.linkOnHideLimit ) > 0
  const isShowLinkOffHideMenu = userLogin?.linkOffHideLimit && Number(userLogin?.linkOffHideLimit ) > 0

  useEffect(() => {
    if (isAdmin) {
      setMn([
        ...menus,
        {
          urlName: EUrl.TOKEN,
          name: 'Token',
          className: 'fas fa-shield-alt',
        },
        {
          urlName: EUrl.PROXY,
          name: 'Proxy',
          className: 'fas fa-network-wired',
        },
        {
          urlName: EUrl.ADMIN,
          name: 'Admin',
          className: 'fas fa-cogs',
        },
        {
          urlName: EUrl.VPS,
          name: 'Vps',
          className: 'fas fa-cogs',
        },
        {
          urlName: EUrl.LOGOUT,
          name: 'Đăng xuất',
          className: 'fas fa-user',
        },
      ])
    } else {
      let mns = [...menus]
      if (!isShowLinkOnMenu) {
        mns = mns.filter(item => item.urlName !== EUrl.LINK_ON)
      }
      if (!isShowLinkOffMenu) {
        mns = mns.filter(item => item.urlName !== EUrl.LINK_OFF)
      }
      if (!isShowLinkOnHideMenu) {
        mns = mns.filter(item => item.urlName !== EUrl.LINK_ON_HIDE)
      }
      if (!isShowLinkOffHideMenu) {
        mns = mns.filter(item => item.urlName !== EUrl.LINK_OFF_HIDE)
      }

      setMn([
        ...mns,
        {
          urlName: EUrl.LOGOUT,
          name: 'Đăng xuất',
          className: 'fas fa-user',
        },
      ])
    }
  }, [isAdmin, userLogin])

  return (
    <ul
      className='nav nav-pills mb-3 justify-content-center'
      id='pills-tab'
      role='tablist'
    >
      {mn.map((item: IHeaderItems, i) => {
        return (
          <HeaderItems
            key={i}
            className={item.className}
            urlName={item.urlName}
            name={item.name}
          />
        )
      })}
    </ul>
  )
}

export default Header
