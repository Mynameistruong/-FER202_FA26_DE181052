import { Stack } from 'react-bootstrap'

export default function TodoHeader() {
  return (
    <Stack gap={2} className="mb-4">
      <span className="exercise-label">Exercise 4</span>
      <h1 className="mb-0">Todo List</h1>
      <p className="mb-0 text-secondary">
        Add new items and delete them when they are completed.
      </p>
    </Stack>
  )
}
