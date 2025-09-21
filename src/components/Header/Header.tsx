import { EUrl } from '@/common/constant'
import { useApp } from '@/common/store/AppContext'
import { useNavigate } from 'react-router-dom'
import './header.css'

function Header() {
  const navigation = useNavigate()
  // const [_, _] = useState<IHeaderItems[]>([])
  const { isAdmin, userLogin, logOut } = useApp()
  const isShowLinkOnMenu =
    userLogin?.linkOnLimit && Number(userLogin?.linkOnLimit) > 0
  const isShowLinkOffMenu =
    userLogin?.linkOffLimit && Number(userLogin?.linkOffLimit) > 0
  const isShowLinkOnHideMenu =
    userLogin?.linkOnHideLimit && Number(userLogin?.linkOnHideLimit) > 0
  const isShowLinkOffHideMenu =
    userLogin?.linkOffHideLimit && Number(userLogin?.linkOffHideLimit) > 0

  // useEffect(() => {
  //   if (isAdmin) {
  //     setMn([
  //       ...menus,
  //       {
  //         urlName: EUrl.TOKEN,
  //         name: 'Token',
  //         className: 'fas fa-shield-alt',
  //       },
  //       {
  //         urlName: EUrl.PROXY,
  //         name: 'Proxy',
  //         className: 'fas fa-network-wired',
  //       },
  //       {
  //         urlName: EUrl.ADMIN,
  //         name: 'Admin',
  //         className: 'fas fa-cogs',
  //       },
  //       {
  //         urlName: EUrl.VPS,
  //         name: 'Vps',
  //         className: 'fas fa-cogs',
  //       },
  //       {
  //         urlName: EUrl.LOGOUT,
  //         name: 'Đăng xuất',
  //         className: 'fas fa-user',
  //       },
  //     ])
  //   } else {
  //     let mns = [...menus]
  //     if (!isShowLinkOnMenu) {
  //       mns = mns.filter(item => item.urlName !== EUrl.LINK_ON)
  //     }
  //     if (!isShowLinkOffMenu) {
  //       mns = mns.filter(item => item.urlName !== EUrl.LINK_OFF)
  //     }
  //     if (!isShowLinkOnHideMenu) {
  //       mns = mns.filter(item => item.urlName !== EUrl.LINK_ON_HIDE)
  //     }
  //     if (!isShowLinkOffHideMenu) {
  //       mns = mns.filter(item => item.urlName !== EUrl.LINK_OFF_HIDE)
  //     }

  //     setMn([
  //       ...mns,
  //       {
  //         urlName: EUrl.LOGOUT,
  //         name: 'Đăng xuất',
  //         className: 'fas fa-user',
  //       },
  //     ])
  //   }
  // }, [isAdmin, userLogin])

  const redirect = (value: string) => {
    if (value === EUrl.LOGOUT) {
      logOut()
      navigation(`/${EUrl.LOGIN}`)
      return
    }
    navigation(`/${value}`)
  }

  const dropdown = () => {
    const x = document.getElementById('myTopnav')
    if (x) {
      if (x.className === 'topnav') {
        x.className += ' responsive'
      } else {
        x.className = 'topnav'
      }
    }
  }

  return (
    <div
      className='topnav'
      id='myTopnav'
    >
      <div>
        <span
          className='icon'
          onClick={dropdown}
        >
          <i className='fa fa-bars'></i>
        </span>
        <span onClick={() => redirect(EUrl.USERS)}>Users</span>
        {isAdmin || (isShowLinkOnMenu && isShowLinkOffMenu) ? (
          <span className='dropdown'>
            <label>Link Crawl</label>
            <div className='dropdown-content'>
              {((!isAdmin && isShowLinkOnMenu) || isAdmin) && (
                <a onClick={() => redirect(EUrl.LINK_ON)}>Link Scan</a>
              )}
              {((!isAdmin && isShowLinkOffMenu) || isAdmin) && (
                <a onClick={() => redirect(EUrl.LINK_OFF)}>Link Follow</a>
              )}
            </div>
          </span>
        ) : (
          ''
        )}
        {isAdmin || (isShowLinkOnHideMenu && isShowLinkOffHideMenu) ? (
          <span className='dropdown'>
            <label>Link Hide</label>
            <div className='dropdown-content'>
              {((!isAdmin && isShowLinkOnHideMenu) || isAdmin) && (
                <a onClick={() => redirect(EUrl.LINK_ON_HIDE)}>
                  Link Hide Scan
                </a>
              )}
              {((!isAdmin && isShowLinkOffHideMenu) || isAdmin) && (
                <a onClick={() => redirect(EUrl.LINK_OFF_HIDE)}>
                  Link Hide Follow
                </a>
              )}
            </div>
          </span>
        ) : (
          ''
        )}
        {isAdmin && (
          <span onClick={() => redirect(EUrl.LINK_DELETED)}>Link Deleted</span>
        )}
        <span className='dropdown'>
          <label>Comments</label>
          <div className='dropdown-content'>
            <a onClick={() => redirect(EUrl.COMMENT)}>Comment Crawl</a>
            <a onClick={() => redirect(EUrl.COMMENT_HIDE)}>Comment Hide</a>
          </div>
        </span>
        {isAdmin || (isShowLinkOnHideMenu && isShowLinkOffHideMenu) ? (
          <span onClick={() => redirect(EUrl.COOKIE)}>Cookie</span>
        ) : (
          ''
        )}
        {isAdmin || (isShowLinkOnHideMenu && isShowLinkOffHideMenu) ? (
          <span onClick={() => redirect(EUrl.PAGE)}>Page</span>
        ) : (
          ''
        )}

        {isAdmin && (
          <>
            <span onClick={() => redirect(EUrl.TOKEN)}>Token</span>
            <span onClick={() => redirect(EUrl.PROXY)}>Proxy</span>
            <span onClick={() => redirect(EUrl.ADMIN)}>Admin</span>
            <span onClick={() => redirect(EUrl.VPS)}>Vps</span>
          </>
        )}
      </div>
      <span
        onClick={() => redirect(EUrl.LOGOUT)}
        style={{ float: 'right', cursor: 'pointer' }}
      >
        Logout
      </span>
    </div>
  )
}

export default Header
