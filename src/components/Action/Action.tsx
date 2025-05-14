
function Action() {
    return (
        <div className="dropdown">
            <button className="btn btn-sm btn-secondary dropdown-toggle" type="button"
                id="dropdownMenuButton-{{ user['user_id'] }}" data-bs-toggle="dropdown"
                data-bs-auto-close="outside" aria-expanded="false">
                <i className="fas fa-cog"></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-dark"
                aria-labelledby="dropdownMenuButton-{{ user['user_id'] }}">
                <li>
                    <button className="dropdown-item btn btn-sm btn-primary"
                        data-bs-toggle="modal" data-bs-target="#editUserModal"
                    >
                        Sửa
                    </button>
                </li>
                <li>
                    <button className="dropdown-item btn btn-sm btn-primary"
                    >
                        Xóa
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default Action