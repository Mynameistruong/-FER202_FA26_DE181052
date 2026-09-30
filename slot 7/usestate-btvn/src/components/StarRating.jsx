import { useState } from 'react'
import { RATING_LABELS } from '../data/ratingLabels.js'

export default function StarRating({ value, onChange, max = 5 }) {
  const [hovered, setHovered] = useState(0)
  const display = hovered || value

  return (
    <div onMouseLeave={() => setHovered(0)}>
      <div className="star-rating" role="group" aria-label="Chọn số sao">
        {Array.from({ length: max }, (_, index) => index + 1).map((star) => (
          <button
            key={star}
            type="button"
            className="star-button"
            aria-label={`${star} sao`}
            aria-pressed={value === star}
            onMouseEnter={() => setHovered(star)}
            onClick={() => onChange(star === value ? 0 : star)}
          >
            {star <= display ? '★' : '☆'}
          </button>
        ))}
      </div>
      <span className="small text-secondary">{RATING_LABELS[display] || 'Chưa đánh giá'}</span>
    </div>
  )
}