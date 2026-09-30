import { Form } from 'react-bootstrap'
import UnitSelector from './UnitSelector.jsx'

export default function HeightField({ value, unit, error, onChange, onUnitChange }) {
  return (
    <Form.Group className="mb-3" controlId="height">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <Form.Label className="mb-0">Chiều cao</Form.Label>
        <UnitSelector unit={unit} onChange={onUnitChange} />
      </div>
      <Form.Control
        type="number"
        min={unit === 'cm' ? 50 : 0.5}
        max={unit === 'cm' ? 250 : 2.5}
        step="any"
        value={value}
        isInvalid={Boolean(error)}
        onChange={(event) => onChange(event.target.value)}
        aria-describedby="height-feedback"
      />
      <Form.Control.Feedback id="height-feedback" type="invalid">
        {error}
      </Form.Control.Feedback>
    </Form.Group>
  )
}