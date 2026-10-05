export const COLORS = ['#fff3a3', '#c8f7c5', '#cfe8ff', '#ffd6e0']

export const NOTE_ACTIONS = {
  ADD: 'ADD_NOTE',
  CHANGE_COLOR: 'CHANGE_COLOR',
  TOGGLE_PIN: 'TOGGLE_PIN',
  DELETE: 'DELETE',
  CLEAR_ALL: 'CLEAR_ALL',
}

export const initialNotes = {
  nextId: 3,
  items: [
    { id: 1, text: 'Reducer phải là hàm thuần', color: COLORS[0], pinned: true },
    { id: 2, text: 'Không sửa trực tiếp state', color: COLORS[2], pinned: false },
  ],
}