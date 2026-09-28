import { useState } from 'react'
import { Card, Container, ListGroup, Stack } from 'react-bootstrap'
import './App.css'

const initialItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']

export default function App() {
  const [items, setItems] = useState(initialItems)
  const [draggingIndex, setDraggingIndex] = useState(null)

  function handleDragStart(index) {
    setDraggingIndex(index)
  }

  function handleDrop(dropIndex) {
    if (draggingIndex === null || draggingIndex === dropIndex) return

    setItems((currentItems) => {
      const reorderedItems = [...currentItems]
      const [draggedItem] = reorderedItems.splice(draggingIndex, 1)
      reorderedItems.splice(dropIndex, 0, draggedItem)
      return reorderedItems
    })
    setDraggingIndex(null)
  }

  function handleDragEnd() {
    setDraggingIndex(null)
  }

  return (
    <main className="page-shell">
      <Container>
        <Card className="exercise-card border-0 mx-auto">
          <Card.Body>
            <Stack gap={4}>
              <header>
                <span className="exercise-label">Exercise 7</span>
                <h1>Drag and Drop List</h1>
                <p className="text-secondary mb-0">
                  Drag an item to a new position to reorder the list.
                </p>
              </header>
              <ListGroup as="ol" className="drag-list">
                {items.map((item, index) => (
                  <ListGroup.Item
                    as="li"
                    action
                    draggable
                    key={item}
                    className={draggingIndex === index ? 'is-dragging' : ''}
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={() => handleDrop(index)}
                    onDragEnd={handleDragEnd}
                  >
                    <span className="drag-handle" aria-hidden="true">
                      ⋮⋮
                    </span>
                    {item}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Stack>
          </Card.Body>
        </Card>
      </Container>
    </main>
  )
}
