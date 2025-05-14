import { useApp } from "@/common/store/AppContext"

function UserTemplate() {
    const { userLogin } = useApp()

    return (
        <>
            <thead>
                <tr>
                    <th scope="col">Attribute</th>
                    <th scope="col">Value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Name</td>
                    <td>{userLogin?.email}</td>
                </tr>
                <tr>
                    <td>Total Public Links / Running Links</td>
                    <td>Đang xử lý</td>
                </tr>
                <tr>
                    <td>Total Private Links / Running Links</td>
                    <td>Đang xử lý</td>
                </tr>
                <tr>
                    <td>Registration Date</td>
                    <td>{userLogin?.createdAt}</td>
                </tr>
                <tr>
                    <td>Expiration Date</td>
                    <td>
                        <span className="expiration-days" data-expired-at="{{ user_info['expired_at'] }}">
                            Đang tính...
                        </span>
                    </td>
                </tr>
            </tbody>
        </>
    )
}

export default UserTemplate