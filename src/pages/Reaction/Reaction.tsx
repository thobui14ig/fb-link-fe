import { IGetCommentParams } from '@/api/comment.api'
import { getLink } from '@/api/link.api'
import { getReactions, IGetReactionParams } from '@/api/reaction.api'
import { Tab } from '@/common/constant'
import useTab from '@/common/hook/useTab'
import { IReaction } from '@/common/model/reaction'
import { useApp } from '@/common/store/AppContext'
import { customErrorToast } from '@/common/utils/toast'
import Pagination from '@/components/Pagination/Pagination'
import { Button, DatePicker, Form, Input } from 'antd'
import dayjs from 'dayjs'
import { saveAs } from 'file-saver'
import { debounce } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import * as XLSX from 'xlsx'
import './reaction.css'
import ModalDetail from './ModalDetail'

function Reaction() {
  const { isAdmin } = useApp()
  const pageSizeDefault = isAdmin ? 1000 : 10000000
  const [form] = Form.useForm<IGetReactionParams>()
  const { active } = useTab()
  const [reactions, setReactions] = useState<IReaction[]>([])
  const [showPopover, setShowPopover] = useState<null | number>(null)
  const [contentPopover, setShowContentPopover] = useState<null | string>(null)
  const [page, setPage] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(pageSizeDefault)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [pageSizeOptions, setPageSizeOptions] = useState<string[]>([])
  const [isShowDetail, setIsShowDetail] = useState<boolean>(false)
  const initialValues: IGetReactionParams = {
    startDate: dayjs(),
    endDate: dayjs(),
  }

  useEffect(() => {
    const fetch = async () => {
      callApi(form.getFieldsValue())
    }

    fetch()
  }, [page, pageSize])

  useEffect(() => {
    const pageSizeDefault = isAdmin ? 1000 : 10000000
    const pageSizeOptions = isAdmin ? ['1000', '2000', '5000'] : ['10000000']

    setPageSizeOptions(pageSizeOptions)
    setPageSize(pageSizeDefault)
  }, [isAdmin])

  const onFinish = async () => {
    const pageSizeDefault = isAdmin ? 1000 : 10000000
    if (pageSize !== pageSizeDefault || page !== 0) {
      setPageSize(pageSizeDefault)
      setPage(0)
      return
    }
    return callApi(form.getFieldsValue())
  }

  const callApi = async (values: IGetCommentParams) => {
    const { data } = await getReactions({
      ...values,
      limit: pageSize,
      offset: pageSize * (page ? page - 1 : 0),
    })
    setTotalCount(data.totalCount)
    setReactions(data.data)
  }

  const downloadExcel = async () => {
    let allComment = []
    const { data } = await getReactions({
      ...form.getFieldsValue(),
      limit: 10000000000,
      offset: 0,
    })
    allComment = data.data
    const formattedData = allComment.map((item, index) => {
      const res: { [key: string]: any } = {
        STT: index + 1,
        Time: item.timeCreated,
        PostId: item.postId,
        'Tên bài': item.link.linkName,
        UID: item.uid,
        'Phone Number': item.phone || '',
        Name: item.name,
      }

      return res
    })

    const worksheet = XLSX.utils.json_to_sheet(formattedData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reactions')

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    })
    const dataBlob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    saveAs(dataBlob, 'reaction.xlsx')
  }

  const handlePopover = async (rid: number, linkId: number) => {
    try {
      const response = await getLink(linkId)
      setShowContentPopover(response.data.content)
      setShowPopover(rid)
    } catch (error) {
      customErrorToast(error)
    }
  }

  const handlePopoverDebounced = useCallback(
    debounce((rid: number, linkId: number) => {
      handlePopover(rid, linkId)
    }, 200), // delay 500ms
    []
  )

  const showDetail = () => {
    setIsShowDetail(true)
  }

  let stt = setReactions.length

  return (
    <div
      className={`tab-pane fade ${active(Tab.REACTION)}`}
      id='pills-linksOn'
      role='tabpanel'
      aria-labelledby='pills-linksOn-tab'
    >
      <div className='card p-3'>
        <h5
          className='text-center mb-4'
          style={{ color: '#ffc107' }}
        >
          Reaction
        </h5>
        <div className='mb-3 d-flex align-items-center'>
          <Form
            form={form}
            name='horizontal_login'
            layout='inline'
            className='white-label white-form'
            onFinish={onFinish}
            initialValues={{
              startDate: initialValues.startDate,
              endDate: initialValues.endDate,
              keyword: '',
            }}
          >
            <Form.Item
              label='Từ ngày'
              name='startDate'
            >
              <DatePicker />
            </Form.Item>

            <Form.Item
              label='Đến ngày'
              name='endDate'
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              label='Keyword'
              name='keyword'
            >
              <Input />
            </Form.Item>
            <Form.Item label={null}>
              <Button
                type='primary'
                htmlType='submit'
              >
                Submit
              </Button>
            </Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              onClick={() => downloadExcel()}
            >
              Download Excel
            </Button>
            <Form.Item label={null}></Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              onClick={() => showDetail()}
            >
              Chi tiết
            </Button>
          </Form>
        </div>

        <div className='table-responsive'>
          <table className='table table-striped table-dark'>
            <thead>
              <tr>
                <th>STT</th>
                <th>Time</th>
                {isAdmin && <th>Fb Name</th>}
                <th>Post ID</th>
                <th>Tên bài</th>
                <th>UID</th>
                <th>Phone</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody id='comments-table-body'>
              {reactions.length > 0 &&
                reactions.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{stt++}</td>
                      <td>{(item.timeCreated as any) ?? ''}</td>
                      {isAdmin && <td>{item.user.username}</td>}

                      <td
                        onMouseEnter={() => {
                          handlePopoverDebounced(item.id, Number(item.link.id))
                        }}
                        onMouseLeave={() => {
                          handlePopoverDebounced.cancel()
                          setShowPopover(null)
                        }}
                        className='post-id-popover'
                      >
                        {item.postId}
                        {showPopover && showPopover === item.id && (
                          <div className='popover'>{contentPopover}</div>
                        )}
                      </td>
                      <td>
                        <a
                          target='_blank'
                          href={`${item.link.linkUrl}`}
                          rel='noreferrer'
                        >
                          {item.link.linkName}
                        </a>
                      </td>
                      <td>{item.uid?.slice(0, 15)}</td>
                      <td>{item.phone}</td>
                      <td>
                        <a
                          target='_blank'
                          href={`https://www.facebook.com/${item.uid}`}
                          rel='noreferrer'
                        >
                          {item.name}
                        </a>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      </div>
      <div className='m-3'>
        <Pagination
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
          totalCount={totalCount}
          pageSizeOptions={pageSizeOptions}
        />
      </div>
      {isShowDetail && (
        <ModalDetail
          isModalOpen={isShowDetail}
          setIsModalOpen={setIsShowDetail}
        />
      )}
    </div>
  )
}

export default Reaction
