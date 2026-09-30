import { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import ControlledFaqItem from '../components/ControlledFaqItem.jsx'
import IndependentFaqItem from '../components/IndependentFaqItem.jsx'
import { FAQS } from '../data/faqs.js'

export default function FaqAccordion() {
  const [singleMode, setSingleMode] = useState(false)
  const [openId, setOpenId] = useState(null)

  function handleToggle(id) {
    setOpenId((current) => (current === id ? null : id))
  }

  function handleModeChange(event) {
    setSingleMode(event.target.checked)
    setOpenId(null)
  }

  return (
    <Container className="py-5 app-container">
      <header className="mb-4">
        <p className="eyebrow">useState · Bài 1</p>
        <h1 className="h2 mb-2">FAQ Accordion</h1>
        <p className="text-secondary mb-0">Boolean, toggle và nâng state lên component cha</p>
      </header>
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <Form.Check
          type="switch"
          id="single-mode"
          label="Chỉ mở một câu tại một thời điểm"
          checked={singleMode}
          onChange={handleModeChange}
        />
        <Button
          variant="outline-secondary"
          disabled={!singleMode || openId === null}
          onClick={() => setOpenId(null)}
        >
          Đóng tất cả
        </Button>
      </div>
      {singleMode
        ? FAQS.map((faq) => (
            <ControlledFaqItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => handleToggle(faq.id)}
            />
          ))
        : FAQS.map((faq) => <IndependentFaqItem key={faq.id} faq={faq} />)}
    </Container>
  )
}