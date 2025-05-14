import useTab from '@/common/hook/useTab'
import './token.css'
import { Tab } from '@/common/constant'
import { useEffect, useState } from 'react'
import { IToken } from '@/common/model/token'
import { deleteToken, getTokens } from '@/api/token.api'
import ModalAddToken from './ModalAddToken'
import { toast } from 'react-toastify'
import { customErrorToast } from '@/common/utils/toast'
import { SettingOutlined } from '@ant-design/icons'
import { Dropdown, MenuProps, Space, Typography } from 'antd'

function Token() {
  const { active } = useTab()
  const [tokens, setTokens] = useState<IToken[]>([])
  const [isReload, setIsReload] = useState<boolean>(false)

  const handleDeleteToken = async (id: number) => {
    try {
      await deleteToken(id)
      setIsReload(!isReload)
      toast('Xóa thành công!')
    } catch (error) {
      customErrorToast(error)
    }
  }

  useEffect(() => {
    const fetch = async () => {
      const { data } = await getTokens()
      setTokens(data)
    }

    fetch()
  }, [isReload])

  return (
    <div
      className={`tab-pane fade ${active(Tab.TOKEN)}`}
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
          Danh sách Token
        </h5>

        <div className='mb-3 text-center'>
          <button
            className='btn btn-warning'
            data-bs-toggle='modal'
            data-bs-target='#addTokenModal'
          >
            Thêm Token
          </button>
        </div>

        <div className='table-responsive'>
          <table className='table table-striped table-dark'>
            <thead>
              <tr>
                <th className='col-stt'>STT</th>
                <th className='col-token'>Token</th>
                <th className='col-token'>Status</th>
                <th className='col-action'>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {tokens.length > 0 &&
                tokens.map((item, i) => {
                  const dropdownItems: MenuProps['items'] = [
                    {
                      key: '1',
                      label: 'Xóa',
                      onClick: () => {
                        return handleDeleteToken(item.id)
                      },
                    },
                    {
                      key: '2',
                      label: 'Copy',
                      onClick: () => {
                        navigator.clipboard
                          .writeText(item.tokenValue)
                          .then(() => {
                            toast.success('Copy thành công')
                          })
                          .catch((err) => {
                            console.error('Lỗi khi copy:', err)
                          })
                      },
                    },
                  ]

                  return (
                    <tr key={i}>
                      <td className='col-stt'>{i + 1}</td>
                      <td className='col-token'>{item.tokenValue}</td>
                      <td>{item.status}</td>
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

        <ModalAddToken
          isReload={isReload}
          setIsReload={setIsReload}
        />
      </div>
    </div>
  )
}

export default Token
