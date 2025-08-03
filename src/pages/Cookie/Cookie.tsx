import { Tab } from '@/common/constant'
import useTab from '@/common/hook/useTab'
import './cookie.css'
import { useEffect, useState } from 'react'
import { CookieStatus, ICookie } from '@/common/model/cookie'
import { deleteCookie, getCookies, updateCookie } from '@/api/cookie.api'
import ModalAddCookies from './ModalAddCookies'
import ModalEditCookie from './ModalEditCookie'
import { toast } from 'react-toastify'
import { customErrorToast } from '@/common/utils/toast'
import copy from 'copy-to-clipboard'

function Cookie() {
  const { active } = useTab()
  const [cookies, setCookies] = useState<ICookie[]>([])
  const [isReload, setIsReload] = useState<boolean>(false)
  const [linkEditId, setLinkEditId] = useState<number | null>(null)

  const handleDeleteCookie = async (id: number) => {
    try {
      await deleteCookie(id)
      setIsReload(!isReload)
      toast('Xóa thành công!')
    } catch (error) {
      customErrorToast(error)
    }
  }

  const updateStatus = async (cookie: ICookie, status: CookieStatus) => {
    try {
      await updateCookie({ ...cookie, status }, cookie.id)
      setIsReload(!isReload)
      toast('Update thành công!')
    } catch (error) {
      customErrorToast(error)
    }
  }

  useEffect(() => {
    const fetch = async () => {
      const { data } = await getCookies()
      setCookies(data)
    }

    fetch()
  }, [isReload])
  return (
    <div
      className={`tab-pane fade ${active(Tab.COOKIE)}`}
      id='pills-linksOn'
      role='tabpanel'
      aria-labelledby='pills-linksOn-tab'
    >
      <div
        className='card p-3'
        style={{ backgroundColor: '#1a1a1a', color: '#fff' }}
      >
        <h5
          className='text-center mb-4'
          style={{ color: '#ffc107' }}
        >
          Danh sách Cookie
        </h5>

        <div className='mb-3 text-center'>
          <button
            className='btn btn-warning'
            data-bs-toggle='modal'
            data-bs-target='#addCookieModal'
          >
            Thêm Cookie
          </button>
        </div>

        <div className='table-responsive'>
          <table className='table table-striped table-dark'>
            <thead>
              <tr>
                <th className='col-stt'>STT</th>
                <th className='col-cookie'>Cookie</th>
                <th className='col-status'>Page</th>
                <th className='col-status'>Status</th>
                <th className='col-action'>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {cookies.length > 0 &&
                cookies.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td className='col-stt'>{i + 1}</td>
                      <td className='col-cookie'>{item.cookie}</td>
                      <td className='col-status'>{item?.page?.name}</td>
                      <td className='col-status'>{item.status}</td>
                      <td className='nowrap'>
                        <div className='dropdown'>
                          <button
                            className='btn btn-sm btn-secondary dropdown-toggle'
                            type='button'
                            data-bs-toggle='dropdown'
                            aria-expanded='false'
                          >
                            <i className='fas fa-cog'></i>
                          </button>
                          <ul className='dropdown-menu dropdown-menu-dark'>
                            <li>
                              <button
                                className='dropdown-item btn btn-sm btn-warning'
                                onClick={() =>
                                  updateStatus(item, CookieStatus.INACTIVE)
                                }
                              >
                                Tắt
                              </button>
                              <button
                                className='dropdown-item btn btn-sm btn-primary'
                                onClick={() =>
                                  updateStatus(item, CookieStatus.ACTIVE)
                                }
                              >
                                Bật
                              </button>
                            </li>
                            <li>
                              <button
                                className='dropdown-item btn btn-sm btn-primary'
                                data-bs-toggle='modal'
                                data-bs-target='#editCookieModal'
                                onClick={() => setLinkEditId(item.id)}
                              >
                                Sửa
                              </button>
                            </li>
                            <li>
                              <button
                                className='dropdown-item btn btn-sm btn-warning'
                                onClick={() => handleDeleteCookie(item.id)}
                              >
                                Xóa
                              </button>
                            </li>
                            <li>
                              <button
                                className='dropdown-item btn btn-sm btn-warning'
                                onClick={() => {
                                  copy(item.cookie)
                                  toast.success('Copy thành công')
                                }}
                              >
                                Copy
                              </button>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
        <ModalAddCookies
          isReload={isReload}
          setIsReload={setIsReload}
        />
        <ModalEditCookie
          setIsReload={setIsReload}
          isReload={isReload}
          linkEditId={linkEditId}
        />
      </div>
    </div>
  )
}

export default Cookie
