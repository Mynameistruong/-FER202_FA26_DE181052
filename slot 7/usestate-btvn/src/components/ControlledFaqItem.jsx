import FaqItemView from './FaqItemView.jsx'

export default function ControlledFaqItem({ faq, isOpen, onToggle }) {
  return (
    <FaqItemView
      question={faq.question}
      answer={faq.answer}
      isOpen={isOpen}
      onToggle={onToggle}
    />
  )
}