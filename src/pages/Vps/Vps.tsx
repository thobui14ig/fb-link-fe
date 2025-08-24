
import { deleteVps, getVps } from '@/api/vps.api'
import { Tab } from '@/common/constant'
import useTab from '@/common/hook/useTab'
import { VpsStatus } from '@/common/model/vps'
import { customErrorToast } from '@/common/utils/toast'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ModalAddVps from './ModalAddVps'
import './vps.css'

function Vps() {
  const { active } = useTab()
  const [pages, setPages] = useState<any[]>([])
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

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getVps()
        setPages(data)        
      } catch (error) {}
    }

    fetch()
  }, [isReload])


  return (
    <div
      className={`tab-pane fade ${active(Tab.VPS)}`}
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

        <div className='table-responsive'>
          <table className='table table-striped table-dark'>
            <thead>
              <tr>
                <th className='col-stt'>STT</th>
                <th className='col-proxy'>Ip</th>
                <th className='col-proxy'>Port</th>
                <th className='col-proxy'>Status</th>
                <th className='col-action'>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {pages.length > 0 &&
                pages.map((item, i) => {

                  return (
                    <tr>
                      <td className='col-stt'>{i + 1}</td>
                      <td className='col-proxy'>{item.ip}</td>
                      <td className='col-proxy'>{item.port}</td>
                      <td className='col-proxy'><span className={`vps-status-${item.status}`}>{item.status === VpsStatus.Live ? 'Live' : 'Die'}</span></td>
                      <td className='col-action'>
                        <span
                          className='btn-remove-vps'
                          onClick={() => handleDeleteVps(item.id)}
                        >
                          Xóa
                        </span>
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
      </div>
    </div>
  )
}

export default Vps
