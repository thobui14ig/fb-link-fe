import { Tab } from '@/common/constant'
import useTab from '@/common/hook/useTab'
import Keyword from './Keyword'
import Delay from './Delay'
import { useEffect, useState } from 'react'
import { IKeyword } from '@/common/model/keyword'
import { IDelay } from '@/common/model/delay'
import { getDelay, getKeywords } from '@/api/setting.api'

function Admin() {
  const { active } = useTab()
  const [keywords, setKeywords] = useState<IKeyword[] | null>(null)
  const [delay, setDelay] = useState<IDelay | null>(null)

  useEffect(() => {
    const fetch = async () => {
      const [keywordsResponse, delayResponse] = await Promise.all([
        getKeywords(),
        getDelay(),
      ])
      setKeywords(keywordsResponse.data)
      setDelay(delayResponse.data)
    }

    fetch()
  }, [])

  const keywordShow = keywords?.map((item) => item.keyword).join('\n')

  return (
    <div
      className={`tab-pane fade ${active(Tab.ADMIN)}`}
      id='pills-linksOn'
      role='tabpanel'
      aria-labelledby='pills-linksOn-tab'
    >
      <div
        className='card p-3'
        style={{ backgroundColor: '#1a1a1a', color: '#fff' }}
      >
        <h5
          className='text-center mb-4'
          style={{ color: '#ffc107' }}
        >
          Quản lý Admin
        </h5>

        <div className='row mb-5'>
          <Keyword keywordShow={keywordShow ?? ''} />
          <Delay _delay={delay} />
        </div>
      </div>
    </div>
  )
}

export default Admin
