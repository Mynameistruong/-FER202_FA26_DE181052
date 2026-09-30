export const HEIGHT_LIMITS = {
  cm: { min: 50, max: 250, message: 'Chiều cao từ 50 đến 250 cm.' },
  m: { min: 0.5, max: 2.5, message: 'Chiều cao từ 0.5 đến 2.5 m.' },
}

export const HEIGHT_UNITS = ['cm', 'm']

export const WEIGHT_LIMITS = {
  min: 10,
  max: 300,
  message: 'Cân nặng từ 10 đến 300 kg.',
}

export const BMI_CATEGORIES = [
  { max: 18.5, label: 'Thiếu cân', variant: 'info' },
  { max: 23, label: 'Bình thường', variant: 'success' },
  { max: 25, label: 'Thừa cân', variant: 'warning' },
  { max: Infinity, label: 'Béo phì', variant: 'danger' },
]