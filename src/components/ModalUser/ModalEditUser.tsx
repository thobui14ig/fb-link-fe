import { getUser, updateUser } from '@/api/user.api'
import { IModalReloadProps } from '@/common/interface'
import { IUser } from '@/common/model/user'
import { closeModal } from '@/common/utils/bootstrap'
import { customErrorToast } from '@/common/utils/toast'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export interface IModalEditUser extends IModalReloadProps {
  id: number | null
}

function ModalEditUser({ id, isReload, setIsReload }: IModalEditUser) {
  const [user, setUser] = useState<IUser | null>(null)

  const handleEdit = async () => {
    try {
      user && (await updateUser(user))
      setIsReload(!isReload)
      toast('Update thành công!')
      closeModal('editUserModal')
    } catch (error) {
      customErrorToast(error)
    }
  }

  const handleChangeLevel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUser({ ...(user as IUser), level: Number(e.target.value) })
  }

  useEffect(() => {
    const fetch = async () => {
      const { data } = await getUser(Number(id))
      setUser(data)
    }

    fetch()
  }, [id])

  return (
    <div
      className='modal fade'
      id='editUserModal'
      tabIndex={-1}
      aria-labelledby='editUserModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog'>
        <div
          className='modal-content'
          style={{ backgroundColor: '#1a1a1a', color: '#fff' }}
        >
          {user && (
            <>
              <div className='modal-header'>
                <h5
                  className='modal-title'
                  id='editUserModalLabel'
                  style={{ color: '#ffc107' }}
                >
                  Edit User
                </h5>
                <button
                  type='button'
                  className='btn-close btn-close-white'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                ></button>
              </div>

              <div className='modal-body'>
                <form id='edit-user-form'>
                  <input
                    type='hidden'
                    id='editUserId'
                  />

                  <div className='row mb-3'>
                    <div className='col-md-6'>
                      <label
                        htmlFor='editUsername'
                        className='form-label'
                      >
                        Username
                      </label>
                      <input
                        type='username'
                        className='form-control'
                        id='editUsername'
                        name='username'
                        required
                        value={user.username}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setUser({
                            ...user,
                            username: e.target.value,
                          })
                        }}
                        style={{
                          backgroundColor: '#333',
                          color: '#fff',
                          border: '1px solid #444',
                        }}
                      />
                    </div>
                    <div className='col-md-6'>
                      <label
                        htmlFor='editPassword'
                        className='form-label'
                      >
                        Password
                      </label>
                      <input
                        type='password'
                        className='form-control'
                        id='editPassword'
                        name='password'
                        value={user.password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setUser({
                            ...user,
                            password: e.target.value,
                          })
                        }}
                        style={{
                          backgroundColor: '#333',
                          color: '#fff',
                          border: '1px solid #444',
                        }}
                      />
                    </div>
                  </div>

                  {/* Link Start/Add Limits */}
                  <div className='row mb-3'>
                    <div className='col-md-6'>
                      <label
                        htmlFor='editLinkOnLimit'
                        className='form-label'
                      >
                        Link On Limit
                      </label>
                      <input
                        type='number'
                        className='form-control'
                        id='editLinkOnLimit'
                        name='link_add_limit'
                        required
                        value={user.linkOnLimit}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setUser({
                            ...user,
                            linkOnLimit: Number(e.target.value),
                          })
                        }}
                        style={{
                          backgroundColor: '#333',
                          color: '#fff',
                          border: '1px solid #444',
                        }}
                      />
                    </div>
                    <div className='col-md-6'>
                      <label
                        htmlFor='editLinkOffLimit'
                        className='form-label'
                      >
                        Link Off Limit
                      </label>
                      <input
                        type='number'
                        className='form-control'
                        id='editLinkOffLimit'
                        name='link_start_limit'
                        required
                        value={user.linkOffLimit}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setUser({
                            ...user,
                            linkOffLimit: Number(e.target.value),
                          })
                        }}
                        style={{
                          backgroundColor: '#333',
                          color: '#fff',
                          border: '1px solid #444',
                        }}
                      />
                    </div>
                  </div>

                  <div className='row mb-3'>
                    <div className='col-md-6'>
                      <label
                        htmlFor='editLinkOnLimit'
                        className='form-label'
                      >
                        Link On Hide Limit
                      </label>
                      <input
                        type='number'
                        className='form-control'
                        id='editLinkOnLimit'
                        name='link_add_limit'
                        required
                        value={user.linkOnHideLimit}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setUser({
                            ...user,
                            linkOnHideLimit: Number(e.target.value),
                          })
                        }}
                        style={{
                          backgroundColor: '#333',
                          color: '#fff',
                          border: '1px solid #444',
                        }}
                      />
                    </div>
                    <div className='col-md-6'>
                      <label
                        htmlFor='editLinkOffLimit'
                        className='form-label'
                      >
                        Link Off Hide Limit
                      </label>
                      <input
                        type='number'
                        className='form-control'
                        id='editLinkOffLimit'
                        name='link_start_limit'
                        required
                        value={user.linkOffHideLimit}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setUser({
                            ...user,
                            linkOffHideLimit: Number(e.target.value),
                          })
                        }}
                        style={{
                          backgroundColor: '#333',
                          color: '#fff',
                          border: '1px solid #444',
                        }}
                      />
                    </div>
                  </div>

                  {/* Expiration & Level */}
                  <div className='row mb-3'>
                    <div className='col-md-6'>
                      <label
                        htmlFor='editExpiredAt'
                        className='form-label'
                      >
                        Expiration Date
                      </label>
                      <input
                        type='date'
                        className='form-control'
                        id='editExpiredAt'
                        name='expired_at'
                        value={dayjs(user.expiredAt).format('YYYY-MM-DD')}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setUser({
                            ...user,
                            expiredAt: dayjs(e.target.value) as any,
                          })
                        }}
                        required
                        style={{
                          backgroundColor: '#333',
                          color: '#fff',
                          border: '1px solid #444',
                        }}
                      />
                    </div>
                    <div className='col-md-6'>
                      <label
                        htmlFor='editLevel'
                        className='form-label'
                      >
                        Level
                      </label>
                      <select
                        className='form-control'
                        id='editLevel'
                        name='level'
                        style={{
                          backgroundColor: '#333',
                          color: '#fff',
                          border: '1px solid #444',
                        }}
                        onChange={(e) => handleChangeLevel(e)}
                        value={user.level}
                      >
                        <option value='0'>User (Level 0)</option>
                        <option value='1'>Admin (Level 1)</option>
                      </select>
                    </div>
                  </div>

                <div className='row mb-3'>
                  <div className='col-md-6'>
                      <label
                        htmlFor='link_start_limit'
                        className='form-label'
                      >
                        Delay on Private
                      </label>
                      <input
                        type='number'
                        className='form-control'
                        id='link_start_limit'
                        name='link_start_limit'
                        required
                        value={user.delayOnPrivate ?? 5}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setUser({
                            ...user,
                            delayOnPrivate: Number(e.target.value),
                          })
                        }}
                        style={{
                          backgroundColor: '#333',
                          color: '#fff',
                          border: '1px solid #444',
                        }}
                      />
                    </div>                
                </div>
                </form>
              </div>

              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-bs-dismiss='modal'
                >
                  Đóng
                </button>
                <button
                  type='button'
                  className='btn btn-warning'
                  onClick={() => handleEdit()}
                >
                  Lưu
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ModalEditUser
