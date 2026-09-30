import { Container } from 'react-bootstrap'
import ReviewFormComponent from '../components/ReviewForm.jsx'

export default function ReviewForm() {
  return (
    <Container className="py-5 app-container">
      <header className="mb-4">
        <p className="eyebrow">useState · Bài 2</p>
        <h1 className="h2 mb-2">Đánh giá sản phẩm</h1>
        <p className="text-secondary mb-0">Component con nhận value và onChange như một ô nhập có điều khiển</p>
      </header>
      <ReviewFormComponent />
    </Container>
  )
}