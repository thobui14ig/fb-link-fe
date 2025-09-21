import {
  getLink,
  getLinkDeleted,
  IGetAllLink,
  updateLinkDelete,
} from '@/api/link.api'
import { getUsers } from '@/api/user.api'
import { Tab } from '@/common/constant'
import useTab from '@/common/hook/useTab'
import { IUser } from '@/common/model/user'
import { useApp } from '@/common/store/AppContext'
import Pagination from '@/components/Pagination/Pagination'
import {
  Button,
  Dropdown,
  Form,
  Input,
  MenuProps,
  Select,
  Space,
  Typography,
} from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { SettingOutlined } from '@ant-design/icons'
import { LinkStatus } from '@/common/model/link'
import ModalSetting from './ModalSetting'
import { customErrorToast } from '@/common/utils/toast'
import { debounce } from 'lodash'

interface IValueForm {
  userId: number
  keyword: string
}

function LinkDeleted() {
  const { isAdmin } = useApp()
  const { active } = useTab()
  const [form] = Form.useForm<IValueForm>()
  const [links, setLinks] = useState<IGetAllLink[]>([])
  const [users, setUsers] = useState<IUser[]>([])
  const [page, setPage] = useState<number | null>(0)
  const [pageSize, setPageSize] = useState<number | null>(0)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [pageSizeOptions, setPageSizeOptions] = useState<string[]>([])
  const [isShowModalSetting, setIsShowModalSetting] = useState<boolean>(false)
  const [contentPopover, setShowContentPopover] = useState<null | string>(null)
  const [showPopover, setShowPopover] = useState<null | number>(null)

  useEffect(() => {
    ;(async () => {
      try {
        await callApi(form.getFieldsValue())
      } catch (error) {}
    })()
  }, [page, pageSize])

  useEffect(() => {
    const fetch = async () => {
      const { data } = await getUsers()
      const dataUsers = data.filter((item) => item.level === 0)
      setUsers(dataUsers)
    }

    fetch()
  }, [])

  useEffect(() => {
    const pageSizeDefault = isAdmin ? 1000 : 10000000
    const pageSizeOptions = isAdmin ? ['1000', '2000', '5000'] : ['10000000']
    if (isAdmin) {
      setPageSizeOptions(pageSizeOptions)
      setPageSize(pageSizeDefault)
    }
  }, [isAdmin])

  const onFinish = async (values: IValueForm) => {
    await callApi(values)
  }

  const callApi = async (values: IValueForm) => {
    if (isAdmin && pageSize !== null) {
      const { data } = await getLinkDeleted({
        ...values,
        limit: pageSize,
        offset: pageSize * (page ? page - 1 : 0),
      })
      setLinks(data.data)
      setTotalCount(data.totalCount)
    }
  }

  const handleUpdateLinkDelete = async (status: LinkStatus, linkId: number) => {
    const input: { status: LinkStatus; linkIds: number[] } = {
      linkIds: [linkId],
      status,
    }

    await updateLinkDelete(input)
    await callApi(form.getFieldsValue())
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

  let stt = links?.length ?? 0

  return (
    <div
      className={`tab-pane fade ${active(Tab.LINK_DELETED)}`}
      id='pills-linksOn'
      role='tabpanel'
      aria-labelledby='pills-linksOn-tab'
    >
      <div
        className='card p-3'
        style={{ backgroundColor: '#1a1a1a', color: '#fff' }}
      >
        <h5
          className='text-center mb-4'
          style={{ color: '#ffc107' }}
        >
          Danh sách Link Delete
        </h5>
        <div className='mb-3 d-flex align-items-center'>
          <Form
            form={form}
            name='horizontal_login'
            layout='inline'
            className='white-label white-form'
            onFinish={onFinish}
            initialValues={{
              keyword: null,
              userId: null,
            }}
          >
            <Form.Item
              label='Keyword'
              name='keyword'
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='User'
              style={{ width: '250px' }}
              name='userId'
            >
              <Select>
                <Select.Option value={null}>Chọn</Select.Option>
                {users.length > 0 &&
                  users.map((item, i) => {
                    return (
                      <Select.Option
                        key={i}
                        value={item.id}
                      >
                        {item.username}
                      </Select.Option>
                    )
                  })}
              </Select>
            </Form.Item>
            <Button
              type='primary'
              htmlType='submit'
            >
              Submit
            </Button>
            <Button
              onClick={() => setIsShowModalSetting(true)}
              type='primary'
              style={{ marginLeft: 15 }}
            >
              Setting
            </Button>
          </Form>
        </div>
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

                    <th scope='col'>User Name</th>
                  </>
                )}
                <th scope='col'>Hành Động</th>
              </tr>
            </thead>
            <tbody id='linksTableBody'>
              {links.length > 0 &&
                links.map((item, i) => {
                  const dropdownItems: MenuProps['items'] = [
                    {
                      key: '1',
                      label: 'Follow',
                      onClick: () => {
                        handleUpdateLinkDelete(
                          LinkStatus.Started,
                          Number(item.id)
                        )
                      },
                    },
                    {
                      key: '2',
                      label: 'Scan',
                      onClick: () => {
                        handleUpdateLinkDelete(
                          LinkStatus.Started,
                          Number(item.id)
                        )
                      },
                    },
                  ]
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
                          <td>{item.username}</td>
                        </>
                      )}
                      <td>
                        <Dropdown
                          menu={{
                            items: dropdownItems,
                            selectable: true,
                          }}
                        >
                          <Typography.Link>
                            <Space>
                              <SettingOutlined style={{ fontSize: '20px' }} />
                            </Space>
                          </Typography.Link>
                        </Dropdown>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      </div>
      <div className='m-3'>
        {pageSize !== null && totalCount !== null && (
          <Pagination
            pageSize={pageSize}
            setPage={setPage}
            setPageSize={setPageSize}
            totalCount={totalCount}
            pageSizeOptions={pageSizeOptions}
          />
        )}
      </div>
      {isShowModalSetting && (
        <ModalSetting
          isModalOpen={isShowModalSetting}
          setShowModal={setIsShowModalSetting}
          links={links}
          callApi={callApi}
        />
      )}
    </div>
  )
}

export default LinkDeleted
