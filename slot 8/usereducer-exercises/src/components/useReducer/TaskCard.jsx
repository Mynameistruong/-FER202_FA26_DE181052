import { Badge, Button, Card } from 'react-bootstrap'
import { PRIORITIES } from '../../data/taskData.js'
import { deleteTask, moveTask, renameTask } from '../../reducers/taskReducer.js'

export default function TaskCard({ task, isFirst, isLast, dispatch }) {
  const { id, title, priority } = task

  const handleRename = () => {
    const nextTitle = window.prompt('Tên mới', title)
    if (nextTitle !== null) dispatch(renameTask(id, nextTitle))
  }

  return (
    <Card className="task-card mb-2 shadow-sm">
      <Card.Body className="p-2">
        <div className="d-flex justify-content-between align-items-start gap-2">
          <span className="task-title" title="Nhấp đúp để đổi tên" onDoubleClick={handleRename}>{title}</span>
          <Badge bg={PRIORITIES[priority].bg}>{PRIORITIES[priority].label}</Badge>
        </div>
        <div className="d-flex gap-1 mt-2">
          <Button aria-label={`Chuyển ${title} sang cột trước`} size="sm" variant="outline-secondary" disabled={isFirst} onClick={() => dispatch(moveTask(id, -1))}>←</Button>
          <Button aria-label={`Chuyển ${title} sang cột sau`} size="sm" variant="outline-secondary" disabled={isLast} onClick={() => dispatch(moveTask(id, 1))}>→</Button>
          <Button size="sm" variant="outline-danger" className="ms-auto" onClick={() => dispatch(deleteTask(id))}>Xóa</Button>
        </div>
      </Card.Body>
    </Card>
  )
}