import { NOTE_ACTIONS } from '../data/notesData.js'

export function notesReducer(state, action) {
  switch (action.type) {
    case NOTE_ACTIONS.ADD: {
      const text = action.payload.text.trim()
      if (!text) return state
      const note = { id: state.nextId, text, color: action.payload.color, pinned: false }
      return { nextId: state.nextId + 1, items: [note, ...state.items] }
    }
    case NOTE_ACTIONS.CHANGE_COLOR: {
      const { id, color } = action.payload
      const note = state.items.find((item) => item.id === id)
      if (!note || note.color === color) return state
      return { ...state, items: state.items.map((item) => item.id === id ? { ...item, color } : item) }
    }
    case NOTE_ACTIONS.TOGGLE_PIN:
      return state.items.some((item) => item.id === action.payload)
        ? { ...state, items: state.items.map((item) => item.id === action.payload ? { ...item, pinned: !item.pinned } : item) }
        : state
    case NOTE_ACTIONS.DELETE:
      return state.items.some((item) => item.id === action.payload)
        ? { ...state, items: state.items.filter((item) => item.id !== action.payload) }
        : state
    case NOTE_ACTIONS.CLEAR_ALL:
      return state.items.length ? { ...state, items: [] } : state
    default:
      throw new Error(`Action không hợp lệ: ${action.type}`)
  }
}