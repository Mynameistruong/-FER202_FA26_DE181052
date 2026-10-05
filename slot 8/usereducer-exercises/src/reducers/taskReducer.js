import { COLUMNS, TASK_ACTIONS } from '../data/taskData.js'

const COLUMN_ORDER = COLUMNS.map(({ key }) => key)

export const addTask = (title, priority) => ({ type: TASK_ACTIONS.ADD, payload: { title, priority } })
export const moveTask = (id, direction) => ({ type: TASK_ACTIONS.MOVE, payload: { id, direction } })
export const renameTask = (id, title) => ({ type: TASK_ACTIONS.RENAME, payload: { id, title } })
export const deleteTask = (id) => ({ type: TASK_ACTIONS.DELETE, payload: id })
export const clearDone = () => ({ type: TASK_ACTIONS.CLEAR_DONE })

export function taskReducer(state, action) {
  switch (action.type) {
    case TASK_ACTIONS.ADD: {
      const title = action.payload.title.trim()
      if (!title) return state
      const task = { id: state.nextId, title, priority: action.payload.priority, column: COLUMN_ORDER[0] }
      return { nextId: state.nextId + 1, tasks: [...state.tasks, task] }
    }
    case TASK_ACTIONS.MOVE: {
      const { id, direction } = action.payload
      const task = state.tasks.find((item) => item.id === id)
      if (!task) return state
      const nextIndex = COLUMN_ORDER.indexOf(task.column) + direction
      if (nextIndex < 0 || nextIndex >= COLUMN_ORDER.length) return state
      return {
        ...state,
        tasks: state.tasks.map((item) => item.id === id ? { ...item, column: COLUMN_ORDER[nextIndex] } : item),
      }
    }
    case TASK_ACTIONS.RENAME: {
      const title = action.payload.title.trim()
      if (!title) return state
      const task = state.tasks.find((item) => item.id === action.payload.id)
      if (!task || task.title === title) return state
      return { ...state, tasks: state.tasks.map((item) => item.id === task.id ? { ...item, title } : item) }
    }
    case TASK_ACTIONS.DELETE: {
      if (!state.tasks.some((item) => item.id === action.payload)) return state
      return { ...state, tasks: state.tasks.filter((item) => item.id !== action.payload) }
    }
    case TASK_ACTIONS.CLEAR_DONE:
      return state.tasks.some((item) => item.column === 'done')
        ? { ...state, tasks: state.tasks.filter((item) => item.column !== 'done') }
        : state
    default:
      throw new Error(`Action không hợp lệ: ${action.type}`)
  }
}