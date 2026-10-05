export const MIN = 0
export const MAX = 100
export const HISTORY_LIMIT = 5
export const STEP_OPTIONS = [1, 5, 10, 25]

export const COUNTER_ACTIONS = {
  INCREMENT: 'counter/increment',
  DECREMENT: 'counter/decrement',
  SET_STEP: 'counter/setStep',
  RESET: 'counter/reset',
}

export const initialCounterState = {
  count: 0,
  step: 1,
  history: [],
}