import { IGetAllLink, settingLink } from '@/api/link.api'
import { IModalReloadProps } from '@/common/interface'
import { LinkStatus } from '@/common/model/link'
import { customErrorToast } from '@/common/utils/toast'
import { Form, InputNumber, Modal, Switch } from 'antd'
import { toast } from 'react-toastify'
export interface IPropModalSetting extends IModalReloadProps {
  isModalOpen: boolean
  setShowModal: (isModalOpen: boolean) => void
  links: IGetAllLink[]
  linkType: LinkStatus
}

export interface IForm {
  isDelete: boolean
  onOff: boolean
  delay: number
}

function ModalSetting({
  isModalOpen,
  setShowModal,
  isReload,
  setIsReload,
  links,
  linkType,
}: IPropModalSetting) {
  const [form] = Form.useForm<IForm>()
  const initialValues = {
    isDelete: false,
    onOff: linkType === LinkStatus.Started ? true : false,
    delay: 0,
  }
  const handleOk = () => {
    setShowModal(false)
    form.submit()
  }

  const handleCancel = () => {
    setShowModal(false)
  }

  const onFinish = async (values: IForm) => {
    try {
      await settingLink({
        ...values,
        linkIds: links.map((item) => item.id) as number[],
      })
      setIsReload(!isReload)
      toast.success('Update thành công!')
    } catch (error) {
      customErrorToast(error)
    }
  }

  return (
    <Modal
      title='Setting'
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout='horizontal'
        initialValues={initialValues}
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          label='Delete'
          valuePropName='checked'
          name='isDelete'
        >
          <Switch />
        </Form.Item>
        <Form.Item
          label='On/Off'
          valuePropName='checked'
          name='onOff'
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label='Delay'
          name='delay'
        >
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalSetting
