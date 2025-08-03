import { createPages } from '@/api/page.api'
import { IModalReloadProps } from '@/common/interface'
import { closeModal } from '@/common/utils/bootstrap'
import { customErrorToast } from '@/common/utils/toast'
import { useState } from 'react'
import { toast } from 'react-toastify'

function ModalAddPage({ isReload, setIsReload }: IModalReloadProps) {
  const [pages, setPages] = useState<string>('')

  const addPages = async () => {
    if (pages.length === 0) {
      toast.error('Nội dung không được trống!')
      return
    }
    const pagesValid = pages
      .split('\n')
      .map((proxie) => proxie.trim())
      .filter((proxie) => proxie.length > 0)
      .map((item) => {
        return item
      })

    try {
      const response = await createPages({ pages: pagesValid })
      setIsReload(!isReload)
      setPages('')
      closeModal('addProxyModal')
      toast((response.data as any).message)
    } catch (error) {
      customErrorToast(error)
    }
  }

  return (
    <div
      className='modal fade'
      id='addProxyModal'
      tabIndex={-1}
      aria-labelledby='addProxyModalLabel'
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
              id='addProxyModalLabel'
              style={{ color: '#ffc107' }}
            >
              Thêm Page
            </h5>
            <button
              type='button'
              className='btn-close btn-close-white'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body'>
            <form id='addProxyForm'>
              <div className='mb-3'>
                <label
                  htmlFor='proxyTextarea'
                  className='form-label'
                >
                  Page data (mỗi page một dòng)
                </label>
                <textarea
                  className='form-control'
                  id='keywordTextarea'
                  rows={5}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setPages(e.target.value)
                  }}
                  required
                  value={pages}
                  style={{
                    backgroundColor: '#333',
                    color: '#fff',
                    border: '1px solid #444',
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
              onClick={() => setPages('')}
            >
              Đóng
            </button>
            <button
              type='button'
              className='btn btn-warning'
              onClick={() => addPages()}
            >
              Thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalAddPage
