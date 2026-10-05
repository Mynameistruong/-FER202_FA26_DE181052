import { initialOrderState, STATUS_INFO, TRANSITIONS } from '../data/orderData.js'

export function orderReducer(state, action) {
  if (action.type === 'SET_REASON') {
    return state.cancelReason === action.payload && !state.error
      ? state
      : { ...state, cancelReason: action.payload, error: '' }
  }
  if (action.type === 'RESET') return initialOrderState

  const nextStatus = TRANSITIONS[state.status]?.[action.type]
  if (!nextStatus) {
    const error = `Không thể "${action.type}" khi đơn đang "${STATUS_INFO[state.status].label}"`
    return state.error === error ? state : { ...state, error }
  }
  if (action.type === 'CANCEL' && state.cancelReason.trim().length < 5) {
    const error = 'Nhập lý do hủy (ít nhất 5 ký tự)'
    return state.error === error ? state : { ...state, error }
  }

  return {
    ...state,
    status: nextStatus,
    error: '',
    timeline: [...state.timeline, { status: nextStatus, at: action.at }],
  }
}