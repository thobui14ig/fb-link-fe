
import { login } from '@/api/auth.api';
import { useApp } from '@/common/store/AppContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './login.css';
import { EAuth, EUrl } from '@/common/constant';

export interface IDataLogin {
    email: string | null;
    password: string | null
}

function Login() {
    const navigation = useNavigate();
    const { handleSetCurrentUserLogin } = useApp()
    const [dataLogin, setDataLogin] = useState<IDataLogin>({
        email: null,
        password: null
    })

    const onLogin = async () => {
        const hasNull = Object.values(dataLogin).some(value => value === null);

        if (hasNull) {
            toast.error('Vui lòng điền đầy đủ thông tin!');
            return;
        }
        return login(dataLogin).then((dataLogin) => {
            const { data } = dataLogin || {}
            localStorage.setItem(EAuth.RE_FRESSH_TOKEN, data.token.refreshToken);
            localStorage.setItem(EAuth.IS_LOGIN, "1");
            handleSetCurrentUserLogin(data.info)
            navigation(`/${EUrl.USERS}`)
        }).catch(() => {
            toast.error('Lỗi đăng nhập.')
        })
    }

    return (
        <body className='login'>
            <div className="login-container">
                <div className="login-header">
                    <div className="brand">
                        <h3>VUASALE.COM</h3>
                        <small>Quản lý khách hàng Facebook dễ dàng và hiệu quả!</small>
                    </div>
                </div>

                <div className="login-body">
                    <form id="loginForm">
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                id="emailAddress"
                                name="email"
                                placeholder="Email Address"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setDataLogin({
                                        ...dataLogin,
                                        email: e.target.value
                                    })
                                }}
                                required />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Password"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setDataLogin({
                                        ...dataLogin,
                                        password: e.target.value
                                    })
                                }}
                                required />
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="rememberMe" name="remember_me" />
                            <label className="form-check-label" >
                                Remember Me
                            </label>
                        </div>
                        <div className="login-buttons">
                            <button type="button" className="btn-signin" onClick={() => onLogin()}>Sign me in</button>
                        </div>
                    </form>
                </div>
            </div>
        </body>
    )
}

export default Login