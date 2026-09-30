/**
 * @typedef {Object} CounterState
 * @property {number} count Current value, constrained by MIN and MAX.
 * @property {number} step Increment/decrement amount.
 * @property {string[]} history Recent value transitions, newest first.
 */

export const MIN = 0
export const MAX = 100
export const HISTORY_LIMIT = 5
export const STEP_OPTIONS = [1, 5, 10, 25]

/** @type {CounterState} */
export const initialState = {
  count: 0,
  step: 1,
  history: [],
}