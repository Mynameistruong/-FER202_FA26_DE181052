import { useReducer, useState } from 'react'
import { Badge, Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { COLUMNS, initialTaskState } from '../../data/taskData.js'
import { addTask, clearDone, taskReducer } from '../../reducers/taskReducer.js'
import TaskCard from './TaskCard.jsx'

export default function KanbanBoard() {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState)
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('low')
  const [filter, setFilter] = useState('all')

  const visibleTasks = state.tasks.filter((task) => filter === 'all' || task.priority === filter)
  const doneCount = state.tasks.filter((task) => task.column === 'done').length

  const handleAdd = (event) => {
    event.preventDefault()
    if (!title.trim()) return
    dispatch(addTask(title, priority))
    setTitle('')
  }

  return (
    <section aria-label="Bảng Kanban">
      <Row className="g-2 mb-3">
        <Col lg={7}>
          <Form onSubmit={handleAdd}>
            <InputGroup>
              <Form.Control aria-label="Tên công việc" placeholder="Tên công việc" value={title} onChange={(event) => setTitle(event.target.value)} />
              <Form.Select aria-label="Mức ưu tiên mới" className="flex-grow-0" style={{ width: 126 }} value={priority} onChange={(event) => setPriority(event.target.value)}>
                <option value="low">Thấp</option><option value="high">Cao</option>
              </Form.Select>
              <Button type="submit" disabled={!title.trim()}>Thêm</Button>
            </InputGroup>
          </Form>
        </Col>
        <Col sm={7} lg={3}>
          <Form.Select aria-label="Lọc theo ưu tiên" value={filter} onChange={(event) => setFilter(event.target.value)}>
            <option value="all">Mọi mức ưu tiên</option>
            <option value="high">Chỉ ưu tiên cao</option>
            <option value="low">Chỉ ưu tiên thấp</option>
          </Form.Select>
        </Col>
        <Col sm={5} lg={2}>
          <Button variant="outline-success" className="w-100" disabled={doneCount === 0} onClick={() => dispatch(clearDone())}>Dọn cột xong</Button>
        </Col>
      </Row>
      <Row className="g-3">
        {COLUMNS.map(({ key, title: columnTitle }, columnIndex) => {
          const tasks = visibleTasks.filter((task) => task.column === key)
          return (
            <Col md={4} key={key}>
              <Card className="kanban-column h-100">
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <span>{columnTitle}</span><Badge bg="dark">{tasks.length}</Badge>
                </Card.Header>
                <Card.Body className="p-2" data-column={key}>
                  {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} dispatch={dispatch} isFirst={columnIndex === 0} isLast={columnIndex === COLUMNS.length - 1} />
                  ))}
                  {tasks.length === 0 && <small className="text-secondary">Trống</small>}
                </Card.Body>
              </Card>
            </Col>
          )
        })}
      </Row>
    </section>
  )
}