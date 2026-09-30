import { useState } from 'react'
import FaqItemView from './FaqItemView.jsx'

export default function IndependentFaqItem({ faq }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <FaqItemView
      question={faq.question}
      answer={faq.answer}
      isOpen={isOpen}
      onToggle={() => setIsOpen((open) => !open)}
    />
  )
}