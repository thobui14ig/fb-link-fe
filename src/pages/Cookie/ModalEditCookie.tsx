import { getCookie, updateCookie } from '@/api/cookie.api'
import { closeModal } from '@/common/utils/bootstrap'
import { customErrorToast } from '@/common/utils/toast'
import { ICookie } from '@/common/model/cookie'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { IModalReloadProps } from '@/common/interface'
import { IPage } from '@/common/model/page'
import { getPages } from '@/api/page.api'

interface IModalEditCookie extends IModalReloadProps {
  linkEditId: number | null
}

function ModalEditCookie({
  isReload,
  linkEditId,
  setIsReload,
}: IModalEditCookie) {
  const [cookie, setCookie] = useState<ICookie | null>(null)
  const [pages, setPages] = useState<IPage[]>([])

  const saveEdit = async () => {
    try {
      if (cookie) {
        await updateCookie(cookie, cookie.id)
        setIsReload(!isReload)
        toast('Update thành công!')
        closeModal('editCookieModal')
      }
    } catch (error) {
      customErrorToast(error)
    }
  }

  useEffect(() => {
    ;(async () => {
      const { data: resPages } = await getPages()
      setPages(resPages)
    })()
  }, [linkEditId])

  useEffect(() => {
    ;(async () => {
      if (linkEditId) {
        const { data } = await getCookie(linkEditId)
        setCookie(data)
      }
    })()
  }, [linkEditId])

  return (
    <div
      className='modal fade'
      id='editCookieModal'
      tabIndex={-1}
      aria-labelledby='editCookieModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog'>
        <div
          className='modal-content'
          style={{ backgroundColor: '#1a1a1a', color: '#fff' }}
        >
          <div className='modal-header'>
            <h5
              className='modal-title'
              id='editCookieModalLabel'
              style={{ color: '#ffc107' }}
            >
              Sửa Cookie
            </h5>
            <button
              type='button'
              className='btn-close btn-close-white'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body'>
            {cookie && (
              <form id='editCookieForm'>
                <input
                  type='hidden'
                  id='editCookieId'
                />
                <div className='mb-3'>
                  <label
                    htmlFor='editCookieValue'
                    className='form-label'
                  >
                    Cookie Value
                  </label>
                  <textarea
                    className='form-control'
                    id='keywordTextarea'
                    rows={8}
                    required
                    value={cookie.cookie}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                      setCookie({
                        ...cookie,
                        cookie: e.target.value,
                      })
                    }}
                    style={{
                      backgroundColor: '#333',
                      color: '#fff',
                      border: '1px solid #444',
                    }}
                  ></textarea>
                </div>
                <div className='mb-3'>
                  <label
                    htmlFor='editCookieStatus'
                    className='form-label'
                  >
                    Status
                  </label>
                  <select
                    className='form-control'
                    id='editCookieStatus'
                    required
                    style={{
                      backgroundColor: '#333',
                      color: '#fff',
                      border: '1px solid #444',
                    }}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setCookie({
                        ...cookie,
                        status: e.target.value as any,
                      })
                    }}
                  >
                    <option value='active'>Active</option>
                    <option value='inactive'>Inactive</option>
                    <option value='die'>Die</option>
                    <option value='limit'>Limit</option>
                  </select>
                </div>
                {cookie.pageId && (
                  <div className='mb-3'>
                    <label
                      htmlFor='editLevel'
                      className='form-label'
                    >
                      Page
                    </label>
                    <select
                      className='form-control'
                      id='editLevel'
                      name='level'
                      style={{
                        backgroundColor: '#333',
                        color: '#fff',
                        border: '1px solid #444',
                      }}
                      onChange={(e) => {
                        setCookie({
                          ...cookie,
                          pageId: Number(e.target.value),
                        })
                      }}
                      value={cookie.pageId}
                    >
                      {pages.length > 0 &&
                        pages.map((item, i) => {
                          return (
                            <option
                              key={i}
                              value={item.id}
                            >
                              {item.name}
                            </option>
                          )
                        })}
                    </select>
                  </div>
                )}
              </form>
            )}
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              data-bs-dismiss='modal'
            >
              Đóng
            </button>
            <button
              type='button'
              className='btn btn-warning'
              onClick={() => saveEdit()}
            >
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalEditCookie
