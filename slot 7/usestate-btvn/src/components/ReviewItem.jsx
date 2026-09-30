export default function ReviewItem({ review, displayNumber }) {
  return (
    <article className="review-row">
      <div className="d-flex justify-content-between gap-3">
        <strong>Đánh giá {displayNumber}</strong>
        <span className="review-stars" aria-label={`${review.rating} trên 5 sao`}>
          {'★'.repeat(review.rating)}
          <span className="text-secondary">{'★'.repeat(5 - review.rating)}</span>
        </span>
      </div>
      <p className="mb-0 mt-2">{review.comment}</p>
    </article>
  )
}