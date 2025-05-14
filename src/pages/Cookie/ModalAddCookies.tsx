import { createCookies } from '@/api/cookie.api'
import { IModalReloadProps } from '@/common/interface'
import { closeModal } from '@/common/utils/bootstrap'
import { customErrorToast } from '@/common/utils/toast'
import { useState } from 'react'
import { toast } from 'react-toastify'

function ModalAddCookies({ isReload, setIsReload }: IModalReloadProps) {
  const [cookies, setCookies] = useState<string>('')

  const addCookies = async () => {
    if (cookies.length === 0) {
      toast.error('Nội dung không được trống!')
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
      await createCookies({ cookies: cookiesValid })
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
