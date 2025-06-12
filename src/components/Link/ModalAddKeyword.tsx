import { getKeywordByLinkId } from '@/api/link.api'
import { createKeywordsLink } from '@/api/setting.api'
import { IModalReloadProps } from '@/common/interface'
import { customErrorToast } from '@/common/utils/toast'
import { Modal } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export interface IPropAddKeyword extends IModalReloadProps {
  isModalOpen: boolean
  setShowModal: (isModalOpen: boolean) => void
  linkId: number
}

function ModalAddKeyword({
  isReload,
  setIsReload,
  isModalOpen,
  setShowModal,
  linkId,
}: IPropAddKeyword) {
  const [keywords, setKeyword] = useState<string>('')

  const handleOk = async () => {
    setShowModal(false)
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
      const response = await createKeywordsLink({
        keywords: keywordsValid,
        linkId,
      })
      setIsReload(!isReload)
      setKeyword('')
      toast((response.data as any).message)
    } catch (error) {
      customErrorToast(error)
    }
  }

  const handleCancel = () => {
    setShowModal(false)
  }

  useEffect(() => {
    const fetch = async () => {
      const { data } = await getKeywordByLinkId(Number(linkId))
      const keywords = data.keywords.map((item) => item.keyword).join('\n')
      setKeyword(keywords)
    }

    fetch()
  }, [isModalOpen])

  return (
    <Modal
      title='Add keywords'
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <TextArea
        rows={4}
        value={keywords ?? ''}
        onChange={(e) => setKeyword(e.target.value)}
      />
    </Modal>
  )
}

export default ModalAddKeyword
