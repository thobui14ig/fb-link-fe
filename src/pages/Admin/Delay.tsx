import { createDelay } from '@/api/setting.api'
import { IDelay } from '@/common/model/delay'
import { customErrorToast } from '@/common/utils/toast'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export interface ICreateDelayParams
  extends Pick<
    IDelay,
    | 'refreshCookie'
    | 'refreshToken'
    | 'refreshProxy'
    | 'delayOnPublic'
    | 'delayOffPrivate'
    | 'delayOff'
    | 'delayCommentCount'
    | 'timeRemoveProxySlow'
    | 'vip'
    | 'popular'
  > {}

function Delay({ _delay }: { _delay: Partial<IDelay> | null }) {
  const [delay, setDelay] = useState<ICreateDelayParams>({
    refreshCookie: 0,
    refreshToken: 0,
    refreshProxy: 0,
    delayCommentCount: 0,
    delayOff: 0,
    delayOnPublic: 0,
    delayOffPrivate: 0,
    timeRemoveProxySlow: 20,
    vip: '',
    popular: '',
  })

  useEffect(() => {
    setDelay({
      refreshCookie: _delay?.refreshCookie ?? 0,
      refreshToken: _delay?.refreshToken ?? 0,
      refreshProxy: _delay?.refreshProxy ?? 0,
      delayCommentCount: _delay?.delayCommentCount ?? 0,
      delayOff: _delay?.delayOff ?? 0,
      delayOnPublic: _delay?.delayOnPublic ?? 0,
      delayOffPrivate: _delay?.delayOffPrivate ?? 0,
      timeRemoveProxySlow: _delay?.timeRemoveProxySlow ?? 20,
      vip: _delay?.vip ?? '',
      popular: _delay?.popular ?? '',
    })
  }, [_delay])

  const update = async () => {
    if (delay.delayOffPrivate != null) {
      delay.delayOffPrivate = Number(delay.delayOffPrivate)
    }
    if (delay.refreshProxy != null) {
      delay.refreshProxy = Number(delay.refreshProxy)
    }
    const isValid = Object.values(delay).some((value) => value == undefined)

    if (isValid) {
      toast.error('Gía trị không hợp lệ!')
      return
    }

    try {
      await createDelay(delay)
      toast('Lưu thành công!')
    } catch (error) {
      customErrorToast(error)
    }
  }

  return (
    <div className='col-md-6 '>
      <h6
        className='text-center '
        style={{ color: '#ffc107' }}
      >
        Cài đặt Delay
      </h6>
      <form id='delayForm'>
        <div className=''>
          <label
            htmlFor='delayLinkOn'
            className='form-label'
          >
            Refresh Cookie(Phút)
          </label>
          <input
            type='number'
            className='form-control'
            id='delayLinkOn'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDelay({
                ...delay,
                refreshCookie: Number(e.target.value),
              })
            }}
            value={delay.refreshCookie}
            style={{
              backgroundColor: '#333',
              color: '#fff',
              border: '1px solid #444',
            }}
            min='0'
          />
        </div>
        <div className=''>
          <label
            htmlFor='delayLinkOff'
            className='form-label'
          >
            Refresh Token(Phút)
          </label>
          <input
            type='number'
            className='form-control'
            id='delayLinkOff'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDelay({
                ...delay,
                refreshToken: Number(e.target.value),
              })
            }}
            value={delay.refreshToken}
            style={{
              backgroundColor: '#333',
              color: '#fff',
              border: '1px solid #444',
            }}
            min='0'
          />
        </div>
        <div className=''>
          <label
            htmlFor='delayCheck'
            className='form-label'
          >
            Refresh Proxy(Giây)
          </label>
          <input
            className='form-control'
            id='delayCheck'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDelay({
                ...delay,
                refreshProxy: e.target.value as any
              })
            }}
            value={delay.refreshProxy}
            style={{
              backgroundColor: '#333',
              color: '#fff',
              border: '1px solid #444',
            }}
            min='0'
          />
        </div>
        <div className=''>
          <label
            htmlFor='delayLinkOn'
            className='form-label'
          >
            Delay On Public(Giây)
          </label>
          <input
            type='number'
            className='form-control'
            id='delayLinkOn'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDelay({
                ...delay,
                delayOnPublic: Number(e.target.value),
              })
            }}
            value={delay.delayOnPublic}
            style={{
              backgroundColor: '#333',
              color: '#fff',
              border: '1px solid #444',
            }}
            min='0'
          />
        </div>
        <div className=''>
          <label htmlFor='delayLinkOn'>Delay Off Private(Giây)</label>
          <input
            className='form-control'
            id='link_start_limit'
            name='link_start_limit'
            required
            value={delay.delayOffPrivate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDelay({
                ...delay,
                delayOffPrivate: e.target.value as any,
              })
            }}
            style={{
              backgroundColor: '#333',
              color: '#fff',
              border: '1px solid #444',
            }}
          />
        </div>
        <div className=''>
          <label
            htmlFor='delayLinkOn'
            className='form-label'
          >
            Delay Off Public(Giây)
          </label>
          <input
            type='number'
            className='form-control'
            id='delayLinkOn'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDelay({
                ...delay,
                delayOff: Number(e.target.value),
              })
            }}
            value={delay.delayOff}
            style={{
              backgroundColor: '#333',
              color: '#fff',
              border: '1px solid #444',
            }}
          />
        </div>
        <div className=''>
          <label
            htmlFor='delayLinkOn'
            className='form-label'
          >
            Delay Comment Count(Phút)
          </label>
          <input
            type='number'
            className='form-control'
            id='delayLinkOn'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDelay({
                ...delay,
                delayCommentCount: Number(e.target.value),
              })
            }}
            value={delay.delayCommentCount}
            style={{
              backgroundColor: '#333',
              color: '#fff',
              border: '1px solid #444',
            }}
            min='0'
          />
        </div>
        <div className=''>
          <label
            htmlFor='delayLinkOn'
            className='form-label'
          >
            Time remove Proxy slow(Giây)
          </label>
          <input
            type='number'
            className='form-control'
            id='delayLinkOn'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDelay({
                ...delay,
                timeRemoveProxySlow: Number(e.target.value),
              })
            }}
            value={delay.timeRemoveProxySlow}
            style={{
              backgroundColor: '#333',
              color: '#fff',
              border: '1px solid #444',
            }}
            min='0'
          />
        </div>
        <div className=''>
          <label
            htmlFor='delayLinkOn'
            className='form-label'
          >
            Key Vip
          </label>
          <input
            className='form-control'
            id='vip'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDelay({
                ...delay,
                vip: String(e.target.value),
              })
            }}
            value={delay.vip}
            style={{
              backgroundColor: '#333',
              color: '#fff',
              border: '1px solid #444',
            }}
          />
        </div>
        <div className=''>
          <label
            htmlFor='delayLinkOn'
            className='form-label'
          >
            Key Thường
          </label>
          <input
            className='form-control'
            id='popular'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDelay({
                ...delay,
                popular: String(e.target.value),
              })
            }}
            value={delay.popular}
            style={{
              backgroundColor: '#333',
              color: '#fff',
              border: '1px solid #444',
            }}
          />
        </div>
        <div className='text-center'>
          <button
            type='button'
            className='btn btn-warning'
            onClick={() => update()}
          >
            Lưu
          </button>
        </div>
      </form>
    </div>
  )
}

export default Delay
