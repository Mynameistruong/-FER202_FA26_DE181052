import { useState } from 'react'
import { Container, Nav } from 'react-bootstrap'
import BmiCalculator from './usestate/BmiCalculator.jsx'
import FaqAccordion from './usestate/FaqAccordion.jsx'
import QuizApp from './usestate/QuizApp.jsx'
import ReviewForm from './usestate/ReviewForm.jsx'
import StudentManager from './usestate/StudentManager.jsx'

const EXERCISES = [
  { id: 'faq', label: 'Bài 1 · FAQ', component: FaqAccordion },
  { id: 'rating', label: 'Bài 2 · Đánh giá', component: ReviewForm },
  { id: 'bmi', label: 'Bài 3 · BMI', component: BmiCalculator },
  { id: 'students', label: 'Bài 4 · Sinh viên', component: StudentManager },
  { id: 'quiz', label: 'Bài 5 · Quiz', component: QuizApp },
]

export default function App() {
  const [activeExerciseId, setActiveExerciseId] = useState(EXERCISES[0].id)
  const activeExercise = EXERCISES.find((exercise) => exercise.id === activeExerciseId)
  const ActiveExercise = activeExercise.component

  return (
    <>
      <Container className="app-shell pt-4 pb-3">
        <header className="mb-3">
          <p className="eyebrow mb-1">React · Hook thực hành</p>
          <h1 className="h3 mb-0">useState BTVN</h1>
        </header>
        <Nav
          variant="pills"
          activeKey={activeExerciseId}
          onSelect={(key) => key && setActiveExerciseId(key)}
          className="exercise-nav flex-nowrap overflow-auto"
          aria-label="Chọn bài tập useState"
        >
          {EXERCISES.map((exercise) => (
            <Nav.Item key={exercise.id} className="flex-shrink-0">
              <Nav.Link eventKey={exercise.id}>{exercise.label}</Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </Container>
      <ActiveExercise key={activeExerciseId} />
    </>
  )
}