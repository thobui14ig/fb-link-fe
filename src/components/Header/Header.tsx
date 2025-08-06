import { useApp } from '@/common/store/AppContext'
import './header.css'
import { menus } from './header.i'
import HeaderItems, { IHeaderItems } from './HeaderItems'
import { EUrl } from '@/common/constant'
import { useEffect, useState } from 'react'

function Header() {
  const [mn, setMn] = useState<IHeaderItems[]>([])
  const { isAdmin } = useApp()
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
          urlName: EUrl.LOGOUT,
          name: 'Đăng xuất',
          className: 'fas fa-user',
        },
      ])
    } else {
      setMn([
        ...menus,
        {
          urlName: EUrl.PAGE,
          name: 'Quản lý page',
          className: 'fas fa-user',
        },
        {
          urlName: EUrl.LOGOUT,
          name: 'Đăng xuất',
          className: 'fas fa-user',
        },
      ])
    }
  }, [isAdmin])

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
