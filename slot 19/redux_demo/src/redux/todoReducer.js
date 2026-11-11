import { combineReducers } from 'redux';
import { ADD_TODO, TOGGLE_TODO, DELETE_TODO, EDIT_TODO, CLEAR_COMPLETED, SET_FILTER } from './todoActions';

const initialTodos = [
  { id: 1, text: 'Học Redux cơ bản', done: true },
  { id: 2, text: 'Làm bài tập Todo', done: false },
];
function todos(state = initialTodos, action) {
  switch (action.type) {
    case ADD_TODO: return [...state, action.payload];
    case TOGGLE_TODO: return state.map((t) => t.id === action.payload ? { ...t, done: !t.done } : t);
    case EDIT_TODO: return state.map((t) => t.id === action.payload.id ? { ...t, text: action.payload.text } : t);
    case DELETE_TODO: return state.filter((t) => t.id !== action.payload);
    case CLEAR_COMPLETED: return state.filter((t) => !t.done);
    default: return state;
  }
}
function filter(state = 'all', action) { return action.type === SET_FILTER ? action.payload : state; }
export default combineReducers({ todos, filter });
