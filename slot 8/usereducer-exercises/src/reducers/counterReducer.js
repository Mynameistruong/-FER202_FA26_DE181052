import { COUNTER_ACTIONS, HISTORY_LIMIT, initialCounterState, MAX, MIN, STEP_OPTIONS } from '../data/counterData.js'

export function clamp(value) {
  return Math.min(MAX, Math.max(MIN, value))
}

export function counterReducer(state, action) {
  switch (action.type) {
    case COUNTER_ACTIONS.INCREMENT:
    case COUNTER_ACTIONS.DECREMENT: {
      const delta = action.type === COUNTER_ACTIONS.INCREMENT ? state.step : -state.step
      const nextCount = clamp(state.count + delta)
      if (nextCount === state.count) return state

      return {
        ...state,
        count: nextCount,
        history: [`${state.count} → ${nextCount}`, ...state.history].slice(0, HISTORY_LIMIT),
      }
    }
    case COUNTER_ACTIONS.SET_STEP:
      return STEP_OPTIONS.includes(action.payload)
        ? { ...state, step: action.payload }
        : state
    case COUNTER_ACTIONS.RESET:
      return initialCounterState
    default:
      throw new Error(`Action không hợp lệ: ${action.type}`)
  }
}