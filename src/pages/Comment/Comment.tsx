import { getComments, IGetCommentParams } from '@/api/comment.api'
import { Tab } from '@/common/constant'
import useTab from '@/common/hook/useTab'
import { IComment } from '@/common/model/comment'
import { useApp } from '@/common/store/AppContext'
import { Button, DatePicker, Form, Input, Switch } from 'antd'
import dayjs from 'dayjs'
import { useCallback, useEffect, useState } from 'react'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import './comment.css'
import { getLink } from '@/api/link.api'
import { customErrorToast } from '@/common/utils/toast'
import Pagination from '@/components/Pagination/Pagination'
import { debounce } from 'lodash'

function Comment() {
  const { isAdmin, userLogin } = useApp()
  const pageSizeDefault = isAdmin ? 1000 : 10000000
  const [form] = Form.useForm<IGetCommentParams>()
  const { active } = useTab()
  const [comments, setComments] = useState<IComment[]>([])
  const [commentsFromApi, setCommentsFromApi] = useState<IComment[]>([])
  const [isShowPhone, setIsShowPhone] = useState<boolean>(false)
  const [showPopover, setShowPopover] = useState<null | string>(null)
  const [contentPopover, setShowContentPopover] = useState<null | string>(null)
  const [page, setPage] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(pageSizeDefault)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [pageSizeOptions, setPageSizeOptions] = useState<string[]>([])
  const initialValues: IGetCommentParams = {
    startDate: dayjs(),
    endDate: dayjs(),
  }
  const isShowColumnPhoneNumber = isAdmin || (!isAdmin && !!userLogin?.getPhone)

  useEffect(() => {
    const fetch = async () => {
      callApi(form.getFieldsValue())
    }

    fetch()
  }, [page, pageSize])

  useEffect(() => {
    const pageSizeDefault = isAdmin ? 1000 : 10000000
    const pageSizeOptions = isAdmin ? ['1000', '2000', '5000'] : ['10000000']

    setPageSizeOptions(pageSizeOptions)
    setPageSize(pageSizeDefault)
  }, [isAdmin])

  const onFinish = async () => {
    const pageSizeDefault = isAdmin ? 1000 : 10000000
    if (pageSize !== pageSizeDefault || page !== 0) {
      setPageSize(pageSizeDefault)
      setPage(0)
      return
    }
    return callApi(form.getFieldsValue())
  }

  const callApi = async (values: IGetCommentParams) => {
    const { data } = await getComments({
      ...values,
      limit: pageSize,
      offset: pageSize * (page ? page - 1 : 0),
    })
    setCommentsFromApi(data.data)
    if (isShowPhone) {
      const cmts = data.data.filter(
        (item) => Number(item.phoneNumber?.length) > 0
      )
      setTotalCount(data.totalCount)
      setComments(cmts)
      return
    }
    setTotalCount(data.totalCount)
    setComments(data.data)
  }

  const downloadExcel = async () => {
    let allComment = []
    const { data } = await getComments({
      ...form.getFieldsValue(),
      limit: 10000000000,
      offset: 0,
    })
    allComment = data.data
    if (isShowPhone) {
      allComment = data.data.filter(
        (item) => Number(item.phoneNumber?.length) > 0
      )
    }
    const formattedData = allComment.map((item, index) => {
      const res: { [key: string]: any } = {
        STT: index + 1,
        Time: item.timeCreated,
        PostId: item.postId,
        'Tên bài': item.link.linkName,
        UID: item.uid,
        Name: item.name,
        'Phone Number': item.phoneNumber || '',
        Message: item.message,
      }
      if (!isShowColumnPhoneNumber) {
        delete res['Phone Number']
      }

      return res
    })

    const worksheet = XLSX.utils.json_to_sheet(formattedData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Comments')

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    })
    const dataBlob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    saveAs(dataBlob, 'comments.xlsx')
  }

  const handlePopover = async (cmtId: string, linkId: number) => {
    try {
      const response = await getLink(linkId)
      setShowContentPopover(response.data.content)
      setShowPopover(cmtId)
    } catch (error) {
      customErrorToast(error)
    }
  }

  const handlePopoverDebounced = useCallback(
    debounce((cmtId: string, linkId: number) => {
      handlePopover(cmtId, linkId)
    }, 200), // delay 500ms
    []
  )

  const showPhone = (checked: boolean) => {
    setIsShowPhone(checked)
    if (checked) {
      const cmts = commentsFromApi.filter(
        (item) => Number(item.phoneNumber?.length) > 0
      )
      setComments(cmts)
      return
    }
    setComments([...commentsFromApi])
  }

  let stt = comments.length

  return (
    <div
      className={`tab-pane fade ${active(Tab.COMMENT)}`}
      id='pills-linksOn'
      role='tabpanel'
      aria-labelledby='pills-linksOn-tab'
    >
      <div className='card p-3'>
        <h5
          className='text-center mb-4'
          style={{ color: '#ffc107' }}
        >
          Comments On
        </h5>
        <div className='mb-3 d-flex align-items-center'>
          <Form
            form={form}
            name='horizontal_login'
            layout='inline'
            className='white-label white-form'
            onFinish={onFinish}
            initialValues={{
              startDate: initialValues.startDate,
              endDate: initialValues.endDate,
              phoneNumber: isShowPhone,
              keyword: '',
            }}
          >
            <Form.Item
              label='Từ ngày'
              name='startDate'
            >
              <DatePicker />
            </Form.Item>

            <Form.Item
              label='Đến ngày'
              name='endDate'
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              label='Keyword'
              name='keyword'
            >
              <Input />
            </Form.Item>
            <Form.Item label={null}>
              <Button
                type='primary'
                htmlType='submit'
              >
                Submit
              </Button>
            </Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              onClick={() => downloadExcel()}
            >
              Download Excel
            </Button>
            {isShowColumnPhoneNumber && (
              <Form.Item
                style={{ marginLeft: 10 }}
                label='Phone Number'
                valuePropName='checked'
                name='phoneNumber'
              >
                <Switch onChange={showPhone} />
              </Form.Item>
            )}
          </Form>
        </div>

        <div className='table-responsive'>
          <table className='table table-striped table-dark'>
            <thead>
              <tr>
                <th>STT</th>
                <th>Time</th>
                {isAdmin && <th>Fb Name</th>}
                <th>Post ID</th>
                <th>Tên bài</th>
                <th>UID</th>
                <th>Name</th>
                {isShowColumnPhoneNumber && <th>Phone Number</th>}
                <th>Message</th>
              </tr>
            </thead>
            <tbody id='comments-table-body'>
              {comments.length > 0 &&
                comments.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{stt--}</td>
                      <td>{(item.timeCreated as any) ?? ''}</td>
                      {isAdmin && <td>{item.user.username}</td>}

                      <td
                        onMouseEnter={() => {
                          handlePopoverDebounced(
                            item.cmtId,
                            Number(item.link.id)
                          )
                        }}
                        onMouseLeave={() => {
                          handlePopoverDebounced.cancel()
                          setShowPopover(null)
                        }}
                        className='post-id-popover'
                      >
                        {item.postId}
                        {showPopover && showPopover === item.cmtId && (
                          <div className='popover'>{contentPopover}</div>
                        )}
                      </td>
                      <td>
                        <a
                          target='_blank'
                          href={`${item.link.linkUrl}`}
                          rel='noreferrer'
                        >
                          {item.link.linkName}
                        </a>
                      </td>
                      <td>{item.uid?.slice(0, 15)}</td>
                      <td>
                        <a
                          target='_blank'
                          href={`https://www.facebook.com/${item.uid}`}
                          rel='noreferrer'
                        >
                          {item.name}
                        </a>
                      </td>
                      {isShowColumnPhoneNumber && <td>{item.phoneNumber}</td>}
                      <td>{item.message}</td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      </div>
      <div className='m-3'>
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

export default Comment
