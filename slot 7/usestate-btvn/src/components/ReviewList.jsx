import ReviewItem from './ReviewItem.jsx'

export default function ReviewList({ reviews }) {
  const average = reviews.length === 0
    ? '0.0'
    : (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)

  return (
    <section>
      <div className="d-flex flex-wrap align-items-baseline justify-content-between gap-2 mb-3">
        <h2 className="h5 mb-0">Nhận xét</h2>
        <p className="mb-0 text-secondary">Trung bình {average}/5 ({reviews.length} lượt)</p>
      </div>
      {reviews.length === 0 ? (
        <p className="text-secondary">Chưa có đánh giá nào.</p>
      ) : (
        reviews.map((review, index) => (
          <ReviewItem
            key={review.id}
            review={review}
            displayNumber={reviews.length - index}
          />
        ))
      )}
    </section>
  )
}