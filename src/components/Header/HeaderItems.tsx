import { EUrl } from '@/common/constant';
import { useApp } from '@/common/store/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';

export interface IHeaderItems {
    urlName: string,
    name: string,
    className: string
}

function HeaderItems({ urlName, className, name }: IHeaderItems) {
    const navigation = useNavigate();
    const location = useLocation();
    const { logOut } = useApp()
    const active = location.pathname.replace('/', '') === urlName ? "active" : ""

    const redirect = (value: string) => {
        if (value === EUrl.LOGOUT) {
            logOut()
            navigation(`/${EUrl.LOGIN}`)
            return
        }
        navigation(`/${value}`);
    }

    return (
        <li className="nav-item" role="presentation">
            <div className={`nav-link ${active}`} data-bs-toggle="pill" role="tab"
                aria-selected="true" onClick={() => redirect(urlName)}>
                <i className={className}></i> {name}
            </div>
        </li>
    )
}

export default HeaderItems