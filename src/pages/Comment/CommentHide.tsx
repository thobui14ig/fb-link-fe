import { getComments } from '@/api/comment.api'
import { hideCmt } from '@/api/link.api'
import { Tab } from '@/common/constant'
import useTab from '@/common/hook/useTab'
import { IComment } from '@/common/model/comment'
import { useApp } from '@/common/store/AppContext'
import { customErrorToast } from '@/common/utils/toast'
import { Button, DatePicker, Form, Switch } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function CommentHide() {
  const [form] = Form.useForm<any>()
  const { isAdmin, userLogin } = useApp()
  const { active } = useTab()
  const [comments, setComments] = useState<IComment[]>([])
  const initialValues = {
    startDate: dayjs(),
    endDate: dayjs(),
  }

  useEffect(() => {
    const fetch = async () => {
      const { data } = await getComments(initialValues, 1)
      setComments(data)
    }

    fetch()
  }, [])

const handleHideCmt = async (checked: boolean, comment: IComment) => {
  try {
    const curenttCmt = comments.find((item) => item.id === comment.id)
    if (curenttCmt?.hideCmt) {
      toast.error('Không thể tắt ẩn!')
      return
    }

    if (curenttCmt) {
      curenttCmt.hideCmt = checked
      setComments([...comments]) // Trigger render
      await hideCmt(comment)
      toast.success('Ok!')
    }
  } catch (error) {
    customErrorToast(error)
  }
}

  return (
    <div
      className={`tab-pane fade ${active(Tab.COMMENT_HIDE)}`}
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
                <th>Ẩn</th>
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
                      <td>{item.postId}</td>
                      <td>
                        <a
                          target='_blank'
                          href={item?.link.linkUrl}
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
                      <td>
                        <Switch
                          checked={item.hideCmt}
                          checkedChildren="ON"
                          unCheckedChildren="OFF"
                          onChange={(checked) => handleHideCmt(checked, item)}
                        />
                      </td>
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

export default CommentHide
