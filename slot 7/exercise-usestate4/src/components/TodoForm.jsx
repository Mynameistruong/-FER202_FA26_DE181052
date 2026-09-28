import { Button, Form, InputGroup } from 'react-bootstrap'

export default function TodoForm({ task, onTaskChange, onSubmit }) {
  return (
    <Form onSubmit={onSubmit} className="todo-form">
      <Form.Label className="visually-hidden" htmlFor="task-input">
        New todo item
      </Form.Label>
      <InputGroup>
        <Form.Control
          id="task-input"
          type="text"
          value={task}
          onChange={(event) => onTaskChange(event.target.value)}
          placeholder="Please input a Task"
        />
        <Button variant="danger" type="submit">
          Add Todo
        </Button>
      </InputGroup>
    </Form>
  )
}
