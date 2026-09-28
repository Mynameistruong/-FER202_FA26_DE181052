import { Card } from 'react-bootstrap'

export default function ColorPreview({ color }) {
  return (
    <Card
      className="color-preview border-0"
      style={{ backgroundColor: color || '#f1f3f5' }}
      aria-label={color ? `Selected color ${color}` : 'No color selected'}
    >
      {!color && <span>Select a color to preview it</span>}
    </Card>
  )
}
