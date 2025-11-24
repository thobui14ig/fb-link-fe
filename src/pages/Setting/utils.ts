import { toast } from 'react-toastify'
import { IAutoSettingParam } from './ModalAddSetting'

const validateFormAuto = (values: IAutoSettingParam) => {
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
    type,
    status,
  } = values
  if (!type) {
    toast.error('Loại không được bỏ trống')
    return
  }
  if (!status) {
    toast.error('Status không được bỏ trống')
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

  return true
}
export { validateFormAuto }
