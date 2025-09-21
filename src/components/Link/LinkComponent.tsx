/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  deleteLink,
  getLink,
  getLinks,
  hideOption,
  IGetAllLink,
  priority as priorityApi,
  processLink,
} from '@/api/link.api'
import { ELink, ILink, LinkStatus } from '@/common/model/link'
import { useApp } from '@/common/store/AppContext'
import { getTypeLink } from '@/common/utils'
import { customErrorToast } from '@/common/utils/toast'
import { SettingOutlined } from '@ant-design/icons'
import { Button, Checkbox, Select, Typography } from 'antd'
import { debounce } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Pagination from '../Pagination/Pagination'
import FilterLink from './FilterLink'
import ModalAddKeyword from './ModalAddKeyword'
import ModalAddLink from './ModalAddLink'
import ModalCmd from './ModalCmd'
import ModalEditLink from './ModalEditLink'
import ModalSetting from './ModalSetting'

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
  const pageSizeDefault = isAdmin ? 1000 : 10000000
  const [isReload, setIsReload] = useState<boolean>(false)
  const [isShowModalAddKeywords, setIsShowModalAddKeywords] =
    useState<boolean>(false)
  const [isModalOpenCmd, setIsModalOpenCmd] = useState(false)
  const [linkIdWathchCmd, setLinkIdWathchCmd] = useState<number | null>(null)
  const [isShowModalSetting, setIsShowModalSetting] = useState<boolean>(false)
  const [page, setPage] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(pageSizeDefault)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [showPopover, setShowPopover] = useState<null | number>(null)
  const [contentPopover, setShowContentPopover] = useState<null | string>(null)
  const [links, setLinks] = useState<IGetAllLink[]>([])
  const [linkEditId, setLinkEditId] = useState<number | null>(null)
  const [linkSetKeyword, setLinkSetKeyword] = useState<number | null>(null)
  const linkStatus = getTypeLink(type)
  const [pageSizeOptions, setPageSizeOptions] = useState<string[]>([])

  useEffect(() => {
    const fetch = async () => {
      if (isAdmin !== null) {
        const response = await getLinks(
          null,
          linkStatus,
          0,
          type === ELink.LINK_ON_HIDE || type === ELink.LINK_OFF_HIDE ? 1 : 0,
          pageSize,
          pageSize * (page ? page - 1 : 0)
        )
        setLinks(response.data.data)
        setTotalCount(response.data.totalCount)
      }
    }

    fetch()
  }, [page, pageSize, isReload])

  useEffect(() => {
    if (isAdmin !== null) {
      const pageSizeDefault = isAdmin ? 1000 : 10000000
      const pageSizeOptions = isAdmin ? ['1000', '2000', '5000'] : ['10000000']

      setPageSizeOptions(pageSizeOptions)
      setPageSize(pageSizeDefault)
    }
  }, [isAdmin])

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
    const currentLink = links.find((item) => item.id === linkId)
    if (currentLink) {
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

  const priority = async (linkId: number, priority: boolean) => {
    const newPriority = priority ? false : true
    try {
      const currentLink = links.find((item) => item.id === linkId)
      if (currentLink) {
        currentLink.priority = newPriority
      }
      setLinks([...links])
      toast.success('Ok!')
      await priorityApi({ linkId, priority: newPriority })
    } catch (error) {
      customErrorToast(error)
    }
  }

  const handleWatchCmd = (id: number) => {
    setLinkIdWathchCmd(id)
    setIsModalOpenCmd(true)
  }

  const handlePopover = async (linkId: number) => {
    try {
      const response = await getLink(linkId)
      setShowContentPopover(response.data.content)
      setShowPopover(linkId)
    } catch (error) {
      customErrorToast(error)
    }
  }

  const handlePopoverDebounced = useCallback(
    debounce((linkId: number) => {
      handlePopover(linkId)
    }, 200), // delay 500ms
    []
  )

  let stt = links.length

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
          page={page}
          pageSize={pageSize}
          setTotalCount={setTotalCount}
          setPageSize={setPageSize}
          setPage={setPage}
          pageSizeDefault={pageSizeDefault}
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
                {/* <th scope='col'>Content</th> */}
                <th scope='col'>Last Comment Time</th>
                {isAdmin && <th scope='col'>Chênh Time</th>}
                {isAdmin && <th scope='col'>No Name</th>}
                <th
                  scope='col'
                  style={{ minWidth: '100px' }}
                >
                  Data
                </th>
                {isAdmin && (
                  <th
                    scope='col'
                    style={{ minWidth: '100px' }}
                  >
                    Comment Count
                  </th>
                )}
                {isAdmin && (
                  <th
                    scope='col'
                    style={{ minWidth: '100px' }}
                  >
                    Like Count
                  </th>
                )}
                {isAdmin && (
                  <>
                    <th scope='col'>Type Link</th>
                    <th scope='col'>Delay (s)</th>
                    <th scope='col'>Ưu tiên</th>
                    <th scope='col'>CMD</th>
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
                      <td className='stt'>{stt--}</td>
                      <td>{(item.createdAt as any) ?? ''}</td>
                      <td>
                        <a
                          target='_blank'
                          href={`${item.linkUrl}`}
                          rel='noreferrer'
                        >
                          {item.postId ? item.postId : item.linkUrl}
                        </a>
                      </td>
                      <td className='post-id-popover'>
                        <span
                          onMouseEnter={() => {
                            handlePopoverDebounced(Number(item.id))
                          }}
                          onMouseLeave={() => {
                            handlePopoverDebounced.cancel()
                            setShowPopover(null)
                          }}
                        >
                          {item.linkName ?? item.linkUrl}
                        </span>

                        {showPopover && showPopover === item.id && (
                          <div className='popover'>{contentPopover}</div>
                        )}
                      </td>
                      {/* <td>{item.content}</td> */}

                      <td data-time={item.lastCommentTime}>
                        <span className='time-ago'>
                          {item.lastCommentTime as any}
                        </span>
                      </td>
                      {isAdmin && (
                        <>
                          <td>{(item?.timeCrawUpdate as any) ?? ''}</td>
                          <td>
                            <span className='square'>
                              {item.countAfter -
                                (item.totalCommentNewest - item.totalComment)}
                            </span>
                          </td>
                        </>
                      )}
                      <td>
                        {`${item.totalCommentNewest}`}{' '}
                        <span className='square'>{item.totalCommentToday}</span>
                      </td>

                      {isAdmin && (
                        <>
                          <td>
                            {item.countBefore}{' '}
                            <span className='square'>{item.countAfter}</span>
                          </td>
                          <td>
                            {item.likeBefore}{' '}
                            <span className='square'>{item.likeAfter}</span>
                          </td>
                          <td>{item.type}</td>
                          <td>{item.delayTime}</td>
                          <td>
                            <Checkbox
                              checked={item.priority}
                              onChange={() =>
                                priority(Number(item.id), item.priority)
                              }
                            ></Checkbox>
                          </td>
                          <td>
                            <Button
                              type='primary'
                              htmlType='submit'
                              onClick={() => handleWatchCmd(Number(item.id))}
                            >
                              Xem
                            </Button>
                          </td>
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
          links={links}
          setLinks={setLinks}
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
        {isModalOpenCmd && linkIdWathchCmd && (
          <ModalCmd
            isModalOpen={isModalOpenCmd}
            setIsModalOpen={setIsModalOpenCmd}
            linkId={linkIdWathchCmd}
          />
        )}
      </div>
      <div>
        <Pagination
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
          totalCount={totalCount}
          pageSizeOptions={pageSizeOptions}
        />
      </div>
    </div>
  )
}

export default LinkComponent
