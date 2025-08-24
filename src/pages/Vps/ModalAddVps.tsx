import { createVps } from '@/api/vps.api'
import { IModalReloadProps } from '@/common/interface'
import { closeModal } from '@/common/utils/bootstrap'
import { customErrorToast } from '@/common/utils/toast'
import { useState } from 'react'
import { toast } from 'react-toastify'

function ModalAddVps({ isReload, setIsReload }: IModalReloadProps) {
  const [vps, setVps] = useState<string>('')

  const addPages = async () => {
    if (vps.length === 0) {
      toast.error('Nội dung không được trống!')
      return
    }
    const vpsValid = vps
      .split('\n')
      .map((proxie) => proxie.trim())
      .filter((proxie) => proxie.length > 0)
      .map((item) => {
        return item
      })

    try {
      const response = await createVps({ vps: vpsValid })
      setIsReload(!isReload)
      setVps('')
      closeModal('addVpsModal')
      toast((response.data as any).message)
    } catch (error) {
      customErrorToast(error)
    }
  }

  return (
    <div
      className='modal fade'
      id='addVpsModal'
      tabIndex={-1}
      aria-labelledby='addVpsModalLabel'
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
              id='addVpsModalLabel'
              style={{ color: '#ffc107' }}
            >
              Thêm Service
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
                  Vd: 160.25.232.64:2000 (mỗi service một dòng)
                </label>
                <textarea
                  className='form-control'
                  id='keywordTextarea'
                  rows={5}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setVps(e.target.value)
                  }}
                  required
                  value={vps}
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
              onClick={() => setVps('')}
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

export default ModalAddVps
