import { Button, Form } from 'react-bootstrap'
import { SORT_OPTIONS } from '../data/studentOptions.js'

export default function StudentControls({ sortBy, onSortChange, onBonusAll }) {
  return (
    <div className="row g-2 align-items-end">
      <Form.Group className="col-sm" controlId="sort-by">
        <Form.Label>Sắp xếp</Form.Label>
        <Form.Select value={sortBy} onChange={(event) => onSortChange(event.target.value)}>
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </Form.Select>
      </Form.Group>
      <div className="col-auto">
        <Button variant="outline-success" onClick={onBonusAll}>+0.5 cả lớp</Button>
      </div>
    </div>
  )
}