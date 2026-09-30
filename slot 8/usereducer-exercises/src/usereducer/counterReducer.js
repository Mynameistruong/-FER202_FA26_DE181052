import { ACTIONS } from './counterActions.js'
import {
  MAX,
  MIN,
  HISTORY_LIMIT,
  initialState,
  STEP_OPTIONS,
} from './counterData.js'

export function clamp(value) {
  return Math.min(MAX, Math.max(MIN, value))
}

export function counterReducer(state, action) {
  switch (action.type) {
    case ACTIONS.INCREMENT:
    case ACTIONS.DECREMENT: {
      const delta = action.type === ACTIONS.INCREMENT ? state.step : -state.step
      const nextCount = clamp(state.count + delta)

      if (nextCount === state.count) return state

      return {
        ...state,
        count: nextCount,
        history: [`${state.count} → ${nextCount}`, ...state.history].slice(0, HISTORY_LIMIT),
      }
    }
    case ACTIONS.SET_STEP:
      return STEP_OPTIONS.includes(action.payload)
        ? { ...state, step: action.payload }
        : state
    case ACTIONS.RESET:
      return initialState
    default:
      throw new Error(`Action không hợp lệ: ${action.type}`)
  }
}