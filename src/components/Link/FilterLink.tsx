import { Button, Form, Input, Select } from 'antd'
import './filter-link.css'
import { useEffect, useState } from 'react'
import { getUsers } from '@/api/user.api'
import { IUser } from '@/common/model/user'
import { toast } from 'react-toastify'
import { getLinks } from '@/api/link.api'
import { ELink, LinkStatus } from '@/common/model/link'
import { useApp } from '@/common/store/AppContext'

export interface FormValues {
  type: 'private' | 'public' | 'die'
  lastCommentFrom?: number
  lastCommentTo?: number
  differenceCountCmtFrom?: number
  differenceCountCmtTo?: number
  delayFrom?: number
  delayTo?: number
  likeFrom?: number
  likeTo?: number
  userId: number
}

function FilterLink({ setLinks, type }: { setLinks: any; type: ELink }) {
  const { isAdmin } = useApp()
  const [form] = Form.useForm<FormValues>()
  const [users, setUsers] = useState<IUser[]>([])
  const linkType =
    type === ELink.LINK_ON ? LinkStatus.Started : LinkStatus.Pending

  const onFinish = async (values: FormValues) => {
    const {
      delayFrom,
      delayTo,
      differenceCountCmtFrom,
      differenceCountCmtTo,
      lastCommentFrom,
      lastCommentTo,
      likeFrom,
      likeTo,
    } = values

    if (
      (lastCommentFrom && !lastCommentTo) ||
      (!lastCommentFrom && lastCommentTo)
    ) {
      toast.error('Nhập thiếu thông tin cmt  comment count')
      return
    }
    if (
      (differenceCountCmtFrom && !differenceCountCmtTo) ||
      (!differenceCountCmtFrom && differenceCountCmtTo)
    ) {
      toast.error('Nhập thiếu thông tin chênh cmt')
      return
    }

    if ((likeFrom && !likeTo) || (!likeFrom && likeTo)) {
      toast.error('Nhập thiếu thông tin Like')
      return
    }

    if ((delayFrom && !delayTo) || (!delayFrom && delayTo)) {
      toast.error('Nhập thiếu thông tin delay')
      return
    }

    const data = await getLinks(values, linkType)
    setLinks(data.data)
  }

  useEffect(() => {
    const fetch = async () => {
      const { data } = await getUsers()
      const dataUsers = data.filter((item) => item.level === 0)
      setUsers(dataUsers)
    }

    fetch()
  }, [])

  useEffect(() => {
    const fetch = async () => {
      if (users.length > 0) {
        const data = await getLinks(null, linkType)
        setLinks(data.data)
      }
    }

    fetch()
  }, [users])

  if (!users.length) {
    return <></>
  }

  return (
    <Form
      form={form}
      name='horizontal_login'
      layout='inline'
      className='white-label white-form'
      onFinish={onFinish}
      initialValues={{
        type: null,
        userId: null,
      }}
    >
      {isAdmin && (
        <Form.Item
          label='Loại'
          style={{ width: '150px' }}
          name='type'
        >
          <Select>
            <Select.Option value={null}>Chọn</Select.Option>
            <Select.Option value='private'>Private</Select.Option>
            <Select.Option value='public'>Public</Select.Option>
            <Select.Option value='die'>Die</Select.Option>
          </Select>
        </Form.Item>
      )}

      <Form.Item
        label='Thời gian commnent '
        style={{ marginBottom: 0 }}
      >
        <Form.Item
          name='lastCommentFrom'
          style={{ display: 'inline-block', width: '50px' }}
        >
          <Input placeholder='Từ' />
        </Form.Item>
        <Form.Item
          name='lastCommentTo'
          style={{
            display: 'inline-block',
            width: '50px',
          }}
        >
          <Input placeholder='đến' />
        </Form.Item>
      </Form.Item>
      <Form.Item
        label='Chênh Cmt'
        style={{ marginBottom: 0 }}
      >
        <Form.Item
          name='differenceCountCmtFrom'
          style={{ display: 'inline-block', width: '50px' }}
        >
          <Input placeholder='Từ' />
        </Form.Item>
        <Form.Item
          name='differenceCountCmtTo'
          style={{
            display: 'inline-block',
            width: '50px',
          }}
        >
          <Input placeholder='đến' />
        </Form.Item>
      </Form.Item>
      <Form.Item
        label='Like'
        style={{ marginBottom: 0 }}
      >
        <Form.Item
          name='likeFrom'
          style={{ display: 'inline-block', width: '50px' }}
        >
          <Input placeholder='Từ' />
        </Form.Item>
        <Form.Item
          name='likeTo'
          style={{
            display: 'inline-block',
            width: '50px',
          }}
        >
          <Input placeholder='đến' />
        </Form.Item>
      </Form.Item>

      <Form.Item
        label='Delay'
        style={{ marginBottom: 0 }}
      >
        <Form.Item
          name='delayFrom'
          style={{ display: 'inline-block', width: '50px' }}
        >
          <Input placeholder='Từ' />
        </Form.Item>
        <Form.Item
          name='delayTo'
          style={{
            display: 'inline-block',
            width: '50px',
          }}
        >
          <Input placeholder='đến' />
        </Form.Item>
      </Form.Item>
      {isAdmin && (
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
                    {item.email}
                  </Select.Option>
                )
              })}
          </Select>
        </Form.Item>
      )}

      <Form.Item label={null}>
        <Button
          type='primary'
          htmlType='submit'
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default FilterLink
