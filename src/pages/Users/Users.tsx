import { useApp } from '@/common/store/AppContext'
import './users.css'
import UserTemplate from './UserTemplate'
import AdminTemplate from './AdminTemplate'
import useTab from '@/common/hook/useTab'
import { Tab } from '@/common/constant'

function Users() {
  const { isAdmin } = useApp()
  const { active } = useTab()

  return (
    <div
      className={`tab-pane fade ${active(Tab.USERS)}`}
      id='pills-users'
      role='tabpanel'
      aria-labelledby='pills-users-tab'
    >
      <div className='card p-3'>
        <h5>User Details</h5>
        <table className='table table-dark table-bordered'>
          {!isAdmin ? <UserTemplate /> : <AdminTemplate />}
        </table>
      </div>
    </div>
  )
}

export default Users
