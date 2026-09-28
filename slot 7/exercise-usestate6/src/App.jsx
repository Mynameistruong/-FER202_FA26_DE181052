import { useState } from 'react'
import { Card, Container, Form, ListGroup, Stack } from 'react-bootstrap'
import './App.css'

const items = ['Apple', 'Banana', 'Cherry', 'Mango', 'Orange', 'Strawberry']

export default function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <main className="page-shell">
      <Container>
        <Card className="exercise-card border-0 mx-auto">
          <Card.Body>
            <Stack gap={4}>
              <header>
                <span className="exercise-label">Exercise 6</span>
                <h1>Search Filter</h1>
                <p className="text-secondary mb-0">
                  Type in the input to filter the list of items.
                </p>
              </header>
              <Form.Group controlId="search-input">
                <Form.Label>Search items</Form.Label>
                <Form.Control
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Type a search term"
                />
              </Form.Group>
              <section aria-label="Filtered items">
                {filteredItems.length > 0 ? (
                  <ListGroup>
                    {filteredItems.map((item) => (
                      <ListGroup.Item key={item}>{item}</ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <p className="empty-state mb-0">No matching items found.</p>
                )}
              </section>
            </Stack>
          </Card.Body>
        </Card>
      </Container>
    </main>
  )
}
