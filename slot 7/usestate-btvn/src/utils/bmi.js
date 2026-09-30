import { BMI_CATEGORIES, HEIGHT_LIMITS, WEIGHT_LIMITS } from '../data/bmiConfig.js'

export function getHeightError(value, unit) {
  if (value === '') return null

  const { min, max, message } = HEIGHT_LIMITS[unit]
  const height = Number(value)
  return height >= min && height <= max ? null : message
}

export function getWeightError(value) {
  if (value === '') return null

  const weight = Number(value)
  const { min, max, message } = WEIGHT_LIMITS
  return weight >= min && weight <= max ? null : message
}

export function calculateBmi(height, weight, unit) {
  const heightInMeters = unit === 'cm' ? Number(height) / 100 : Number(height)
  return Number(weight) / (heightInMeters * heightInMeters)
}

export function classifyBmi(bmi) {
  return BMI_CATEGORIES.find((category) => bmi < category.max)
}