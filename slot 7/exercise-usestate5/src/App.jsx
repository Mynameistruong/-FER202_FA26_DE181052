import { useState } from 'react'
import { Card, Container, Stack } from 'react-bootstrap'
import ColorPreview from './components/ColorPreview'
import ColorSelector from './components/ColorSelector'
import './App.css'

const colorOptions = [
  { label: 'Red', value: '#dc3545' },
  { label: 'Blue', value: '#0d6efd' },
  { label: 'Green', value: '#198754' },
  { label: 'Yellow', value: '#ffc107' },
]

export default function App() {
  const [selectedColor, setSelectedColor] = useState('')

  const activeColor =
    colorOptions.find((color) => color.value === selectedColor) ?? null

  return (
    <main className="page-shell">
      <Container>
        <Card className="exercise-card border-0 mx-auto">
          <Card.Body>
            <Stack gap={4}>
              <header>
                <span className="exercise-label">Exercise 5</span>
                <h1>Color Switcher</h1>
                <p className="text-secondary mb-0">
                  Select a color to change the preview background.
                </p>
              </header>
              <div className="color-layout">
                <ColorSelector
                  colors={colorOptions}
                  selectedColor={selectedColor}
                  onColorChange={setSelectedColor}
                />
                <ColorPreview color={activeColor?.value} />
              </div>
            </Stack>
          </Card.Body>
        </Card>
      </Container>
    </main>
  )
}
