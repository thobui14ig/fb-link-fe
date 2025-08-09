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
          <td>Total Link On / Limit Link On</td>
          <td>
            {userLogin?.totalLinkOn}/{userLogin?.linkOnLimit}
          </td>
        </tr>
        <tr>
          <td>Total Link Off / Limit Link Off</td>
          <td>
            {userLogin?.totalLinkOff}/{userLogin?.linkOffLimit}
          </td>
        </tr>
        <tr>
          <td>Total Link On Hide / Limit Link On Hide</td>
          <td>
            {userLogin?.totalLinkOnHide}/{userLogin?.linkOnHideLimit}
          </td>
        </tr>
        <tr>
          <td>Total Link Off Hide / Limit Link Off Hide</td>
          <td>
            {userLogin?.totalLinkOff}/{userLogin?.linkOffHideLimit}
          </td>
        </tr>
        {/* <tr>
          <td>Registration Date</td>
          <td>{userLogin?.createdAt}</td>
        </tr> */}
        <tr>
          <td>Total Comments To Day</td>
          <td>{userLogin?.totalComments}</td>
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
