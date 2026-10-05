const HISTORY_LIMIT = 20

export const createHistory = (present) => ({ past: [], present, future: [] })

export const undoable = (reducer) => (state, action) => {
  const { past, present, future } = state
  switch (action.type) {
    case 'UNDO':
      if (!past.length) return state
      return { past: past.slice(0, -1), present: past[past.length - 1], future: [present, ...future] }
    case 'REDO':
      if (!future.length) return state
      return { past: [...past, present].slice(-HISTORY_LIMIT), present: future[0], future: future.slice(1) }
    default: {
      const newPresent = reducer(present, action)
      if (newPresent === present) return state
      return { past: [...past, present].slice(-HISTORY_LIMIT), present: newPresent, future: [] }
    }
  }
}