import { createUser } from '@/api/user.api'
import { IModalReloadProps } from '@/common/interface'
import { closeModal } from '@/common/utils/bootstrap'
import { customErrorToast } from '@/common/utils/toast'
import { useState } from 'react'
import { toast } from 'react-toastify'

export interface IUserRegister {
  username: string | null
  password: string | null
  linkOffLimit: number | null
  linkOnLimit: number | null
  expiredAt: Date | null
}

const defaultValue = {
  username: null,
  password: null,
  linkOffLimit: null,
  linkOnLimit: null,
  expiredAt: null,
}

function ModalAddUser({ isReload, setIsReload }: IModalReloadProps) {
  const [userInfo, setUserInfo] = useState<IUserRegister>({ ...defaultValue })

  const handleAdd = async () => {
    const hasNull = Object.values(userInfo).some((value) => value === null)

    if (hasNull) {
      toast.error('Vui lòng điền đầy đủ thông tin!')
      return
    }

    try {
      await createUser(userInfo)
      setUserInfo({ ...defaultValue })
      setIsReload(!isReload)
      closeModal('addUserModal')
      toast('Tạo thành công!')
    } catch (error) {
      customErrorToast(error)
    }
  }

  return (
    <div
      className='modal fade'
      id='addUserModal'
      tabIndex={1}
      aria-labelledby='addUserModalLabel'
      aria-hidden='false'
    >
      <div className='modal-dialog'>
        <div
          className='modal-content'
          style={{ backgroundColor: '#1a1a1a', color: '#fff' }}
        >
          <div className='modal-header'>
            <h5
              className='modal-title'
              id='addUserModalLabel'
              style={{ color: '#ffc107' }}
            >
              Add New User
            </h5>
            <button
              type='button'
              className='btn-close btn-close-white'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body'>
            <form id='add-user-form'>
              <div className='row mb-3'>
                <div className='col-md-6'>
                  <label
                    htmlFor='username'
                    className='form-label'
                  >
                    Username
                  </label>
                  <input
                    type='email'
                    className='form-control'
                    id='username'
                    name='username'
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setUserInfo({
                        ...userInfo,
                        username: e.target.value,
                      })
                    }}
                    value={userInfo.username ?? ''}
                    style={{
                      backgroundColor: '#333',
                      color: '#fff',
                      border: '1px solid #444',
                    }}
                  />
                </div>
                <div className='col-md-6'>
                  <label
                    htmlFor='password'
                    className='form-label'
                  >
                    Password
                  </label>
                  <input
                    type='password'
                    className='form-control'
                    id='password'
                    name='password'
                    required
                    value={userInfo.password ?? ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setUserInfo({
                        ...userInfo,
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

              <div className='row mb-3'>
                <div className='col-md-6'>
                  <label
                    htmlFor='link_add_limit'
                    className='form-label'
                  >
                    Link On Limit
                  </label>
                  <input
                    type='number'
                    className='form-control'
                    id='link_add_limit'
                    name='link_add_limit'
                    required
                    value={userInfo.linkOnLimit ?? ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setUserInfo({
                        ...userInfo,
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
                    htmlFor='link_start_limit'
                    className='form-label'
                  >
                    Link Off Limit
                  </label>
                  <input
                    type='number'
                    className='form-control'
                    id='link_start_limit'
                    name='link_start_limit'
                    required
                    value={userInfo.linkOffLimit ?? ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setUserInfo({
                        ...userInfo,
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

              <div className='mb-3'>
                <label
                  htmlFor='expired_at'
                  className='form-label'
                >
                  Expiration Date
                </label>
                <input
                  type='date'
                  className='form-control'
                  id='expired_at'
                  name='expired_at'
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setUserInfo({
                      ...userInfo,
                      expiredAt: new Date(e.target.value).toDateString() as any,
                    })
                  }}
                  style={{
                    backgroundColor: '#333',
                    color: '#fff',
                    border: '1px solid #444',
                  }}
                />
              </div>
            </form>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              data-bs-dismiss='modal'
              onClick={() => {
                setUserInfo({ ...defaultValue })
              }}
            >
              Đóng
            </button>
            <button
              type='button'
              className='btn btn-warning'
              onClick={() => handleAdd()}
            >
              Add User
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalAddUser
