import { createAutoSetting } from '@/api/auto.api'
import { IModalReloadProps } from '@/common/interface'
import { Button, Form, Input, InputNumber, Modal, Select, Switch } from 'antd'
import { toast } from 'react-toastify'

interface IModalAddSetting extends IModalReloadProps{
    isModalOpen: boolean
    setIsModalOpen: (isModalOpen: boolean) => void
}

export interface IAutoSettingParam {
  type: 'private' | 'public' | 'die' | 'undefined'
  lastCommentFrom?: number
  lastCommentTo?: number
  differenceCountCmtFrom?: number
  differenceCountCmtTo?: number
  delayFrom?: number
  delayTo?: number
  likeFrom?: number
  likeTo?: number
  diffTimeFrom?: number
  diffTimeTo?: number
  totalCmtTodayFrom?: number
  totalCmtTodayTo?: number
  isDelete: boolean
  onOff: boolean
  delay: number
}

function ModalAddSetting({ isReload, setIsReload, isModalOpen, setIsModalOpen}: IModalAddSetting) {
  const [form] = Form.useForm<IAutoSettingParam>()
  const initialValues = {
    isDelete: false,
    onOff: true,
    delay: 0,
    type: null,
    userId: null,
    keyword: '',
  }

    const handleCancel = () => {
        setIsModalOpen(false);
    };

  const onFinish = async () => {
    const values = form.getFieldsValue()
    console.log(values)
    const {
      delayFrom,
      delayTo,
      differenceCountCmtFrom,
      differenceCountCmtTo,
      lastCommentFrom,
      lastCommentTo,
      likeFrom,
      likeTo,
      diffTimeFrom,
      diffTimeTo,
      totalCmtTodayFrom,
      totalCmtTodayTo,
      type
    } = values
    if(!type) {
        toast.error('Loại không được bỏ trống')
        return       
    }

    if (
      (lastCommentFrom && !lastCommentTo) ||
      (!lastCommentFrom && lastCommentTo)
    ) {
        toast.error('Nhập thiếu thông tin cmt  comment count')
        return
    }
    if ((diffTimeFrom && !diffTimeTo) || (!diffTimeFrom && diffTimeTo)) {
      toast.error('Nhập thiếu thông tin chênh time')
      return
    }
    if (
      (totalCmtTodayFrom && !totalCmtTodayTo) ||
      (!totalCmtTodayFrom && totalCmtTodayTo)
    ) {
      toast.error('Nhập thiếu thông tin total cmt')
      return
    }
    if (
      (differenceCountCmtFrom && !differenceCountCmtTo) ||
      (!differenceCountCmtFrom && differenceCountCmtTo)
    ) {
      toast.error('Nhập thiếu thông tin chênh cmt')
      return
    }

    if ((likeFrom && !likeTo) || (!likeFrom && likeTo)) {
      toast.error('Nhập thiếu thông tin Like')
      return
    }

    if ((delayFrom && !delayTo) || (!delayFrom && delayTo)) {
      toast.error('Nhập thiếu thông tin delay')
      return
    }

    await createAutoSetting(values)
    setIsReload(!isReload)
    setIsModalOpen(false)
  }

  return (
      <Modal
        title="Basic Modal"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={500} 
      >
        <Form
            name="basic"
            labelCol={{ span: 13}}
            // wrapperCol={{ span: 14 }}
            style={{ maxWidth: 500 }}
            initialValues={initialValues}
            className='modal-add-setting'
            onFinish={onFinish}
            form={form}
        >
            <div className='modal-add-setting-property'>
                <div>
                    <Form.Item
                        label='Loại'
                        name='type'
                    >
                        <Select>
                            <Select.Option value={null}>Chọn</Select.Option>
                            <Select.Option value='private'>Private</Select.Option>
                            <Select.Option value='public'>Public</Select.Option>
                            <Select.Option value='die'>Die</Select.Option>
                            <Select.Option value='undefined'>Undefined</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label='Last comment time '
                        style={{ marginBottom: 0 }}
                    >
                    <Form.Item
                        name='lastCommentFrom'
                        style={{ display: 'inline-block', width: '50px' }}
                    >
                        <Input placeholder='Từ' />
                    </Form.Item>
                    <Form.Item
                        name='lastCommentTo'
                        style={{
                        display: 'inline-block',
                        width: '50px',
                        }}
                    >
                        <Input placeholder='đến' />
                    </Form.Item>
                    </Form.Item>
                    <Form.Item
                    label='Chênh time'
                    style={{ marginBottom: 0 }}
                    >
                    <Form.Item
                        name='diffTimeFrom'
                        style={{ display: 'inline-block', width: '50px' }}
                    >
                        <Input placeholder='Từ' />
                    </Form.Item>
                    <Form.Item
                        name='diffTimeTo'
                        style={{
                        display: 'inline-block',
                        width: '50px',
                        }}
                    >
                        <Input placeholder='đến' />
                    </Form.Item>
                    </Form.Item>
                    <Form.Item
                    label='Total cmt today'
                    style={{ marginBottom: 0 }}
                    >
                    <Form.Item
                        name='totalCmtTodayFrom'
                        style={{ display: 'inline-block', width: '50px' }}
                    >
                        <Input placeholder='Từ' />
                    </Form.Item>
                    <Form.Item
                        name='totalCmtTodayTo'
                        style={{
                        display: 'inline-block',
                        width: '50px',
                        }}
                    >
                        <Input placeholder='đến' />
                    </Form.Item>
                    </Form.Item>
                    <Form.Item
                        label='Chênh Cmt'
                        style={{ marginBottom: 0 }}
                    >
                        <Form.Item
                        name='differenceCountCmtFrom'
                        style={{ display: 'inline-block', width: '50px' }}
                        >
                        <Input placeholder='Từ' />
                        </Form.Item>
                        <Form.Item
                        name='differenceCountCmtTo'
                        style={{
                            display: 'inline-block',
                            width: '50px',
                        }}
                        >
                        <Input placeholder='đến' />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item
                        label='Like'
                        style={{ marginBottom: 0 }}
                    >
                        <Form.Item
                        name='likeFrom'
                        style={{ display: 'inline-block', width: '50px' }}
                        >
                        <Input placeholder='Từ' />
                        </Form.Item>
                        <Form.Item
                        name='likeTo'
                        style={{
                            display: 'inline-block',
                            width: '50px',
                        }}
                        >
                            <Input placeholder='đến' />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item
                        label='Delay'
                        style={{ marginBottom: 0 }}
                    >
                        <Form.Item
                        name='delayFrom'
                        style={{ display: 'inline-block', width: '50px' }}
                        >
                            <Input placeholder='Từ' />
                        </Form.Item>
                        <Form.Item
                        name='delayTo'
                        style={{
                            display: 'inline-block',
                            width: '50px',
                        }}
                        >
                            <Input placeholder='đến' />
                        </Form.Item>
                    </Form.Item>
                </div>
                <div>
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
                </div>                
            </div>


            <Form.Item label={null}>
                <Button
                    type='primary'
                    htmlType='submit'
                >
                    Submit
                </Button>
            </Form.Item>
        </Form>
      </Modal>
  )
}

export default ModalAddSetting
