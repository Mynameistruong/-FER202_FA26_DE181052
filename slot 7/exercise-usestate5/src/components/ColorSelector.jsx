import { Form } from 'react-bootstrap'

export default function ColorSelector({ colors, selectedColor, onColorChange }) {
  return (
    <Form.Group controlId="color-select">
      <Form.Label>Choose a color</Form.Label>
      <Form.Select
        value={selectedColor}
        onChange={(event) => onColorChange(event.target.value)}
      >
        <option value="">Select a color</option>
        {colors.map((color) => (
          <option key={color.value} value={color.value}>
            {color.label}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  )
}
