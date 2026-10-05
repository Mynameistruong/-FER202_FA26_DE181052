import { useReducer } from 'react'
import { Alert, Badge, Button, Card, Form, ListGroup, Stack } from 'react-bootstrap'
import { EVENT_LABELS, initialOrderState, STATUS_INFO, TRANSITIONS } from '../../data/orderData.js'
import { orderReducer } from '../../reducers/orderReducer.js'

const now = () => new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })

export default function OrderTracker() {
  const [state, dispatch] = useReducer(orderReducer, initialOrderState)
  const { status, cancelReason, error, timeline } = state
  const allowedEvents = Object.keys(TRANSITIONS[status])
  const isFinal = allowedEvents.length === 0

  return (
    <Card className="exercise-panel">
      <Card.Body>
        <Stack direction="horizontal" className="justify-content-between mb-3" gap={2}>
          <Card.Title as="h2" className="h5 mb-0">Đơn hàng #DH1024</Card.Title>
          <Badge bg={STATUS_INFO[status].bg}>{STATUS_INFO[status].label}</Badge>
        </Stack>
        {error && <Alert variant="danger" className="py-2">{error}</Alert>}
        {allowedEvents.includes('CANCEL') && (
          <Form.Control
            className="mb-3"
            aria-label="Lý do hủy"
            placeholder="Lý do hủy (ít nhất 5 ký tự)"
            value={cancelReason}
            onChange={(event) => dispatch({ type: 'SET_REASON', payload: event.target.value })}
          />
        )}
        <div className="d-flex flex-wrap gap-2 mb-3">
          {Object.entries(EVENT_LABELS).map(([event, label]) => (
            <Button key={event} size="sm" variant={event === 'CANCEL' ? 'outline-danger' : 'outline-primary'} disabled={!allowedEvents.includes(event)} onClick={() => dispatch({ type: event, at: now() })}>
              {label}
            </Button>
          ))}
          <Button size="sm" variant="outline-secondary" onClick={() => dispatch({ type: 'SHIP', at: now() })}>Thử gửi SHIP</Button>
        </div>
        <ListGroup variant="flush" aria-label="Dòng thời gian đơn hàng">
          {timeline.map(({ status: itemStatus, at }, index) => (
            <ListGroup.Item key={`${itemStatus}-${index}`} className="d-flex align-items-center justify-content-between">
              <Badge bg={STATUS_INFO[itemStatus].bg}>{STATUS_INFO[itemStatus].label}</Badge>
              <small className="timeline-time text-secondary">{at}</small>
            </ListGroup.Item>
          ))}
        </ListGroup>
        {isFinal && <Button className="mt-3" size="sm" onClick={() => dispatch({ type: 'RESET' })}>Tạo đơn mới</Button>}
      </Card.Body>
    </Card>
  )
}