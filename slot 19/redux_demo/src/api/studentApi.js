import axios from 'axios';
const http = axios.create({ baseURL: 'http://localhost:9999' });
export const studentApi = { getAll: () => http.get('/students').then((r) => r.data), create: (d) => http.post('/students', d).then((r) => r.data), update: (id, d) => http.put(`/students/${id}`, d).then((r) => r.data), remove: (id) => http.delete(`/students/${id}`).then(() => id) };
