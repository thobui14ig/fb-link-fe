import { updateLink } from '@/api/link.api'
import useLink from '@/common/hook/useLink'
import { useApp } from '@/common/store/AppContext'
import { closeModal } from '@/common/utils/bootstrap'
import { customErrorToast } from '@/common/utils/toast'
import { ILink, Type } from '@/common/model/link'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { IModalReloadProps } from '@/common/interface'

interface IModalEditLink extends IModalReloadProps {
  linkEditId: number | null
}
function ModalEditLink({ linkEditId, isReload, setIsReload }: IModalEditLink) {
  const { getLink } = useLink()
  const { isAdmin } = useApp()
  const [link, setLink] = useState<Omit<Partial<ILink>, 'user'> | null>(null)

  useEffect(() => {
    ;(async () => {
      if (linkEditId) {
        const data = await getLink(linkEditId)
        setLink(data)
      }
    })()
  }, [linkEditId])

  const saveEdit = async () => {
    try {
      if (link) {
        await updateLink(link)
        setIsReload(!isReload)
        toast('Update thành công!')
        closeModal('editLinkModal')
      }
    } catch (error) {
      customErrorToast(error)
    }
  }

  return (
    <div
      className='modal fade'
      id='editLinkModal'
      tabIndex={-1}
      aria-labelledby='editLinkModalLabel'
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
              id='editLinkModalLabel'
              style={{ color: '#ffc107' }}
            >
              Sửa Link
            </h5>
            <button
              type='button'
              className='btn-close btn-close-white'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body'>
            <form id='editLinkForm'>
              <input
                type='hidden'
                id='editLinkId'
              />
              <div className='mb-3'>
                <label
                  htmlFor='editLinkName'
                  className='form-label'
                >
                  Tên Link
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='editLinkName'
                  value={link?.linkName}
                  style={{
                    backgroundColor: '#333',
                    color: '#fff',
                    border: '1px solid #444',
                  }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setLink({
                      ...link,
                      linkName: e.target.value,
                    })
                  }}
                />
              </div>

              <div className='mb-3'>
                <label
                  htmlFor='editPostId'
                  className='form-label'
                >
                  ID Bài Viết
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='editPostId'
                  readOnly
                  value={link?.postId ?? ''}
                  style={{
                    backgroundColor: '#333',
                    color: '#fff',
                    border: '1px solid #444',
                  }}
                />
              </div>
              {isAdmin && (
                <>
                  <div className='mb-3'>
                    <label
                      htmlFor='editLinkType'
                      className='form-label'
                    >
                      Loại Link
                    </label>
                    <select
                      className='form-control'
                      id='editLinkType'
                      style={{
                        backgroundColor: '#333',
                        color: '#fff',
                        border: '1px solid #444',
                      }}
                      value={link?.type}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setLink({
                          ...link,
                          type: e.target.value as Type,
                        })
                      }}
                    >
                      <option value='public'>Public</option>
                      <option value='private'>Private</option>
                    </select>
                  </div>

                  <div className='mb-3'>
                    <label
                      htmlFor='editDelayTime'
                      className='form-label'
                    >
                      Delay Time (giây)
                    </label>
                    <input
                      type='number'
                      className='form-control'
                      id='editDelayTime'
                      value={link?.delayTime}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setLink({
                          ...link,
                          delayTime: Number(e.target.value),
                        })
                      }}
                      style={{
                        backgroundColor: '#333',
                        color: '#fff',
                        border: '1px solid #444',
                      }}
                      min='0'
                    />
                  </div>
                </>
              )}
            </form>
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
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalEditLink
