import { Button, ButtonGroup, Form } from 'react-bootstrap'

export default function CounterControls({
  count,
  step,
  min,
  max,
  stepOptions,
  onStepChange,
  onIncrement,
  onDecrement,
  onReset,
}) {
  return (
    <section aria-label="Điều khiển bộ đếm">
      <Form.Group className="mb-3" controlId="counter-step">
        <Form.Label className="counter-step-label">Bước nhảy</Form.Label>
        <Form.Select
          value={step}
          onChange={(event) => onStepChange(Number(event.target.value))}
        >
          {stepOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <ButtonGroup className="counter-button-group w-100" aria-label="Thay đổi bộ đếm">
        <Button
          variant="outline-secondary"
          disabled={count <= min}
          onClick={onDecrement}
        >
          {`− ${step}`}
        </Button>
        <Button
          variant="success"
          disabled={count >= max}
          onClick={onIncrement}
        >
          {`+ ${step}`}
        </Button>
      </ButtonGroup>
      <Button
        className="w-100 mt-3"
        variant="outline-danger"
        onClick={onReset}
      >
        Đặt lại
      </Button>
    </section>
  )
}