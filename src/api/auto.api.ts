import { IAutoSettingParam } from '@/pages/Setting/ModalAddSetting'
import http from './http'
import { IAuto } from '@/common/model/auto'

export const createAutoSetting = (setting: IAutoSettingParam) =>
  http.post(`/auto`, setting)
export const getAutoSetting = () => http.get<IAuto[]>(`/auto`)
export const deleteAutoSetting = (id: number) =>
  http.delete<null>(`/auto/${id}`)
export const updateAutoSetting = (id: number, setting: IAutoSettingParam) =>
  http.patch(`/auto/${id}`, setting)
