import { IGetAllLink, updateLinkDelete } from '@/api/link.api'
import { LinkStatus } from '@/common/model/link'
import { customErrorToast } from '@/common/utils/toast'
import { Form, Modal, Switch } from 'antd'
import { toast } from 'react-toastify'
export interface IPropModalSetting {
  isModalOpen: boolean
  setShowModal: (isModalOpen: boolean) => void
  links: IGetAllLink[]
  callApi: any
}

export interface IForm {
  folowScan: boolean
}

function ModalSetting({
  isModalOpen,
  setShowModal,
  links,
  callApi,
}: IPropModalSetting) {
  const [form] = Form.useForm<IForm>()
  const initialValues = {
    folowScan: false,
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
      const input: { status: LinkStatus; linkIds: number[] } = {
        linkIds: links?.map((item) => Number(item.id)) ?? [],
        status: values.folowScan ? LinkStatus.Started : LinkStatus.Pending,
      }

      await updateLinkDelete(input)
      await callApi({})
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
          label='Follow/Scan'
          valuePropName='checked'
          name='folowScan'
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalSetting
