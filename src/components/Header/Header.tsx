import { useApp } from '@/common/store/AppContext'
import './header.css'
import { menus } from './header.i'
import HeaderItems, { IHeaderItems } from './HeaderItems'
import { EUrl } from '@/common/constant'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Header() {
  const navigation = useNavigate();
  const [mn, setMn] = useState<IHeaderItems[]>([])
  const { isAdmin, userLogin, logOut } = useApp()
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

  const redirect = (value: string) => {
      if (value === EUrl.LOGOUT) {
          logOut()
          navigation(`/${EUrl.LOGIN}`)
          return
      }
      navigation(`/${value}`);
  }

  return (
    // <ul
    //   className='nav nav-pills mb-3 justify-content-center'
    //   id='pills-tab'
    //   role='tablist'
    // >
    //   {mn.map((item: IHeaderItems, i) => {
    //     return (
    //       <HeaderItems
    //         key={i}
    //         className={item.className}
    //         urlName={item.urlName}
    //         name={item.name}
    //       />
    //     )
    //   })}
    // </ul>
    <div className="w3-bar headers m-2">
      <div>
        <div className="w3-bar-item w3-button w3-large header-item" onClick={() => redirect(EUrl.USERS)}>Users</div>
        <div className="w3-dropdown-hover header-item">
          <button className="w3-button w3-large header-item">Links</button>
          <div className="w3-dropdown-content w3-bar-block w3-card-4">
            <div className="w3-bar-item w3-button w3-large" onClick={() => redirect(EUrl.LINK_ON)}>Link On</div>
            <div className="w3-bar-item w3-button w3-large" onClick={() => redirect(EUrl.LINK_OFF)}>Link Off</div>
            <div className="w3-bar-item w3-button w3-large" onClick={() => redirect(EUrl.LINK_ON_HIDE)}>Link On Hide</div>
            <div className="w3-bar-item w3-button w3-large" onClick={() => redirect(EUrl.LINK_OFF_HIDE)}>Link Off Hide</div>
              
          </div>
        </div>
        <div className="w3-dropdown-hover header-item">
          <button className="w3-button w3-large header-item">Comments</button>
          <div className="w3-dropdown-content w3-bar-block w3-card-4">
            <div className="w3-bar-item w3-button w3-large " onClick={() => redirect(EUrl.COMMENT)}>Comment On</div>
            <div className="w3-bar-item w3-button w3-large " onClick={() => redirect(EUrl.COMMENT_HIDE)}>Comment Hide</div>
          </div>
        </div>
        <div className="w3-bar-item w3-button w3-large header-item" onClick={() => redirect(EUrl.COOKIE)}>Cookie</div>
        <div className="w3-bar-item w3-button w3-large header-item" onClick={() => redirect(EUrl.PAGE)} >Page</div>
        <div className="w3-bar-item w3-button w3-large header-item" onClick={() => redirect(EUrl.TOKEN)}>Token</div>
        <div className="w3-bar-item w3-button w3-large header-item" onClick={() => redirect(EUrl.PROXY)}>Proxy</div>
        <div className="w3-bar-item w3-button w3-large header-item" onClick={() => redirect(EUrl.ADMIN)}>Admin</div>
        <div className="w3-bar-item w3-button w3-large header-item" onClick={() => redirect(EUrl.VPS)}>Vps</div>        
      </div>
      <div className="w3-bar-item w3-large logout">Logout</div>     

  </div>
  )
}

export default Header
