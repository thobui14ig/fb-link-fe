/* eslint-disable react/jsx-key */
import { deleteProxies, deleteProxy, getProxies } from '@/api/proxy.api'
import { Tab } from '@/common/constant'
import useTab from '@/common/hook/useTab'
import { IProxy, ProxyStatus } from '@/common/model/proxy'
import { useEffect, useState } from 'react'
import ModalAddProxy from './ModalAddProxy'
import { toast } from 'react-toastify'
import { customErrorToast } from '@/common/utils/toast'
import { Button, Form, Select } from 'antd'
import './proxy.css'

export interface FormValues {
  isFbBlock: boolean | null
  status: ProxyStatus | null
}

const statusBlockFb = [
  {
    name: 'Chưa',
    value: false,
  },
  {
    name: 'Đã block',
    value: true,
  },
]

const statusProxies = [
  {
    name: 'InActive',
    value: ProxyStatus.INACTIVE,
  },
  {
    name: 'Active',
    value: ProxyStatus.ACTIVE,
  },
]

function Proxy() {
  const { active } = useTab()
  const [form] = Form.useForm<FormValues>()
  const [proxies, setProxies] = useState<IProxy[]>([])
  const [isReload, setIsReload] = useState<boolean>(false)

  const handleDeleteProxy = async (id: number) => {
    try {
      await deleteProxy(id)
      setIsReload(!isReload)
      toast('Xóa thành công!')
    } catch (error) {
      customErrorToast(error)
    }
  }

  useEffect(() => {
    const fetch = async () => {
      const { data } = await getProxies(form.getFieldsValue())
      setProxies(data)
    }

    fetch()
  }, [isReload])

  const onFinish = async (values: FormValues) => {
    const { data } = await getProxies(values)
    setProxies(data)
  }

  const removeDataFilter = async () => {
    const result = confirm('Bạn có chắc muốn xóa không?')

    if (result) {
      try {
        await deleteProxies(proxies.map((item) => item.id))
        setIsReload(!isReload)
        toast('Xóa thành công!')
      } catch (error) {
        customErrorToast(error)
      }
    }
  }

  return (
    <div
      className={`tab-pane fade ${active(Tab.PROXY)}`}
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
          Danh sách Proxy
        </h5>

        <div className='mb-3 text-center'>
          <button
            className='btn btn-warning'
            data-bs-toggle='modal'
            data-bs-target='#addProxyModal'
          >
            Thêm
          </button>
        </div>
        <div className='filter-proxy'>
          <Form
            form={form}
            name='horizontal_login'
            layout='inline'
            className='white-label white-form'
            onFinish={onFinish}
            initialValues={{
              isFbBlock: null,
              status: null,
            }}
          >
            <Form.Item
              label='Block'
              style={{ width: '200px' }}
              name='isFbBlock'
            >
              <Select>
                <Select.Option value={null}>Tất cả</Select.Option>
                {statusBlockFb.length > 0 &&
                  statusBlockFb.map((item, i) => {
                    return (
                      <Select.Option
                        key={i}
                        value={item.value}
                      >
                        {item.name}
                      </Select.Option>
                    )
                  })}
              </Select>
            </Form.Item>
            <Form.Item
              label='Status'
              style={{ width: '200px' }}
              name='status'
            >
              <Select>
                <Select.Option value={null}>Tất cả</Select.Option>
                {statusProxies.length > 0 &&
                  statusProxies.map((item, i) => {
                    return (
                      <Select.Option
                        key={i}
                        value={item.value}
                      >
                        {item.name}
                      </Select.Option>
                    )
                  })}
              </Select>
            </Form.Item>
            <Form.Item label={null}>
              <Button
                type='primary'
                htmlType='submit'
              >
                Submit
              </Button>
            </Form.Item>
            <Form.Item label={null}>
              <Button
                type={'primary'}
                onClick={() => removeDataFilter()}
              >
                Xoá
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className='table-responsive'>
          <table className='table table-striped table-dark'>
            <thead>
              <tr>
                <th className='col-stt'>STT</th>
                <th className='col-proxy'>Proxy</th>
                <th className='col-proxy'>FB Block</th>
                <th>Tình Trạng</th>
                <th className='col-action'>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {proxies.length > 0 &&
                proxies.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td className='col-stt'>{i + 1}</td>
                      <td className='col-proxy'>{item.proxyAddress}</td>
                      <td className='col-proxy'>
                        {item.isFbBlock ? 'Đã Block' : 'Chưa'}
                      </td>
                      <td>{item.status}</td>
                      <td className='col-action'>
                        <button
                          className='btn btn-sm btn-danger'
                          onClick={() => handleDeleteProxy(item.id)}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>

        <ModalAddProxy
          isReload={isReload}
          setIsReload={setIsReload}
        />
      </div>
    </div>
  )
}

export default Proxy
