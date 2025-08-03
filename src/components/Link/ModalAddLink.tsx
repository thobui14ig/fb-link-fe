import { getPages } from '@/api/page.api'
import useLink from '@/common/hook/useLink'
import { IModalReloadProps } from '@/common/interface'
import { ELink } from '@/common/model/link'
import { IPage } from '@/common/model/page'
import { useApp } from '@/common/store/AppContext'
import { isLinkHide } from '@/common/utils'
import { closeModal } from '@/common/utils/bootstrap'
import { customErrorToast } from '@/common/utils/toast'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

interface IPropsmodalAddLink extends IModalReloadProps {
  type: ELink
}
function ModalAddLink({ isReload, setIsReload, type }: IPropsmodalAddLink) {
  const {isAdmin} = useApp()
  const [link, setLink] = useState<string>('')
  const [pageId, setPageId] = useState<number | null>(null)
  const [thread, setThread] = useState<number>(1)
  const { addLink } = useLink()
  const [pages, setPages] = useState<IPage[]>([])

  useEffect(() => {
    ;(async () => {
        const { data: resPages } = await getPages()
        setPages(resPages)
    })()
  }, [])

  const handleAddLink = async () => {
    if (link.length === 0) {
      toast.error('Nội dung không được trống!')
      return
    }

    if (isLinkHide(type) && !pageId) {
      toast.error('Ẩn phải chọn page!')
      return
    }

    try {
      const response = await addLink(link, type, thread, pageId)
      setIsReload(!isReload)
      setLink('')
      toast((response.data as any).message)
      closeModal('addCookieModal')
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
              Thêm link
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
                  Link Data (mỗi link một dòng)
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
                  value={link}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setLink(e.target.value)
                  }}
                ></textarea>
              </div>
              {isAdmin && isLinkHide(type) && 
                <div className='mb-3'>
                  <label
                    htmlFor='link_add_limit'
                    className='form-label'
                  >
                    Thread
                  </label>
                  <input
                    type='number'
                    className='form-control'
                    id='link_add_limit'
                    name='link_add_limit'
                    required
                    value={thread}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setThread(Number(e.target.value))
                    }}
                    style={{
                      backgroundColor: '#333',
                      color: '#fff',
                      border: '1px solid #444',
                    }}
                  />
                </div>                
              }

              {isLinkHide(type) &&
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
                    value={pageId??0}
                  >
                    {pages.length > 0 && 
                      pages.map((item, i) => {
                        return (<option key={i} value={item.id}>{item.name}</option>)
                      })
                    }
    
                  </select>
                </div>              
              }

            </form>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              data-bs-dismiss='modal'
              onClick={() => setLink('')}
            >
              Đóng
            </button>
            <button
              type='button'
              className='btn btn-warning'
              onClick={() => handleAddLink()}
            >
              Thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalAddLink
