import { Button, ButtonGroup } from 'react-bootstrap'
import { HEIGHT_UNITS } from '../data/bmiConfig.js'

export default function UnitSelector({ unit, onChange }) {
  return (
    <ButtonGroup size="sm" aria-label="Đơn vị chiều cao">
      {HEIGHT_UNITS.map((option) => (
        <Button
          key={option}
          variant={unit === option ? 'success' : 'outline-secondary'}
          onClick={() => onChange(option)}
        >
          {option}
        </Button>
      ))}
    </ButtonGroup>
  )
}