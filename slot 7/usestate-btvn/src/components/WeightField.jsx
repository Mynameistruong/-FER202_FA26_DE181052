import { Form } from 'react-bootstrap'

export default function WeightField({ value, error, onChange }) {
  return (
    <Form.Group className="mb-4" controlId="weight">
      <Form.Label>Cân nặng (kg)</Form.Label>
      <Form.Control
        type="number"
        min="10"
        max="300"
        step="any"
        value={value}
        isInvalid={Boolean(error)}
        onChange={(event) => onChange(event.target.value)}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  )
}