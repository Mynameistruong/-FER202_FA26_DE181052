import { createSlice, createSelector } from '@reduxjs/toolkit';
export const PRODUCTS = [{ id: 1, name: 'iPhone 16', price: 22990000, stock: 5 }, { id: 2, name: 'Samsung S25', price: 19990000, stock: 3 }, { id: 3, name: 'AirPods Pro', price: 5990000, stock: 10 }, { id: 4, name: 'iPad Air', price: 15990000, stock: 4 }];
const slice = createSlice({ name: 'products', initialState: { items: PRODUCTS, keyword: '' }, reducers: { setKeyword: (s, a) => { s.keyword = a.payload; } } });
export const { setKeyword } = slice.actions; export default slice.reducer;
export const selectProducts = (s) => s.products.items; export const selectKeyword = (s) => s.products.keyword;
export const selectFilteredProducts = createSelector([selectProducts, selectKeyword], (items, keyword) => items.filter((p) => p.name.toLowerCase().includes(keyword.toLowerCase())));
