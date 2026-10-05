import { useState } from 'react'
import { Badge, Container, Form, Stack } from 'react-bootstrap'
import StepCounter from './components/useReducer/StepCounter.jsx'
import OrderTracker from './components/useReducer/OrderTracker.jsx'
import KanbanBoard from './components/useReducer/KanbanBoard.jsx'
import CourseWizard from './components/useReducer/CourseWizard.jsx'
import NotesBoard from './components/useReducer/NotesBoard.jsx'

const EXERCISES = [
  { id: 'counter', label: 'Bài 1 · Bộ đếm', component: StepCounter },
  { id: 'order', label: 'Bài 2 · Đơn hàng', component: OrderTracker },
  { id: 'kanban', label: 'Bài 3 · Kanban', component: KanbanBoard },
  { id: 'wizard', label: 'Bài 4 · Đăng ký khóa học', component: CourseWizard },
  { id: 'notes', label: 'Bài 5 · Ghi chú Undo/Redo', component: NotesBoard },
]

export default function App() {
  const [exerciseId, setExerciseId] = useState(EXERCISES[0].id)
  const exercise = EXERCISES.find(({ id }) => id === exerciseId) ?? EXERCISES[0]
  const Exercise = exercise.component

  return (
    <main className="app-shell">
      <Container className="py-4 py-md-5">
        <Stack direction="horizontal" className="app-heading align-items-end justify-content-between flex-wrap gap-3 mb-4">
          <div>
            <p className="counter-eyebrow mb-1">React · State management</p>
            <h1 className="app-title mb-1">useReducer</h1>
            <p className="text-secondary mb-0">Năm bài thực hành reducer</p>
          </div>
          <Form.Group controlId="exercise-select" className="exercise-picker">
            <Form.Label className="small fw-semibold mb-1">Bài tập</Form.Label>
            <Form.Select value={exerciseId} onChange={(event) => setExerciseId(event.target.value)}>
              {EXERCISES.map(({ id, label }) => <option key={id} value={id}>{label}</option>)}
            </Form.Select>
          </Form.Group>
        </Stack>
        <section className="exercise-stage" key={exercise.id}>
          <div className="d-flex align-items-center gap-2 mb-3">
            <Badge bg="success">{exercise.label}</Badge>
          </div>
          <Exercise />
        </section>
      </Container>
    </main>
  )
}
