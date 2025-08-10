import { getComments, IGetCommentParams } from '@/api/comment.api'
import { Tab } from '@/common/constant'
import useTab from '@/common/hook/useTab'
import { IComment } from '@/common/model/comment'
import { useApp } from '@/common/store/AppContext'
import { Button, DatePicker, Form } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import './comment.css'
import { getLink } from '@/api/link.api'
import { customErrorToast } from '@/common/utils/toast'

function Comment() {
  const { isAdmin, userLogin } = useApp()
  const [form] = Form.useForm<IGetCommentParams>()
  const { active } = useTab()
  const [comments, setComments] = useState<IComment[]>([])
  const [showPopover, setShowPopover] = useState<null | string>(null)
  const [contentPopover, setShowContentPopover] = useState<null | string>(null)
  const initialValues: IGetCommentParams = {
    startDate: dayjs(),
    endDate: dayjs(),
  }

  useEffect(() => {
    const fetch = async () => {
      const { data } = await getComments(initialValues)
      setComments(data)
    }

    fetch()
  }, [])

  const onFinish = async (values: IGetCommentParams) => {
    const { data } = await getComments(values)
    setComments(data)
  }

  const downloadExcel = () => {
    const formattedData = comments.map((item, index) => ({
      STT: index + 1,
      Time: item.timeCreated,
      PostId: item.postId,
      'Tên bài': item.link.linkName,
      UID: item.uid,
      Name: item.name,
      'Phone Number': item.phoneNumber || '',
      Message: item.message,
    }))

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

  return (
    <div
      className={`tab-pane fade ${active(Tab.COMMENT)}`}
      id='pills-linksOn'
      role='tabpanel'
      aria-labelledby='pills-linksOn-tab'
    >
      <div className='card p-3'>
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
                {(isAdmin || (!isAdmin && !!userLogin?.getPhone)) && <th>Phone Number</th>}
                <th>Message</th>
              </tr>
            </thead>
            <tbody id='comments-table-body'>
              {comments.length > 0 &&
                comments.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{(item.timeCreated as any) ?? ''}</td>
                      {isAdmin && <td>{item.user.username}</td>}

                      <td
                        onMouseEnter={() => {
                          handlePopover(item.cmtId, Number(item.link.id))
                        }}
                        onMouseLeave={() => setShowPopover(null)}
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
                      {(isAdmin || (!isAdmin && !!userLogin?.getPhone)) && <td>{item.phoneNumber}</td>}
                      <td>{item.message}</td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Comment
