
import { deletePage, getPages } from '@/api/page.api'
import { Tab } from '@/common/constant'
import useTab from '@/common/hook/useTab'
import { IPage } from '@/common/model/page'
import { customErrorToast } from '@/common/utils/toast'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ModalAddPage from './ModalAddPage'

function Page() {
  const { active } = useTab()
  const [pages, setPages] = useState<IPage[]>([])
  const [isReload, setIsReload] = useState<boolean>(false)

  const handleDeletePage = async (id: number) => {
    try {
      await deletePage(id)
      setIsReload(!isReload)
      toast('Xóa thành công!')
    } catch (error) {
      customErrorToast(error)
    }
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getPages()
        setPages(data)        
      } catch (error) {}
    }

    fetch()
  }, [isReload])

  return (
    <div
      className={`tab-pane fade ${active(Tab.PAGE)}`}
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
          Danh sách Page
        </h5>

        <div className='mb-3 text-center'>
          <button
            className='btn btn-warning'
            data-bs-toggle='modal'
            data-bs-target='#addProxyModal'
          >
            Thêm Page
          </button>
        </div>

        <div className='table-responsive'>
          <table className='table table-striped table-dark'>
            <thead>
              <tr>
                <th className='col-stt'>STT</th>
                <th className='col-proxy'>Name</th>
                <th className='col-action'>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {pages.length > 0 &&
                pages.map((item, i) => {
                  return (
                    <tr>
                      <td className='col-stt'>{i + 1}</td>
                      <td className='col-proxy'>{item.name}</td>
                      <td className='col-action'>
                        <button
                          className='btn btn-sm btn-danger'
                          onClick={() => handleDeletePage(item.id)}
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

        <ModalAddPage
          isReload={isReload}
          setIsReload={setIsReload}
        />
      </div>
    </div>
  )
}

export default Page
