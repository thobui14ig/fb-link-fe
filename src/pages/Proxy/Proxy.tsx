import { deleteProxy, getProxies } from "@/api/proxy.api"
import { Tab } from "@/common/constant"
import useTab from "@/common/hook/useTab"
import { IProxy } from "@/common/model/proxy"
import { useEffect, useState } from "react"
import ModalAddProxy from "./ModalAddProxy"
import { toast } from "react-toastify"
import { customErrorToast } from "@/common/utils/toast"

function Proxy() {
    const { active } = useTab()
    const [proxies, setProxies] = useState<IProxy[]>([]);
    const [isReload, setIsReload] = useState<boolean>(false)

    const handleDeleteProxy = async (id: number) => {
        try {
            await deleteProxy(id)
            setIsReload(!isReload)
            toast("Xóa thành công!")
        } catch (error) {
            customErrorToast(error)
        }
    }

    useEffect(() => {
        const fetch = async () => {
            const { data } = await getProxies()
            setProxies(data)
        }

        fetch()
    }, [isReload])

    return (
        <div className={`tab-pane fade ${active(Tab.PROXY)}`} id="pills-linksOn" role="tabpanel" aria-labelledby="pills-linksOn-tab">
            <div className="card p-3" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                <h5 className="text-center mb-4" style={{ color: '#ffc107' }}>Danh sách Proxy</h5>

                <div className="mb-3 text-center">
                    <button className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#addProxyModal">Thêm Proxy</button>
                </div>

                <div className="table-responsive">
                    <table className="table table-striped table-dark">
                        <thead>
                            <tr>
                                <th className="col-stt">STT</th>
                                <th className="col-proxy">Proxy</th>
                                <th>Tình Trạng</th>
                                <th className="col-action">Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {proxies.length > 0 &&
                                proxies.map((item, i) => {
                                    return (
                                        <tr>
                                            <td className="col-stt">{i + 1}</td>
                                            <td className="col-proxy">{item.proxyAddress}</td>
                                            <td>{item.status}</td>
                                            <td className="col-action">
                                                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteProxy(item.id)}>Xóa</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>

                <ModalAddProxy isReload={isReload} setIsReload={setIsReload} />
            </div>
        </div>
    )
}

export default Proxy