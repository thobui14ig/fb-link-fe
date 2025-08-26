import { Button, Modal } from "antd"

export interface IPropInstruct {
    isModalOpen: boolean,
    setIsModalOpen: (isModalOpen: boolean) => void
}

function ModalInstruct({isModalOpen, setIsModalOpen}: IPropInstruct) {
  return (
      <Modal
        title="Hướng dẫn sử dụng VPS"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        footer={[
            <Button key="ok" type="primary" onClick={() => setIsModalOpen(false)}>
            OK
            </Button>,
          ]}
      >
        <section id="instruct-area">
            <p>1. Mỗi VPS mở tối đa service cho đến khi tốc độ cào dưới 1s là ok</p>
            <p>2. Nếu là VPS mới thì cài docker,  nếu là  VPS có sẵn thì chuyển qua bước 4:</p>
            <p style={{ marginLeft: 10 }}>- sudo apt update</p>
            <p style={{ marginLeft: 10 }}>- sudo apt install apt-transport-https ca-certificates curl software-properties-common</p>
            <p style={{ marginLeft: 10 }}>- curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg</p>
            <p style={{ marginLeft: 10 }}>- sudo apt update</p>
            <p style={{ marginLeft: 10 }}>- sudo apt install docker-ce</p>
            <p style={{ marginLeft: 10 }}>- sudo systemctl status docker</p>
        
            <p>3. Clone source "fb-sync-cmt"</p>
            <p>4. Chỉnh sửa docker-compose.yaml để thêm service, nhớ chỉnh sửa tên service, container_name, port(nên tăng dần và không được trùng)</p>
            <p>5. Gõ lệnh "docker-compose up -d --build" để build lại các service</p>   
            <p>6. Sau khi thêm service mới nhớ thêm vào màn quản lý VPS</p>   
              

        </section>
      </Modal>
  )
}

export default ModalInstruct