/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  deleteLink,
  getLinks,
  hideOption,
  IGetAllLink,
  processLink
} from '@/api/link.api'
import { ELink, ILink, LinkStatus } from '@/common/model/link'
import { useApp } from '@/common/store/AppContext'
import { getTypeLink } from '@/common/utils'
import { customErrorToast } from '@/common/utils/toast'
import { Select, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import FilterLink from './FilterLink'
import ModalAddKeyword from './ModalAddKeyword'
import ModalAddLink from './ModalAddLink'
import ModalEditLink from './ModalEditLink'
import ModalSetting from './ModalSetting'
import { SettingOutlined } from '@ant-design/icons'

export interface ITypeLink {
  type: ELink
}

export enum EKeyHideCmt {
  ALL = 'all',
  PHONE = 'phone',
  KEYWORD = 'keywords',
}

function LinkComponent({ type }: ITypeLink) {
  const { isAdmin } = useApp()
  const [isReload, setIsReload] = useState<boolean>(false)
  const [isShowModalAddKeywords, setIsShowModalAddKeywords] =
    useState<boolean>(false)
  const [isShowModalSetting, setIsShowModalSetting] = useState<boolean>(false)

  const [links, setLinks] = useState<IGetAllLink[]>([])
  const [linkEditId, setLinkEditId] = useState<number | null>(null)
  const [linkSetKeyword, setLinkSetKeyword] = useState<number | null>(null)
  const linkStatus = getTypeLink(type)

  useEffect(() => {
    const fetch = async () => {
      const data = await getLinks(
        null,
        linkStatus,
        0,
        type === ELink.LINK_ON_HIDE || type === ELink.LINK_OFF_HIDE ? 1 : 0
      )
      setLinks(data.data)
    }

    fetch()
  }, [isReload])

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
        hideCmt:
          type === ELink.LINK_ON_HIDE || type === ELink.LINK_OFF_HIDE
            ? true
            : false,
      })

      setIsReload(!isReload)
      toast((response.data as any).message)
    } catch (error) {
      customErrorToast(error)
    }
  }
  
  const actionHideCmt = async (key: EKeyHideCmt, linkId: number) => {
    const currentLink = links.find(item => item.id === linkId)
    if (currentLink){
      currentLink.hideBy = key
      setLinks([...links])
    }

    if (key === EKeyHideCmt.KEYWORD) {
      setLinkSetKeyword(linkId)
      setIsShowModalAddKeywords(true)
    }
    try {
      await hideOption(linkId, key)
      setIsReload(!isReload)
      toast.success('Ok!')
    } catch (error) {
      customErrorToast(error)
    }
  }

  const showModalKeyword = (linkId: number) => {
      setLinkSetKeyword(linkId)
      setIsShowModalAddKeywords(true)
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
        Content for{' '}
        {type === ELink.LINK_ON
          ? 'Links On'
          : type === ELink.LINK_OFF
            ? 'Links Off'
            : 'Link Ẩn'}
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
          isModalOpen={isShowModalSetting}
          setShowModal={setIsShowModalSetting}
          isReload={isReload}
          setIsReload={setIsReload}
        />

        <div className='table-responsive'>
          <table
            className='table table-striped table-dark'
            id='links-on-table'
          >
            <thead>
              <tr>
                <th scope='col'>STT</th>
                <th scope='col'>Created At</th>
                <th scope='col'>ID Bài Viết</th>
                <th scope='col'>Tên Link</th>
                <th scope='col'>Content</th>
                <th scope='col'>Last Comment Time</th>
                {isAdmin && <th scope='col'>Chênh Time</th>}
                <th scope='col' style={{ minWidth: "100px" }}>Data</th>
                {isAdmin && <th scope='col' style={{ minWidth: "100px" }}>Comment Count</th>}
                {isAdmin &&  <th scope='col' style={{ minWidth: "100px" }}>Like Count</th>}
                {isAdmin && (
                  <>
                    <th scope='col'>Type Link</th>
                    <th scope='col'>Delay (s)</th>
                    <th scope='col'>User Name</th>
                  </>
                )}
                {(type === ELink.LINK_ON_HIDE ||
                  type === ELink.LINK_OFF_HIDE) && <th scope='col'>Ẩn theo</th>}
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
                      <td>{(item.createdAt as any) ?? ''}</td>
                      <td>
                        <a
                          target='_blank'
                          href={`${item.linkUrl}`}
                          rel='noreferrer'
                        >
                          {item.postId}
                        </a>
                      </td>
                      <td>{item.linkName ?? item.linkUrl}</td>
                      <td>{item.content}</td>

                      <td data-time={item.lastCommentTime}>
                        <span className='time-ago'>
                          {(item.lastCommentTime as any)}
                        </span>
                      </td>
                      {isAdmin && 
                        <td>{item?.timeCrawUpdate as any ?? ""}<span className="square">{item.countAfter - (item.totalCommentNewest - item.totalComment)}</span></td>
                      }
                      <td>{`${item.totalCommentNewest}`} <span className="square">{(item.totalCommentToday)}</span></td>  

                      {isAdmin && (
                        <>
                          <td>{item.countBefore} <span className="square">{(item.countAfter)}</span></td>
                          <td>{item.likeBefore} <span className="square">{(item.likeAfter)}</span></td>
                          <td>{item.type}</td>
                          <td>{item.delayTime}</td>
                          <td>{item.username}</td>
                        </>
                      )}
                      {(type === ELink.LINK_ON_HIDE ||
                        type === ELink.LINK_OFF_HIDE) && (
                        <td className='td-hide-cmt'>
                          <div className='hide-cmt'>
                            {item.hideCmt ? (
                              <>
                                <Select
                                  defaultValue={item.hideBy}
                                  style={{ width: 120 }}
                                  onChange={(e) =>
                                    actionHideCmt(
                                      e as unknown as EKeyHideCmt,
                                      item.id as number
                                    )
                                  }
                                  options={[
                                    {
                                      value: EKeyHideCmt.ALL,
                                      label: 'All',
                                    },
                                    {
                                      value: EKeyHideCmt.PHONE,
                                      label: 'Phone number',
                                    },
                                    {
                                      value: EKeyHideCmt.KEYWORD,
                                      label: 'Keywords',
                                    },
                                  ]}
                                />
                                {item.hideBy === EKeyHideCmt.KEYWORD && (
                                  <Typography.Link
                                    onClick={() =>
                                      showModalKeyword(item.id as number)
                                    }
                                  >
                                    <SettingOutlined
                                      style={{
                                        fontSize: '20px',
                                        marginLeft: '5px',
                                      }}
                                    />
                                  </Typography.Link>
                                )}
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                        </td>
                      )}

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
                            {/* {(type === ELink.LINK_ON_HIDE ||
                              type === ELink.LINK_OFF_HIDE) && (
                              <li>
                                <button
                                  className='dropdown-item btn btn-sm btn-primary'
                                  onClick={() => handleHideCmt(item)}
                                >
                                  {getTypeAction()}
                                </button>
                              </li>
                            )} */}

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
          type={type}
        />
        {linkSetKeyword && (
          <ModalAddKeyword
            isReload={isReload}
            setIsReload={setIsReload}
            isModalOpen={isShowModalAddKeywords}
            setShowModal={setIsShowModalAddKeywords}
            linkId={linkSetKeyword}
          />
        )}
        {isShowModalSetting && (
          <ModalSetting
            isModalOpen={isShowModalSetting}
            setShowModal={setIsShowModalSetting}
            isReload={isReload}
            setIsReload={setIsReload}
            links={links}
            linkStatus={linkStatus}
            type={type}
          />
        )}
      </div>
    </div>
  )
}

export default LinkComponent
