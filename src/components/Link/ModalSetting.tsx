import { getLinks, IGetAllLink, settingLink } from '@/api/link.api'
import { IModalReloadProps } from '@/common/interface'
import { ELink, LinkStatus } from '@/common/model/link'
import { useApp } from '@/common/store/AppContext'
import { getTypeLink, isLinkHide } from '@/common/utils'
import { customErrorToast } from '@/common/utils/toast'
import { Form, InputNumber, Modal, Switch } from 'antd'
import { toast } from 'react-toastify'
export interface IPropModalSetting extends IModalReloadProps {
  isModalOpen: boolean
  setShowModal: (isModalOpen: boolean) => void
  links: IGetAllLink[]
  linkStatus: LinkStatus
  type: ELink
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
  linkStatus,
  type,
}: IPropModalSetting) {
  const { isAdmin } = useApp()
  const [form] = Form.useForm<IForm>()
  const initialValues = {
    isDelete: false,
    onOff: linkStatus === LinkStatus.Started ? true : false,
    delay: 0,
  }
  const linkType =
    type === ELink.LINK_ON ? LinkStatus.Started : LinkStatus.Pending

  const handleOk = () => {
    setShowModal(false)
    form.submit()
  }

  const handleCancel = () => {
    setShowModal(false)
  }

  const onFinish = async (values: IForm) => {
    try {
      const filterItemValue = localStorage.getItem('filterLink')
      const data = await getLinks(
        JSON.parse(filterItemValue ?? ''),
        linkType,
        1,
        isLinkHide(type) ? 1 : 0,
        10000000000,
        0
      )
      await settingLink({
        ...values,
        linkIds: data.data.data.map((item) => item.id) as number[],
        hideCmt:
          type === ELink.LINK_ON_HIDE || type === ELink.LINK_OFF_HIDE
            ? true
            : false,
        type: getTypeLink(type),
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

        {isAdmin && (
          <Form.Item
            label='Delay'
            name='delay'
          >
            <InputNumber />
          </Form.Item>
        )}
      </Form>
    </Modal>
  )
}

export default ModalSetting
