/* eslint-disable @typescript-eslint/no-explicit-any */
import { deleteLink, IGetAllLink, processLink } from '@/api/link.api'
import { ELink, ILink, LinkStatus } from '@/common/model/link'
import { useApp } from '@/common/store/AppContext'
import { customErrorToast } from '@/common/utils/toast'
import { useState } from 'react'
import { toast } from 'react-toastify'
import FilterLink from './FilterLink'
import ModalAddLink from './ModalAddLink'
import ModalEditLink from './ModalEditLink'

export interface ITypeLink {
  type: ELink
}

function LinkComponent({ type }: ITypeLink) {
  const { isAdmin } = useApp()
  // const { getLinks } = useLink()
  const [isReload, setIsReload] = useState<boolean>(false)
  const [links, setLinks] = useState<IGetAllLink[]>([])
  const [linkEditId, setLinkEditId] = useState<number | null>(null)

  // useEffect(() => {
  //   ;(async () => {
  //     const data = await getLinks(
  //       type === ELink.LINK_ON ? LinkStatus.Started : LinkStatus.Pending
  //     )
  //     setLinks(data)
  //   })()
  // }, [isReload])

  const handleDelete = async (id: number) => {
    try {
      await deleteLink(id)
      setIsReload(!isReload)
      toast('Xóa thành công!')
    } catch (error) {
      toast('Lỗi Xóa!')
    }
  }

  const handleEdit = (id: number) => {
    setLinkEditId(id)
  }

  const stopOrStart = async (link: ILink) => {
    try {
      const status =
        link.status === LinkStatus.Started
          ? LinkStatus.Pending
          : LinkStatus.Started

      const response = await processLink({
        id: Number(link.id),
        status,
      })

      setIsReload(!isReload)
      toast((response.data as any).message)
    } catch (error) {
      customErrorToast(error)
    }
  }

  return (
    <div
      className='card p-4'
      style={{ backgroundColor: '#1a1a1a', color: '#fff' }}
    >
      <h5
        className='text-center mb-4'
        style={{ color: '#ffc107' }}
      >
        Content for {type === ELink.LINK_ON ? 'Links On' : 'Links Off'}
      </h5>
      {!isAdmin && (
        <>
          <div className='mb-3 text-center'>
            <button
              className='btn btn-warning'
              data-bs-toggle='modal'
              data-bs-target='#addCookieModal'
            >
              Thêm Link
            </button>
          </div>
          <ModalAddLink
            isReload={isReload}
            setIsReload={setIsReload}
            type={type}
          />
        </>
      )}

      <div className='mb-4'>
        <FilterLink
          setLinks={setLinks}
          type={type}
        />

        <div className='table-responsive'>
          <table
            className='table table-striped table-dark'
            id='links-on-table'
          >
            <thead>
              <tr>
                <th scope='col'>STT</th>
                <th scope='col'>Tên Link</th>
                <th scope='col'>Type Link</th>
                <th scope='col'>ID Bài Viết</th>
                <th scope='col'>Last Comment Time</th>
                <th scope='col'>Comment Count</th>
                <th scope='col'>Created At</th>
                <th scope='col'>Delay (s)</th>
                <th scope='col'>Like Count</th>
                <th scope='col'>User Email</th>
                <th scope='col'>Hành Động</th>
              </tr>
            </thead>
            <tbody id='linksTableBody'>
              {links.length > 0 &&
                links.map((item, i) => {
                  return (
                    <tr
                      key={i}
                      className='link-row'
                      data-last-comment-time='{{ link.last_comment_time }}'
                      data-count='{{ link.comment_count }}'
                      data-delay='{{ link.delay_time }}'
                      data-type='{{ link.type }}'
                      data-like-count='{{ link.like }}'
                    >
                      <td className='stt'>{i + 1}</td>
                      <td>{item.linkName ?? item.linkUrl}</td>
                      <td>{item.type}</td>
                      <td>
                        <a
                          target='_blank'
                          href={`${item.linkUrl}`}
                          rel='noreferrer'
                        >
                          {item.postId}
                        </a>
                      </td>
                      <td data-time={item.lastCommentTime}>
                        <span className='time-ago'>
                          {item.lastCommentTime as any}
                        </span>
                      </td>
                      <td>{`[${item.countBefore}-${item.countAfter}]`}</td>
                      <td>{(item.createdAt as any) ?? ''}</td>
                      <td>{item.delayTime}</td>
                      <td>{`[${item.likeBefore}-${item.likeAfter}]`}</td>
                      <td>{item.email}</td>
                      <td className='nowrap'>
                        <div className='dropdown'>
                          <button
                            className='btn btn-sm btn-secondary dropdown-toggle'
                            type='button'
                            id='dropdownMenuButton-{{ link.id }}'
                            data-bs-toggle='dropdown'
                            data-bs-auto-close='outside'
                            aria-expanded='false'
                          >
                            <i className='fas fa-cog'></i>
                          </button>
                          <ul
                            className='dropdown-menu dropdown-menu-dark'
                            aria-labelledby='dropdownMenuButton-{{ link.id }}'
                          >
                            <li>
                              <button
                                className='dropdown-item btn btn-sm btn-primary'
                                data-bs-toggle='modal'
                                data-bs-target='#editLinkModal'
                                onClick={() => handleEdit(Number(item.id))}
                              >
                                Sửa
                              </button>
                            </li>
                            <li>
                              <button
                                className='dropdown-item btn btn-sm btn-primary'
                                onClick={() => stopOrStart(item)}
                              >
                                {item.status === LinkStatus.Started
                                  ? 'Stop'
                                  : 'Start'}
                              </button>
                            </li>
                            <li>
                              <button
                                className='dropdown-item btn btn-sm btn-primary'
                                onClick={() => handleDelete(Number(item.id))}
                              >
                                Xóa
                              </button>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>

        <ModalEditLink
          setIsReload={setIsReload}
          isReload={isReload}
          linkEditId={linkEditId}
        />
      </div>
    </div>
  )
}

export default LinkComponent
