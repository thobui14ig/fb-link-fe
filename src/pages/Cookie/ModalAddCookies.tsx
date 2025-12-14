import { createCookies } from '@/api/cookie.api'
import { getPages } from '@/api/page.api'
import { IModalReloadProps } from '@/common/interface'
import { CookieHandle } from '@/common/model/cookie'
import { IPage } from '@/common/model/page'
import { useApp } from '@/common/store/AppContext'
import { closeModal } from '@/common/utils/bootstrap'
import { customErrorToast } from '@/common/utils/toast'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function ModalAddCookies({ isReload, setIsReload }: IModalReloadProps) {
  const { isAdmin } = useApp()
  const [cookies, setCookies] = useState<string>('')
  const [pages, setPages] = useState<IPage[]>([])
  const [pageId, setPageId] = useState<number | null>(null)
  const [type, setType] = useState<CookieHandle>(CookieHandle.CRAWL_CMT)

  useEffect(() => {
    ;(async () => {
      const { data: resPages } = await getPages()
      setPages(resPages)
      setPageId(resPages.length > 0 ? resPages[0].id : null)
    })()
  }, [])

  const addCookies = async () => {
    if (cookies.length === 0) {
      toast.error('Nội dung không được trống!')
      return
    }
    if (!isAdmin && !pageId) {
      toast.error('Chưa chọn page!')
      return
    }
    const cookiesValid = cookies
      .split('\n')
      .map((cookie) => cookie.trim())
      .filter((cookie) => cookie.length > 0)
      .map((item) => {
        return item
      })

    try {
      await createCookies({
        cookies: cookiesValid,
        pageId: isAdmin ? null : pageId,
        type,
      })
      setIsReload(!isReload)
      setCookies('')
      closeModal('addCookieModal')
      toast('Thêm thành công!')
    } catch (error) {
      customErrorToast(error)
    }
  }

  return (
    <div
      className='modal fade'
      id='addCookieModal'
      tabIndex={-1}
      aria-labelledby='addCookieModalLabel'
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
              id='addCookieModalLabel'
              style={{ color: '#ffc107' }}
            >
              Thêm Cookie
            </h5>
            <button
              type='button'
              className='btn-close btn-close-white'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body'>
            <form id='addCookieForm'>
              <div className='mb-3'>
                <label
                  htmlFor='cookieTextarea'
                  className='form-label'
                >
                  Cookie Data (mỗi cookie một dòng)
                </label>
                <textarea
                  className='form-control'
                  id='keywordTextarea'
                  rows={8}
                  style={{
                    backgroundColor: '#333',
                    color: '#fff',
                    border: '1px solid #444',
                  }}
                  value={cookies}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setCookies(e.target.value)
                  }}
                ></textarea>
              </div>
              {!isAdmin && (
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
                      setPageId(Number(e.target.value))
                    }}
                    value={pageId ?? 0}
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
              {isAdmin && (
                <div className='mb-3'>
                  <label
                    htmlFor='editLevel'
                    className='form-label'
                  >
                    Type
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
                      setType(Number(e.target.value))
                    }}
                    value={type}
                  >
                    <option value={1}>Crawl cmt</option>
                    <option value={2}>Get like</option>
                  </select>
                </div>
              )}
            </form>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              data-bs-dismiss='modal'
              onClick={() => setCookies('')}
            >
              Đóng
            </button>
            <button
              type='button'
              className='btn btn-warning'
              onClick={() => addCookies()}
            >
              Thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalAddCookies
