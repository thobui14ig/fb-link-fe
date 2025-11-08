import { deleteVps, getVps, restartVps } from '@/api/vps.api'
import { Tab } from '@/common/constant'
import useTab from '@/common/hook/useTab'
import { IVps, VpsStatus } from '@/common/model/vps'
import { customErrorToast } from '@/common/utils/toast'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ModalAddVps from './ModalAddVps'
import './vps.css'
import { RedoOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import ModalInstruct from './ModalInstruct'

function Vps() {
  const { active } = useTab()
  const [vps, setVps] = useState<IVps[]>([])
  const [isShowInstruct, setIsShowInstruct] = useState<boolean>(false)
  const [isReload, setIsReload] = useState<boolean>(false)

  const handleDeleteVps = async (id: number) => {
    try {
      await deleteVps(id)
      setIsReload(!isReload)
      toast('Xóa thành công!')
    } catch (error) {
      customErrorToast(error)
    }
  }

  const handleRestartVps = async (port: string) => {
    try {
      // await restartVps(port)
      // setIsReload(!isReload)
      // toast('Restart thành công!')
      alert("No")
    } catch (error) {
      customErrorToast(error)
    }
  }

  useEffect(() => {
    fetchVps()
  }, [isReload])

  const fetchVps = async () => {
    try {
      const { data } = await getVps()
      setVps(data)
    } catch (error) {}
  }

  const refreshVps = async () => {
    try {
      await fetchVps()
      toast.success('Refresh ok')
    } catch (error) {}
  }

  return (
    <div
      className={`tab-pane fade ${active(Tab.VPS)}`}
      id='pills-linksOn'
      role='tabpanel'
      aria-labelledby='pills-linksOn-tab'
    >
      <div
        className='card p-2'
        style={{ backgroundColor: '#1a1a1a', color: '#fff' }}
      >
        <h5
          className='text-center'
          style={{ color: '#ffc107' }}
        >
          Danh sách Service
        </h5>

        <div className='mb-3 text-center'>
          <button
            className='btn btn-warning'
            data-bs-toggle='modal'
            data-bs-target='#addVpsModal'
          >
            Thêm Service
          </button>
        </div>
        <div className='refress-vps'>
          <Button
            type='primary'
            onClick={() => refreshVps()}
          >
            <RedoOutlined />
          </Button>
          <Button
            type='primary'
            htmlType='submit'
            onClick={() => setIsShowInstruct(true)}
            style={{ marginLeft: 5 }}
          >
            Hướng dẫn
          </Button>
        </div>
        <div className='table-responsive'>
          <table className='table table-striped table-dark'>
            <thead>
              <tr>
                <th className='col-stt'>STT</th>
                <th className='col-proxy' style={{ width: '100px' }}>Ip</th>
                <th className='col-proxy' style={{ width: '100px' }}>Port</th>
                <th className='col-proxy' style={{ width: '100px' }} >Speed</th>
                <th className='col-proxy' style={{ width: '100px' }}>Status</th>
                <th className='col-action'>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {vps.length > 0 &&
                vps.map((item, i) => {
                  return (
                    <tr>
                      <td className='col-stt'>{i + 1}</td>
                      <td className='col-proxy'>{item.ip}</td>
                      <td className='col-proxy'>{item.port}</td>
                      <td className='col-proxy'>{item.speed}s</td>
                      <td className='col-proxy'>
                        <div className={`vps-status-${item.status}`}>
                          {item.status === VpsStatus.Live ? 'Live' : 'Die'}
                        </div>
                      </td>
                      <td className='col-action' >
                        <div>
                          <Button
                            type='primary'
                            onClick={() => handleDeleteVps(item.id)}
                          >
                            Xóa
                          </Button>
                          <Button
                            type='primary'
                            htmlType='submit'
                            style={{ marginLeft: 10 }}
                            onClick={() => handleRestartVps(item.port)}
                          >
                            Restart
                          </Button>                        
                        </div>

                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>

        <ModalAddVps
          isReload={isReload}
          setIsReload={setIsReload}
        />
        {isShowInstruct && (
          <ModalInstruct
            isModalOpen={isShowInstruct}
            setIsModalOpen={setIsShowInstruct}
          />
        )}
      </div>
    </div>
  )
}

export default Vps
