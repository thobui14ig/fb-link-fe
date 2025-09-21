import { useApp } from '@/common/store/AppContext'
import { Button, Modal } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

interface IPayloadMessage {
  commentId?: any
  userNameComment?: any
  commentMessage?: any
  phoneNumber?: string
  userIdComment?: any
  commentCreatedAt?: string
  linkId: number
  currentDate: string
}

export interface IPropInstruct {
  isModalOpen: boolean
  setIsModalOpen: (isModalOpen: boolean) => void
  linkId: number
}

function ModalCmd({ isModalOpen, setIsModalOpen, linkId }: IPropInstruct) {
  const { socket } = useApp()
  const [data, setData] = useState<IPayloadMessage[]>([])
  useEffect(() => {
    // join room
    socket.emit('joinLink', linkId)

    socket.on('linkResponse', (payload: IPayloadMessage) => {
      data.unshift({
        ...payload,
        currentDate: dayjs().format('DD-MM-YYYY HH:mm:ss'),
      })
      setData([...data])
    })

    return () => {
      socket.emit('leaveLink', linkId)
      socket.off('linkResponse')
    }
  }, [linkId])

  const handleClose = () => {
    setIsModalOpen(false)
    socket.emit('leaveLink', linkId)
    socket.off('linkResponse')
  }
  return (
    <Modal
      title='Cmd'
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
            <p key={i}>
              {item.currentDate} |{' '}
              {item.linkId && item.commentId ? item.commentMessage : 'null'}
            </p>
            <p>------------------------------------------</p>
          </>
        )
      })}
    </Modal>
  )
}

export default ModalCmd
