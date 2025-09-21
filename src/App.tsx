import '@/App.css'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from './components/Header/Header'
import { EUrl } from './common/constant'

function App() {
  const navigation = useNavigate()

  useEffect(() => {
    const isLogin = localStorage.getItem('isLogin') ?? null
    if (!isLogin) {
      navigation(`/${EUrl.LOGIN}`)
    }

    const pathname = location.pathname
    if (pathname === '/') {
      navigation(`/${EUrl.USERS}`)
    }
  }, [])

  return (
    <div className='contents mt-1'>
      <Header />
      <div
        className='tab-content'
        id='pills-tabContent'
      >
        <Outlet />
      </div>
    </div>
  )
}

export default App
