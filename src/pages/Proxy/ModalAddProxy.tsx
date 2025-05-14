import { createProxies } from '@/api/proxy.api'
import { IModalReloadProps } from '@/common/interface'
import { closeModal } from '@/common/utils/bootstrap'
import { customErrorToast } from '@/common/utils/toast'
import { useState } from 'react'
import { toast } from 'react-toastify'

function ModalAddProxy({ isReload, setIsReload }: IModalReloadProps) {
  const [proxies, setProxies] = useState<string>('')

  const addProxies = async () => {
    if (proxies.length === 0) {
      toast.error('Nội dung không được trống!')
      return
    }
    const proxiesValid = proxies
      .split('\n')
      .map((proxie) => proxie.trim())
      .filter((proxie) => proxie.length > 0)
      .map((item) => {
        return item
      })

    try {
      const response = await createProxies({ proxies: proxiesValid })
      setIsReload(!isReload)
      setProxies('')
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
              Thêm Proxy
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
                  Proxy Data (mỗi proxy một dòng)
                </label>
                <textarea
                  className='form-control'
                  id='keywordTextarea'
                  rows={5}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setProxies(e.target.value)
                  }}
                  required
                  value={proxies}
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
              onClick={() => setProxies('')}
            >
              Đóng
            </button>
            <button
              type='button'
              className='btn btn-warning'
              onClick={() => addProxies()}
            >
              Thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalAddProxy
