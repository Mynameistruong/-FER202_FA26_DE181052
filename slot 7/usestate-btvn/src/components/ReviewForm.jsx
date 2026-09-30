import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import ReviewList from './ReviewList.jsx'
import StarRating from './StarRating.jsx'

export default function ReviewForm() {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [reviews, setReviews] = useState([])

  const canSubmit = rating > 0 && comment.trim().length >= 5

  function handleSubmit(event) {
    event.preventDefault()
    if (!canSubmit) return

    setReviews((previous) => [
      { id: Date.now(), rating, comment: comment.trim() },
      ...previous,
    ])
    setRating(0)
    setComment('')
  }

  return (
    <>
      <section className="mb-5">
        <h2 className="h5 mb-3">Gửi đánh giá</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Chất lượng sản phẩm</Form.Label>
            <StarRating value={rating} onChange={setRating} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="review-comment">Nhận xét</Form.Label>
            <Form.Control
              as="textarea"
              id="review-comment"
              rows={3}
              minLength={5}
              placeholder="Viết ít nhất 5 ký tự"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
          </Form.Group>
          <Button type="submit" disabled={!canSubmit}>Gửi đánh giá</Button>
        </Form>
      </section>
      <ReviewList reviews={reviews} />
    </>
  )
}