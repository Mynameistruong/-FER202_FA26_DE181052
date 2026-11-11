import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import counterReducer from './counterReducer';
import todoReducer from './todoReducer';
import { usersReducer } from './users';
import productsReducer from '../features/productsSlice';
import cartReducer from '../features/cartSlice';
import studentsReducer from '../features/studentsSlice';

const rootReducer = combineReducers({
  counter: counterReducer,          // state.counter.value
  todo: todoReducer,
  users: usersReducer,
  products: productsReducer,
  cart: cartReducer,
  students: studentsReducer,
});

export const store = createStore(
  rootReducer,
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)(applyMiddleware(thunk))
);
