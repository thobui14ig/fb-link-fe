import ApiConstant from '@/api/apiConstant'
import { getUserInfo } from '@/api/user.api'
import { ICurrentUserLogin, IUser } from '@/common/model/user'
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { io } from 'socket.io-client'

interface AppState {
  isAdmin: boolean | null
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean | null>>
  isReload: boolean
  setIsReload: React.Dispatch<React.SetStateAction<boolean>>
  userLogin: ICurrentUserLogin | null
  setUserLogin: React.Dispatch<React.SetStateAction<IUser | null>>
  handleSetCurrentUserLogin: (userLogin: IUser) => void
  logOut: () => void
  socket: any
}

export const SocketContext = createContext<AppState>({
  isAdmin: false,
  setIsAdmin: () => {},
  userLogin: null,
  setUserLogin: () => {},
  isReload: false,
  setIsReload: () => {},
  handleSetCurrentUserLogin: () => {},
  logOut: () => {},
  socket: null,
})

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [isReload, setIsReload] = useState(true)
  const [userLogin, setUserLogin] = useState<any>(null)
  const [socket, setSocket] = useState<any>(null)

  const handleSetCurrentUserLogin = (userLogin: IUser) => {
    setUserLogin(userLogin)
    setIsReload(false)
    setIsAdmin(userLogin.level === 1 ? true : false)
  }

  const logOut = () => {
    setUserLogin(null)
    setIsAdmin(false)
    localStorage.clear()
  }

  const values: AppState = {
    isAdmin,
    setIsAdmin,
    userLogin,
    setUserLogin,
    isReload,
    setIsReload,
    handleSetCurrentUserLogin,
    logOut,
    socket,
  }

  useEffect(() => {
    const fetch = async () => {
      const isLogin = localStorage.getItem('isLogin') || null

      if (isLogin) {
        const { data } = await getUserInfo()
        handleSetCurrentUserLogin(data)
        return
      }
    }
    fetch()
  }, [JSON.stringify(userLogin)])

  useEffect(() => {
    const socket = io(ApiConstant.BASE_URL_SOCKET, {
      // query: { phone: userInfo?.phone },
      secure: true,
    })
    socket.on('connect', () => {
      console.log('Connected to server admin page!.')
    })
    socket.on('error', (error) => {
      console.error('Socket connection error:', error)
    })
    socket.on('disconnect', () => {
      console.log('Disconnected from socket')
    })

    setSocket(socket)
  }, [])

  return (
    <SocketContext.Provider value={values}>{children}</SocketContext.Provider>
  )
}

export default AppProvider

export const useApp = (): AppState => {
  return useContext(SocketContext)
}
