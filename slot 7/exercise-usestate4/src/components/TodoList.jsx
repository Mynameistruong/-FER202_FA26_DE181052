import { Alert, Badge, Button, ListGroup, Stack } from 'react-bootstrap'

export default function TodoList({ tasks, onDelete }) {
  return (
    <section className="todo-list-section" aria-labelledby="tasks-title">
      <Stack direction="horizontal" className="list-heading">
        <h2 id="tasks-title" className="mb-0">
          Tasks
        </h2>
        <Badge bg="success" pill>
          {tasks.length}
        </Badge>
      </Stack>

      {tasks.length === 0 ? (
        <Alert className="empty-state mb-0" variant="light">
          No tasks yet. Add your first todo.
        </Alert>
      ) : (
        <ListGroup className="task-list">
          {tasks.map((currentTask) => (
            <ListGroup.Item
              className="task-item"
              key={currentTask.id}
              as="li"
            >
              <span>{currentTask.title}</span>
              <Button
                variant="outline-danger"
                size="sm"
                type="button"
                onClick={() => onDelete(currentTask.id)}
                aria-label={`Delete ${currentTask.title}`}
              >
                Delete
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </section>
  )
}
