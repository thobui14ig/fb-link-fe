import { createKeywords } from '@/api/setting.api'
import { customErrorToast } from '@/common/utils/toast'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export interface IKeyword {
  keywordShow: string
}
function Keyword({ keywordShow }: IKeyword) {
  const [keywords, setKeywords] = useState<string>('')

  const handleAdd = async () => {
    if (keywords.length === 0) {
      toast.error('Nội dung không được trống!')
      return
    }
    const keywordsValid = keywords
      .split('\n')
      .map((keyword) => keyword.trim())
      .filter((keyword) => keyword.length > 0)
      .map((item) => {
        return item
      })

    try {
      await createKeywords({ keywords: keywordsValid })
      toast('Thêm thành công!')
    } catch (error) {
      customErrorToast(error)
    }
  }

  useEffect(() => {
    setKeywords(keywordShow)
  }, [keywordShow])

  return (
    <div className='col-md-6 mb-3'>
      <h6
        className='text-center mb-3'
        style={{ color: '#ffc107' }}
      >
        Danh sách Từ Khóa
      </h6>
      <form id='keywordForm'>
        <div className='mb-3'>
          <label
            htmlFor='keywordTextarea'
            className='form-label'
          >
            Từ Khóa (mỗi từ khóa một dòng)
          </label>
          <textarea
            className='form-control'
            id='keywordTextarea'
            rows={8}
            value={keywords}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setKeywords(e.target.value)
            }}
            style={{
              backgroundColor: '#333',
              color: '#fff',
              border: '1px solid #444',
            }}
          ></textarea>
        </div>
        <div className='text-center'>
          <button
            type='button'
            className='btn btn-warning'
            onClick={() => handleAdd()}
          >
            Lưu
          </button>
        </div>
      </form>
    </div>
  )
}

export default Keyword
