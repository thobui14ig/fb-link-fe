import { createTokens } from '@/api/token.api'
import { IModalReloadProps } from '@/common/interface'
import { ETokenHandleType } from '@/common/model/token'
import { closeModal } from '@/common/utils/bootstrap'
import { customErrorToast } from '@/common/utils/toast'
import { useState } from 'react'
import { toast } from 'react-toastify'

function ModalAddToken({ isReload, setIsReload }: IModalReloadProps) {
  const [tokens, setTokens] = useState<string>('')
  const [type, setType] = useState<ETokenHandleType>(ETokenHandleType.CRAWL_CMT)

  const addTokens = async () => {
    if (tokens.length === 0) {
      toast.error('Nội dung không được trống!')
      return
    }
    const tokensValid = tokens
      .split('\n')
      .map((token) => token.trim())
      .filter((token) => token.length > 0)
      .map((item) => {
        return item
      })

    try {
      toast('Token sẽ được hiển thị sau vài giây')
      setTokens('')
      closeModal('addTokenModal')
      const response = await createTokens({ tokens: tokensValid, type })
      setIsReload(!isReload)
      toast((response.data as any).message)
    } catch (error) {
      customErrorToast(error)
    }
  }

  const handleChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value as unknown as ETokenHandleType)
  }

  return (
    <div
      className='modal fade'
      id='addTokenModal'
      tabIndex={-1}
      aria-labelledby='addTokenModalLabel'
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
              id='addTokenModalLabel'
              style={{ color: '#ffc107' }}
            >
              Thêm Token
            </h5>
            <button
              type='button'
              className='btn-close btn-close-white'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body'>
            <form id='addTokenForm'>
              <div className='mb-3'>
                <label
                  htmlFor='tokenCookieTextarea'
                  className='form-label'
                >
                  Token Data (mỗi token một dòng)
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
                  required
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setTokens(e.target.value)
                  }}
                  value={tokens}
                ></textarea>
              </div>
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
                  onChange={(e) => handleChangeType(e)}
                  value={type}
                >
                  <option value='1'>Get comment</option>
                  <option value='2'>Get info link</option>
                </select>
              </div>
            </form>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              data-bs-dismiss='modal'
              onClick={() => setTokens('')}
            >
              Đóng
            </button>
            <button
              type='button'
              className='btn btn-warning'
              onClick={() => addTokens()}
            >
              Thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalAddToken
