import { getTaskDetail, TaskDetailResponse } from '@/api/reaction.api'
import { showDate } from '@/common/utils/time'
import { Button, Modal } from 'antd'
import { useEffect, useState } from 'react'

export interface IPropInstruct {
  isModalOpen: boolean
  setIsModalOpen: (isModalOpen: boolean) => void
}

function ModalDetail({ isModalOpen, setIsModalOpen }: IPropInstruct) {
  const [data, setData] = useState<TaskDetailResponse[]>([])
  useEffect(() => {
    ;(async () => {
      const res = await getTaskDetail()
      setData(res.data)
    })()
  }, [isModalOpen])

  const handleClose = () => {
    setIsModalOpen(false)
  }
  return (
    <Modal
      title='Chi tiết'
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={isModalOpen}
      width={700}
      bodyStyle={{ height: 300, overflowY: 'auto' }} // chỉnh chiều cao nội dung
      footer={[
        <Button
          key='ok'
          type='primary'
          onClick={handleClose}
        >
          OK
        </Button>,
      ]}
    >
      {data.map((item, i) => {
        return (
          <>
            <p
              key={i}
              className='task-detail'
            >
              <span>Ngày: {showDate(item.createdAt)}</span>
              <span>Đang chạy: {item.totalRunning}</span>
              <span>Thành công: {item.totalSuccess}</span>
            </p>
          </>
        )
      })}
    </Modal>
  )
}

export default ModalDetail
