import { COURSES, SCHEDULES, STEPS, STEP_FIELDS } from '../data/wizardData.js'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateField(name, values) {
  const value = values[name]
  switch (name) {
    case 'fullName': return value.trim().length >= 3 ? '' : 'Họ tên ít nhất 3 ký tự'
    case 'email': return EMAIL_REGEX.test(value) ? '' : 'Email không hợp lệ'
    case 'phone': return /^0\d{9}$/.test(value) ? '' : 'Số điện thoại gồm 10 số, bắt đầu bằng 0'
    case 'courseId': return COURSES.some(({ id }) => id === value) ? '' : 'Chọn một khóa học'
    case 'schedule': return SCHEDULES.includes(value) ? '' : 'Chọn lịch học'
    case 'agree': return value ? '' : 'Bạn cần xác nhận thông tin'
    default: return ''
  }
}

export function validateStep(step, values) {
  return STEP_FIELDS[step].reduce((errors, name) => {
    const message = validateField(name, values)
    return message ? { ...errors, [name]: message } : errors
  }, {})
}

export function initWizard(initialCourseId = 'react') {
  const selectedCourse = COURSES.some(({ id }) => id === initialCourseId) ? initialCourseId : 'react'
  return {
    step: 0,
    maxVisited: 0,
    values: { fullName: '', email: '', phone: '', courseId: selectedCourse, schedule: '', agree: false },
    errors: {},
    submitted: false,
  }
}

export function wizardReducer(state, action) {
  switch (action.type) {
    case 'CHANGE': {
      const { name, value } = action.payload
      const values = { ...state.values, [name]: value }
      const errors = state.errors[name]
        ? { ...state.errors, [name]: validateField(name, values) }
        : state.errors
      return { ...state, values, errors }
    }
    case 'NEXT': {
      const errors = validateStep(state.step, state.values)
      if (Object.keys(errors).length) return { ...state, errors }
      const step = Math.min(state.step + 1, STEPS.length - 1)
      return { ...state, step, maxVisited: Math.max(state.maxVisited, step), errors: {} }
    }
    case 'BACK':
      return state.step === 0 ? state : { ...state, step: state.step - 1, errors: {} }
    case 'GO_TO':
      return action.payload >= 0 && action.payload <= state.maxVisited && action.payload < STEPS.length
        ? { ...state, step: action.payload, errors: {} }
        : state
    case 'SUBMIT': {
      const errors = validateStep(state.step, state.values)
      return Object.keys(errors).length ? { ...state, errors } : { ...state, submitted: true }
    }
    case 'RESET':
      return initWizard(action.payload)
    default:
      throw new Error(`Action không hợp lệ: ${action.type}`)
  }
}