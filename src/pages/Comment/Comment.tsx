import { getComments, IGetCommentParams } from '@/api/comment.api'
import { Tab } from '@/common/constant'
import useTab from '@/common/hook/useTab'
import { IComment } from '@/common/model/comment'
import { Button, DatePicker, Form } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

function Comment() {
  const [form] = Form.useForm<IGetCommentParams>()
  const { active } = useTab()
  const [comments, setComments] = useState<IComment[]>([])
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
                <th>UID</th>
                <th>Name</th>
                <th>Message</th>
                <th>Time</th>
                <th>Post ID</th>
                <th>Phone Number</th>
                <th>User Email</th>
              </tr>
            </thead>
            <tbody id='comments-table-body'>
              {comments.length > 0 &&
                comments.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>
                        <a
                          target='_blank'
                          href={`https://www.facebook.com/${item.uid}`}
                          rel='noreferrer'
                        >
                          {item.uid}
                        </a>
                      </td>
                      <td>{item.name}</td>
                      <td>{item.message}</td>
                      <td>{(item.timeCreated as any) ?? ''}</td>
                      <td>
                        <a
                          target='_blank'
                          href={item?.link.linkUrl}
                          rel='noreferrer'
                        >
                          {item.postId}
                        </a>
                      </td>
                      <td>{item.phoneNumber}</td>
                      <td>{item.user.email}</td>
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
