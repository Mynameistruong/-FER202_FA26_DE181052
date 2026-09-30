import { useState } from 'react'
import { Container } from 'react-bootstrap'
import BmiResult from '../components/BmiResult.jsx'
import HeightField from '../components/HeightField.jsx'
import WeightField from '../components/WeightField.jsx'
import { calculateBmi, classifyBmi, getHeightError, getWeightError } from '../utils/bmi.js'

export default function BmiCalculator() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [unit, setUnit] = useState('cm')

  const heightError = getHeightError(height, unit)
  const weightError = getWeightError(weight)
  const isReady = height !== '' && weight !== '' && !heightError && !weightError
  const bmi = isReady ? calculateBmi(height, weight, unit) : null
  const classification = bmi === null ? null : classifyBmi(bmi)

  function changeUnit(nextUnit) {
    if (nextUnit === unit) return

    if (height !== '') {
      const convertedHeight = unit === 'cm'
        ? Number(height) / 100
        : Number(height) * 100
      setHeight(String(convertedHeight))
    }
    setUnit(nextUnit)
  }

  return (
    <Container className="py-5 app-container">
      <header className="mb-4">
        <p className="eyebrow">useState · Bài 3</p>
        <h1 className="h2 mb-2">Máy tính BMI</h1>
        <p className="text-secondary mb-0">Giá trị ô số lưu dạng chuỗi; BMI và phân loại được tính khi render</p>
      </header>
      <HeightField
        value={height}
        unit={unit}
        error={heightError}
        onChange={setHeight}
        onUnitChange={changeUnit}
      />
      <WeightField value={weight} error={weightError} onChange={setWeight} />
      <BmiResult bmi={bmi} classification={classification} />
    </Container>
  )
}