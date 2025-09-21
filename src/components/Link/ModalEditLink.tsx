import { updateLink } from '@/api/link.api'
import useLink from '@/common/hook/useLink'
import { useApp } from '@/common/store/AppContext'
import { closeModal } from '@/common/utils/bootstrap'
import { customErrorToast } from '@/common/utils/toast'
import { ELink, ILink, Type } from '@/common/model/link'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { IModalReloadProps } from '@/common/interface'
import { isLinkHide } from '@/common/utils'
import { IPage } from '@/common/model/page'
import { getPages } from '@/api/page.api'

interface IModalEditLink extends IModalReloadProps {
  linkEditId: number | null
  type: ELink
  links: ILink[]
  setLinks: any
}
function ModalEditLink({ linkEditId, type, links, setLinks }: IModalEditLink) {
  const { getLink } = useLink()
  const { isAdmin } = useApp()
  const [pages, setPages] = useState<IPage[]>([])
  const [link, setLink] = useState<Omit<Partial<ILink>, 'user'> | null>(null)

  useEffect(() => {
    ;(async () => {
      if (linkEditId) {
        const data = await getLink(linkEditId)
        const { data: resPages } = await getPages()
        setLink(data)
        setPages(resPages)
      }
    })()
  }, [linkEditId])

  const saveEdit = async () => {
    try {
      if (link) {
        link.delayTime = Number(link.delayTime)
        const currentLink = links.find((item) => item.id === link.id)
        if (currentLink) {
          currentLink.linkName = link.linkName as string
          currentLink.type = link.type as Type
          currentLink.delayTime = link.delayTime
          setLinks([...links])
        }
        toast('Update thành công!')
        await updateLink(link)
        // setIsReload(!isReload)
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

              {link?.hideCmt && link.tablePageId && (
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
                      setLink({
                        ...link,
                        tablePageId: Number(e.target.value),
                      })
                    }}
                    value={link.tablePageId}
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

              {isAdmin && isLinkHide(type) && (
                <div className='mb-3'>
                  <label
                    htmlFor='editPostId'
                    className='form-label'
                  >
                    Thread
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='editPostId'
                    value={link?.thread ?? 1}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setLink({
                        ...link,
                        thread: Number(e.target.value),
                      })
                    }}
                    style={{
                      backgroundColor: '#333',
                      color: '#fff',
                      border: '1px solid #444',
                    }}
                  />
                </div>
              )}

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
                      className='form-control'
                      id='editDelayTime'
                      value={link?.delayTime}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setLink({
                          ...link,
                          delayTime: e.target.value as any,
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
