import { Form, Input, InputNumber, Select, Switch } from 'antd'
import { IAutoSettingParam } from './ModalAddSetting'

export interface IParameter extends IAutoSettingParam {}

function Parameter({ params }: { params: IParameter }) {
  const {
    delay,
    isDelete,
    onOff,
    delayFrom,
    delayTo,
    lastCommentFrom,
    lastCommentTo,
    diffTimeFrom,
    diffTimeTo,
    differenceCountCmtFrom,
    differenceCountCmtTo,
    totalCmtTodayFrom,
    totalCmtTodayTo,
    likeFrom,
    likeTo,
  } = params
  return (
    <div className='parameter'>
      <div className='parameter-item'>
        <Form.Item
          label='Loại'
          style={{ width: '200px' }}
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
          label='Status'
          name='status'
          style={{ width: '200px' }}
        >
          <Select>
            <Select.Option value={null}>Chọn</Select.Option>
            <Select.Option value='pending'>Pending</Select.Option>
            <Select.Option value='started'>Started</Select.Option>
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
            <Input
              placeholder='Từ'
              defaultValue={lastCommentFrom}
            />
          </Form.Item>
          <Form.Item
            name='lastCommentTo'
            style={{
              display: 'inline-block',
              width: '50px',
            }}
          >
            <Input
              placeholder='đến'
              defaultValue={lastCommentTo}
            />
          </Form.Item>
        </Form.Item>
        <Form.Item
          label='Chênh time'
          style={{ marginLeft: 10 }}
        >
          <Form.Item
            name='diffTimeFrom'
            style={{ display: 'inline-block', width: '50px' }}
          >
            <Input
              placeholder='Từ'
              defaultValue={diffTimeFrom}
            />
          </Form.Item>
          <Form.Item
            name='diffTimeTo'
            style={{
              display: 'inline-block',
              width: '50px',
            }}
          >
            <Input
              placeholder='đến'
              defaultValue={diffTimeTo}
            />
          </Form.Item>
        </Form.Item>
        <Form.Item
          label='Total cmt today'
          style={{ marginLeft: 10 }}
        >
          <Form.Item
            name='totalCmtTodayFrom'
            style={{ display: 'inline-block', width: '50px' }}
          >
            <Input
              placeholder='Từ'
              defaultValue={totalCmtTodayFrom}
            />
          </Form.Item>
          <Form.Item
            name='totalCmtTodayTo'
            style={{
              display: 'inline-block',
              width: '50px',
            }}
          >
            <Input
              placeholder='đến'
              defaultValue={totalCmtTodayTo}
            />
          </Form.Item>
        </Form.Item>
      </div>
      <div className='parameter-item'>
        <Form.Item
          label='Chênh Cmt'
          style={{ marginBottom: 0 }}
        >
          <Form.Item
            name='differenceCountCmtFrom'
            style={{ display: 'inline-block', width: '50px' }}
          >
            <Input
              placeholder='Từ'
              defaultValue={differenceCountCmtFrom}
            />
          </Form.Item>
          <Form.Item
            name='differenceCountCmtTo'
            style={{
              display: 'inline-block',
              width: '50px',
            }}
          >
            <Input
              placeholder='đến'
              defaultValue={differenceCountCmtTo}
            />
          </Form.Item>
        </Form.Item>
        <Form.Item
          label='Like'
          style={{ marginLeft: 10 }}
        >
          <Form.Item
            name='likeFrom'
            style={{ display: 'inline-block', width: '50px' }}
          >
            <Input
              placeholder='Từ'
              defaultValue={likeFrom}
            />
          </Form.Item>
          <Form.Item
            name='likeTo'
            style={{
              display: 'inline-block',
              width: '50px',
            }}
          >
            <Input
              placeholder='đến'
              defaultValue={likeTo}
            />
          </Form.Item>
        </Form.Item>
        <Form.Item
          label='Delay'
          style={{ marginLeft: 10 }}
        >
          <Form.Item
            name='delayFrom'
            style={{ display: 'inline-block', width: '50px' }}
          >
            <Input
              placeholder='Từ'
              defaultValue={delayFrom}
            />
          </Form.Item>
          <Form.Item
            name='delayTo'
            style={{
              display: 'inline-block',
              width: '50px',
            }}
          >
            <Input
              placeholder='đến'
              defaultValue={delayTo}
            />
          </Form.Item>
        </Form.Item>
        <Form.Item
          label='Delete'
          valuePropName='checked'
          name='isDelete'
          style={{ marginLeft: 10 }}
        >
          <Switch defaultValue={isDelete} />
        </Form.Item>
        <Form.Item
          label='On/Off'
          valuePropName='checked'
          name='onOff'
          style={{ marginLeft: 10 }}
        >
          <Switch defaultValue={onOff} />
        </Form.Item>

        <Form.Item
          label='Delay'
          name='delay'
          style={{ marginLeft: 10 }}
        >
          <InputNumber defaultValue={delay} />
        </Form.Item>
      </div>
    </div>
  )
}

export default Parameter
