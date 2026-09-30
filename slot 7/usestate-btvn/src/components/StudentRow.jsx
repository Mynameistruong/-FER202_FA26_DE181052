import { Badge, Button, Form } from 'react-bootstrap'
import { CITIES } from '../data/students.js'

export default function StudentRow({ student, onScoreChange, onCityChange, onRemove }) {
  const hasPassed = student.score >= 5

  return (
    <tr>
      <td>{student.name}</td>
      <td>
        <Form.Control
          type="number"
          min="0"
          max="10"
          step="0.5"
          aria-label={`Điểm của ${student.name}`}
          value={student.score}
          onChange={(event) => onScoreChange(student.id, event.target.value)}
        />
      </td>
      <td>
        <Form.Select
          aria-label={`Thành phố của ${student.name}`}
          value={student.contact.city}
          onChange={(event) => onCityChange(student.id, event.target.value)}
        >
          {CITIES.map((city) => <option key={city}>{city}</option>)}
        </Form.Select>
      </td>
      <td><Badge bg={hasPassed ? 'success' : 'secondary'}>{hasPassed ? 'Đạt' : 'Chưa đạt'}</Badge></td>
      <td>
        <Button
          variant="outline-danger"
          size="sm"
          aria-label={`Xóa ${student.name}`}
          onClick={() => onRemove(student.id)}
        >
          Xóa
        </Button>
      </td>
    </tr>
  )
}