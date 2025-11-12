import { deleteAutoSetting, getAutoSetting } from '@/api/auto.api'
import { Tab } from '@/common/constant'
import useTab from '@/common/hook/useTab'
import { IAuto } from '@/common/model/auto'
import { customErrorToast } from '@/common/utils/toast'
import { Button } from 'antd'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ModalAddSetting from './ModalAddSetting'
import './setting.css'

function Setting() {
  const { active } = useTab()
  const [autoSetting, setAutoSetting] = useState<IAuto[]>([])
  const [isReload, setIsReload] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeletePage = async (id: number) => {
    try {
      await deleteAutoSetting(id)
      setIsReload(!isReload)
      toast('Xóa thành công!')
    } catch (error) {
      customErrorToast(error)
    }
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getAutoSetting()
        setAutoSetting(data)
      } catch (error) {}
    }

    fetch()
  }, [isReload])


  return (
    <div
      className={`tab-pane fade ${active(Tab.SETTING)}`}
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
          Danh sách setting auto
        </h5>

        <div className='mb-3 text-center'>
          <button
            className='btn btn-warning'
            data-bs-toggle='modal'
            data-bs-target='#addProxyModal'
            onClick={() => setIsModalOpen(true)}
          >
            Thêm
          </button>
        </div>

        <div className='table-responsive'>
          <table className='table table-striped table-dark'>
            <thead>
              <tr>
                <th className='col-proxy' style={{ width: '100px' }}>Thông số</th>
                <th className='col-action'>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {autoSetting.length > 0 &&
                autoSetting.map((item, i) => {

                  return (
                    <tr key={i}>
                      <td className='col-proxy'>{JSON.stringify(item.params)}</td>
                      <td className='col-action'>
                          <Button
                            type='primary'
                            htmlType='submit'
                            onClick={() => handleDeletePage(item.id)}
                          >
                            Xóa
                          </Button>   
                          <Button
                            type='primary'
                            htmlType='submit'
                            style={{ marginLeft: 10 }}
                            onClick={() => handleDeletePage(item.id)}
                          >
                            Edit
                          </Button>   
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>

        <ModalAddSetting
          isReload={isReload}
          setIsReload={setIsReload}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
    </div>
  )
}

export default Setting
