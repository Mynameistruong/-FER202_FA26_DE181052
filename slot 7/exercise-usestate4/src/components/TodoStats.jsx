import { Card, Col, Row } from 'react-bootstrap'

export default function TodoStats({ totalTasks }) {
  return (
    <Row className="todo-stats g-2">
      <Col>
        <Card className="stat-card h-100">
          <Card.Body>
            <Card.Text className="stat-value">{totalTasks}</Card.Text>
            <Card.Text className="stat-label">Total tasks</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className="stat-card stat-card-accent h-100">
          <Card.Body>
            <Card.Text className="stat-value">{totalTasks ? 'Active' : 'Ready'}</Card.Text>
            <Card.Text className="stat-label">List status</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}
