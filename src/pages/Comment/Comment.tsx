import { getComments } from '@/api/comment.api'
import { Tab } from '@/common/constant'
import useTab from '@/common/hook/useTab'
import { IComment } from '@/common/model/comment'
import { useEffect, useState } from 'react'

function Comment() {
  const { active } = useTab()
  const [comments, setComments] = useState<IComment[]>([])

  useEffect(() => {
    const fetch = async () => {
      const { data } = await getComments()
      setComments(data)
    }

    fetch()
  }, [])

  return (
    <div
      className={`tab-pane fade ${active(Tab.COMMENT)}`}
      id='pills-linksOn'
      role='tabpanel'
      aria-labelledby='pills-linksOn-tab'
    >
      <div className='card p-3'>
        <div className='mb-3 d-flex align-items-center'>
          <label
            htmlFor='start-date'
            className='me-2'
          >
            Từ ngày:
          </label>
          <input
            type='date'
            id='start-date'
            className='form-control me-2'
            style={{ width: '150px' }}
          />

          <label
            htmlFor='end-date'
            className='me-2'
          >
            Đến ngày:
          </label>
          <input
            type='date'
            id='end-date'
            className='form-control me-2'
            style={{ width: '150px' }}
          />

          <button className='btn btn-primary me-2'>Lọc</button>
          <button className='btn btn-success'>Download Excel</button>
        </div>

        <div className='table-responsive'>
          <table className='table table-striped table-dark'>
            <thead>
              <tr>
                <th>STT</th>
                <th>UID</th>
                <th>Name</th>
                <th>Message</th>
                <th>Time</th>
                <th>Post ID</th>
                <th>Phone Number</th>
                <th>User Email</th>
              </tr>
            </thead>
            <tbody id='comments-table-body'>
              {comments.length > 0 &&
                comments.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>
                        <a
                          target='_blank'
                          href={`https://www.facebook.com/${item.uid}`}
                          rel='noreferrer'
                        >
                          {item.uid}
                        </a>
                      </td>
                      <td>{item.name}</td>
                      <td>{item.message}</td>
                      <td>{(item.timeCreated as any) ?? ''}</td>
                      <td>
                        <a
                          target='_blank'
                          href={item?.link.linkUrl}
                          rel='noreferrer'
                        >
                          {item.postId}
                        </a>
                      </td>
                      <td>{item.phoneNumber}</td>
                      <td>{item.user.email}</td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Comment
