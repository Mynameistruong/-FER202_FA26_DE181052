import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="text-center py-5">
      <p className="eyebrow">404</p>
      <h1>Không tìm thấy trang</h1>
      <Button as={Link} to="/posts">Quay lại danh sách</Button>
    </div>
  )
}

export default NotFound
