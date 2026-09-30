import { useReducer } from 'react'
import { Badge, Card, Col, Container, Row, Stack } from 'react-bootstrap'
import CounterControls from './CounterControls.jsx'
import CounterHistory from './CounterHistory.jsx'
import { ACTIONS } from './counterActions.js'
import { MAX, MIN, initialState, STEP_OPTIONS } from './counterData.js'
import { counterReducer } from './counterReducer.js'

export default function StepCounter() {
  const [state, dispatch] = useReducer(counterReducer, initialState)
  const { count, step, history } = state

  return (
    <Container className="counter-page py-5">
      <Stack as="header" gap={1} className="mb-4">
        <p className="counter-eyebrow mb-1">useReducer · Bài 1 · Reducer đầu tiên</p>
        <h1 className="h2 mb-2">Bộ đếm có bước nhảy và lịch sử</h1>
        <p className="text-secondary mb-0">
          Một reducer quản lý giá trị, bước nhảy và lịch sử trong cùng state.
        </p>
      </Stack>

      <Card className="counter-panel">
        <Card.Header className="counter-panel-heading">
          <Stack direction="horizontal" className="justify-content-between align-items-center" gap={3}>
            <Stack gap={1}>
              <Card.Title as="h2" className="h5 mb-0">Giá trị hiện tại</Card.Title>
              <Card.Text className="small text-secondary mb-0">
                Giới hạn từ {MIN} đến {MAX}
              </Card.Text>
            </Stack>
            <Badge bg="light" text="dark" className="border">Bước {step}</Badge>
          </Stack>
        </Card.Header>
        <Card.Body className="p-0">
          <Row className="g-0">
            <Col md={6} className="counter-workspace border-bottom">
              <div className="counter-value" role="status" aria-label="Giá trị bộ đếm">
                {count}
              </div>
              <CounterControls
                count={count}
                step={step}
                min={MIN}
                max={MAX}
                stepOptions={STEP_OPTIONS}
                onStepChange={(value) => dispatch({ type: ACTIONS.SET_STEP, payload: value })}
                onIncrement={() => dispatch({ type: ACTIONS.INCREMENT })}
                onDecrement={() => dispatch({ type: ACTIONS.DECREMENT })}
                onReset={() => dispatch({ type: ACTIONS.RESET })}
              />
            </Col>
            <Col md={6} className="counter-workspace">
              <CounterHistory history={history} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  )
}