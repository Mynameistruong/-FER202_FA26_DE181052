import axios from 'axios';
const API = 'https://jsonplaceholder.typicode.com';
export const usersFetchRequest = () => ({ type: 'users/request' });
export const usersFetchSuccess = (payload) => ({ type: 'users/success', payload });
export const usersFetchFailure = (payload) => ({ type: 'users/failure', payload });
export const selectUser = (payload) => ({ type: 'users/select', payload });
export const fetchUsers = () => async (dispatch, getState) => { if (getState().users.items.length) return; dispatch(usersFetchRequest()); try { dispatch(usersFetchSuccess((await axios.get(`${API}/users`)).data)); } catch (e) { dispatch(usersFetchFailure(e.message)); } };
export const fetchPosts = (id) => async (dispatch) => { dispatch(selectUser(id)); dispatch({ type: 'posts/request' }); try { dispatch({ type: 'posts/success', payload: (await axios.get(`${API}/posts`, { params: { userId: id } })).data }); } catch (e) { dispatch({ type: 'posts/failure', payload: e.message }); } };
const initial = { items: [], loading: false, error: null, selectedId: null, posts: [], postsLoading: false, postsError: null };
export function usersReducer(state = initial, action) { switch (action.type) { case 'users/request': return { ...state, loading: true, error: null }; case 'users/success': return { ...state, loading: false, items: action.payload }; case 'users/failure': return { ...state, loading: false, error: action.payload }; case 'users/select': return { ...state, selectedId: action.payload }; case 'posts/request': return { ...state, postsLoading: true, postsError: null, posts: [] }; case 'posts/success': return { ...state, postsLoading: false, posts: action.payload }; case 'posts/failure': return { ...state, postsLoading: false, postsError: action.payload }; default: return state; } }
