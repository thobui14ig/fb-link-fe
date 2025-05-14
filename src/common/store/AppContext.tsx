import { getUserInfo } from '@/api/user.api';
import { IUser } from '@/common/model/user';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface AppState {
    isAdmin: boolean;
    setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
    isReload: boolean;
    setIsReload: React.Dispatch<React.SetStateAction<boolean>>;
    userLogin: IUser | null;
    setUserLogin: React.Dispatch<React.SetStateAction<IUser | null>>;
    handleSetCurrentUserLogin: ((userLogin: IUser) => void)
    logOut: () => void
}

export const SocketContext = createContext<AppState>({
    isAdmin: false,
    setIsAdmin: () => { },
    userLogin: null,
    setUserLogin: () => { },
    isReload: false,
    setIsReload: () => { },
    handleSetCurrentUserLogin: () => { },
    logOut: () => { }
});

const AppProvider = ({ children }: { children: ReactNode }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isReload, setIsReload] = useState(true);
    const [userLogin, setUserLogin] = useState<null | IUser>(null);

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
        logOut
    };

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
    }, [])

    return (
        <SocketContext.Provider value={values}>
            {children}
        </SocketContext.Provider>
    );
};

export default AppProvider;

export const useApp = (): AppState => {
    return useContext(SocketContext);
};