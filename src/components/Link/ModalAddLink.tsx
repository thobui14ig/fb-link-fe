import useLink from '@/common/hook/useLink'
import { IModalReloadProps } from '@/common/interface'
import { ELink } from '@/common/model/link'
import { closeModal } from '@/common/utils/bootstrap'
import { customErrorToast } from '@/common/utils/toast'
import { useState } from 'react'
import { toast } from 'react-toastify'

interface IPropsmodalAddLink extends IModalReloadProps {
  type: ELink
}
function ModalAddLink({ isReload, setIsReload, type }: IPropsmodalAddLink) {
  const [link, setLink] = useState<string>('')
  const { addLink } = useLink()

  const handleAddLink = async () => {
    if (link.length === 0) {
      toast.error('Nội dung không được trống!')
      return
    }

    try {
      const response = await addLink(link, type)
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
