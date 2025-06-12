import { getLinks } from '@/api/link.api'
import { getUsers } from '@/api/user.api'
import { IModalReloadProps } from '@/common/interface'
import { ELink, LinkStatus } from '@/common/model/link'
import { IUser } from '@/common/model/user'
import { useApp } from '@/common/store/AppContext'
import { Button, Form, Input, Select } from 'antd'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import './filter-link.css'

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

export interface IPropFilter extends IModalReloadProps {
  isModalOpen: boolean
  setShowModal: (isModalOpen: boolean) => void
  setLinks: any
  type: ELink
}

function FilterLink({ setLinks, type, setShowModal }: IPropFilter) {
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

    const data = await getLinks(
      values,
      linkType,
      1,
      type === ELink.LINK_ON_HIDE || type === ELink.LINK_OFF_HIDE ? 1 : 0
    )
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

  const handleShowSetting = () => {
    setShowModal(true)
  }

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

      {isAdmin && (
        <>
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
        </>
      )}

      <Form.Item label={null}>
        <Button
          type='primary'
          htmlType='submit'
        >
          Submit
        </Button>
      </Form.Item>
      <Button
        onClick={() => handleShowSetting()}
        type='primary'
      >
        Setting
      </Button>
    </Form>
  )
}

export default FilterLink
