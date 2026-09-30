import { useState } from 'react'
import { Container } from 'react-bootstrap'
import Quiz from '../components/Quiz.jsx'

export default function QuizApp() {
  const [attempt, setAttempt] = useState(1)

  return (
    <Container className="py-5 app-container">
      <header className="mb-4">
        <p className="eyebrow">useState · Bài 5</p>
        <h1 className="h2 mb-2">Quiz trắc nghiệm</h1>
        <p className="text-secondary mb-0">Lazy initializer, object answers và reset toàn bộ state bằng key</p>
      </header>
      <Quiz
        key={attempt}
        attempt={attempt}
        onRestart={() => setAttempt((previous) => previous + 1)}
      />
    </Container>
  )
}