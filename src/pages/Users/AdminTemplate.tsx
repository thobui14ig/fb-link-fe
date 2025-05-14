import { deleteUser, getUsers } from '@/api/user.api'
import { IUser } from '@/common/model/user'
import ModalAddUser from '@/components/ModalUser/ModalAddUser'
import ModalEditUser from '@/components/ModalUser/ModalEditUser'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function AdminTemplate() {
  const [users, setUsers] = useState<IUser[]>([])
  const [isReload, setIsReload] = useState<boolean>(false)
  const [userEdit, setUserEdit] = useState<number | null>(null)

  const handleDeleteUser = async (userId: number) => {
    try {
      await deleteUser(userId)
      setIsReload(!isReload)
      toast('Xóa thành công!')
    } catch (error) {
      toast('Lỗi Xóa!')
    }
  }

  useEffect(() => {
    const fetch = async () => {
      const { data } = await getUsers()
      setUsers(data)
    }

    fetch()
  }, [isReload])

  return (
    <>
      <thead>
        <tr>
          <th
            colSpan={5}
            className='text-center'
          >
            All Users
          </th>
        </tr>
        <tr>
          <th>Email</th>
          <th>Running Links</th>
          <th>Not Running Links</th>
          <th>Expiration Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 &&
          users.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.email}</td>
                <td>1</td>
                <td>1</td>
                <td>
                  <span
                    className='expiration-days'
                    data-expired-at="{{ user['expired_at'] }}"
                  >
                    Đang tính...
                  </span>
                </td>
                <td className='nowrap'>
                  <div className='dropdown'>
                    <button
                      className='btn btn-sm btn-secondary dropdown-toggle'
                      type='button'
                      id="dropdownMenuButton-{{ user['user_id'] }}"
                      data-bs-toggle='dropdown'
                      data-bs-auto-close='outside'
                      aria-expanded='false'
                    >
                      <i className='fas fa-cog'></i>
                    </button>
                    <ul
                      className='dropdown-menu dropdown-menu-dark'
                      aria-labelledby="dropdownMenuButton-{{ user['user_id'] }}"
                    >
                      <li>
                        <button
                          className='dropdown-item btn btn-sm btn-primary'
                          data-bs-toggle='modal'
                          data-bs-target='#editUserModal'
                          onClick={() => setUserEdit(item.id)}
                        >
                          Sửa
                        </button>
                      </li>
                      <li>
                        <button
                          className='dropdown-item btn btn-sm btn-primary'
                          onClick={() => handleDeleteUser(item.id)}
                        >
                          Xóa
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            )
          })}

        <tr>
          <td
            colSpan={5}
            className='text-center'
          >
            <button
              className='btn btn-warning mt-3'
              data-bs-toggle='modal'
              data-bs-target='#addUserModal'
            >
              Add New User
            </button>
          </td>
        </tr>
      </tbody>
      <ModalAddUser
        isReload={isReload}
        setIsReload={setIsReload}
      />
      <ModalEditUser
        id={userEdit}
        isReload={isReload}
        setIsReload={setIsReload}
      />
    </>
  )
}

export default AdminTemplate
