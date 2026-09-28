import { Stack } from 'react-bootstrap'

export default function ToggleHeader() {
  return (
    <Stack gap={2} className="text-center">
      <span className="exercise-label">Exercise 3</span>
      <h1 className="mb-0">Toggle Visibility</h1>
      <p className="mb-0 text-secondary">
        Click the button to show or hide a piece of text.
      </p>
    </Stack>
  )
}
