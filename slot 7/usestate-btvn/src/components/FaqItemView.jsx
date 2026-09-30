import { Card } from 'react-bootstrap'

export default function FaqItemView({ question, answer, isOpen, onToggle }) {
  return (
    <Card className="mb-3">
      <Card.Header className="p-0">
        <button
          type="button"
          className="faq-trigger"
          aria-expanded={isOpen}
          onClick={onToggle}
        >
          <span>{question}</span>
          <span aria-hidden="true">{isOpen ? '−' : '+'}</span>
        </button>
      </Card.Header>
      {isOpen && <Card.Body>{answer}</Card.Body>}
    </Card>
  )
}