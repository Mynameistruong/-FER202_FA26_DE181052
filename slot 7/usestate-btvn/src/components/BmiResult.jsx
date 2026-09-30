import { Alert } from 'react-bootstrap'

export default function BmiResult({ bmi, classification }) {
  if (bmi === null) {
    return <p className="text-secondary mb-0">Nhập chiều cao và cân nặng hợp lệ để xem kết quả.</p>
  }

  return (
    <Alert variant={classification.variant} className="mb-0">
      BMI = {bmi.toFixed(1)} → {classification.label}
    </Alert>
  )
}