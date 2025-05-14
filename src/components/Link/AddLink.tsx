import useLink from '@/common/hook/useLink'
import { customErrorToast } from '@/common/utils/toast'
import { ELink } from '@/common/model/link'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

interface IAddLink {
  setIsReload: (isReload: boolean) => void
  isReload: boolean
  type: ELink
}
function AddLink({ isReload, setIsReload, type }: IAddLink) {
  const [link, setLink] = useState<string>('')
  const { addLink } = useLink()

  const handleAddLink = async () => {
    if (link.length === 0) {
      toast.error('Nội dung không được trống!')
      return
    }

    try {
      const response = await addLink(link, type)
      setIsReload(!isReload)
      setLink('')
      toast((response.data as any).message)
    } catch (error) {
      customErrorToast(error)
    }
  }

  return (
    <>
      <div className='mb-3'>
        <label
          htmlFor='linkUrl'
          className='form-label'
          style={{ color: '#fff' }}
        >
          {`Link URL( Ví dụ: https://www.facebook.com/61554559287748|Tên bài viết)`}
        </label>
        <textarea
          className='form-control'
          id='keywordTextarea'
          rows={8}
          style={{
            backgroundColor: '#333',
            color: '#fff',
            border: '1px solid #444',
          }}
          value={link}
          placeholder='Nhập URL bài viết'
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setLink(e.target.value)
          }}
        />
      </div>
      <div className='d-flex justify-content-center'>
        <button
          className='btn btn-primary mb-4'
          id='startButton'
          style={{ backgroundColor: '#007bff', border: 'none' }}
          onClick={() => handleAddLink()}
        >
          Start
        </button>
      </div>
    </>
  )
}

export default AddLink
