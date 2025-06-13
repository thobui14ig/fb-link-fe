import { useApp } from '@/common/store/AppContext'

function UserTemplate() {
  const { userLogin } = useApp()

  return (
    <>
      <thead>
        <tr>
          <th scope='col'>Attribute</th>
          <th scope='col'>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Name</td>
          <td>{userLogin?.username}</td>
        </tr>
        <tr>
          <td>Total Public Links / Running Links</td>
          <td>
            {userLogin?.totalPublic}/{userLogin?.totalPublicRunning}
          </td>
        </tr>
        <tr>
          <td>Total Private Links / Running Links</td>
          <td>
            {userLogin?.totalPrivate}/{userLogin?.totalPrivateRunning}
          </td>
        </tr>
        <tr>
          <td>Registration Date</td>
          <td>{userLogin?.createdAt}</td>
        </tr>
        <tr>
          <td>Expiration Date</td>
          <td>
            <span
              className='expiration-days'
              data-expired-at="{{ user_info['expired_at'] }}"
            >
              {userLogin?.expiredAt}
            </span>
          </td>
        </tr>
      </tbody>
    </>
  )
}

export default UserTemplate
