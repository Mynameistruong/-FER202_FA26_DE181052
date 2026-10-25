import axiosClient from './axiosClient.js'

const postApi = {
  async getAll(params = {}, signal) {
    const response = await axiosClient.get('/posts', { params, signal })
    return {
      posts: response.data,
      total: Number(response.headers['x-total-count'] || response.data.length),
    }
  },

  async getById(id, signal) {
    const response = await axiosClient.get(`/posts/${id}`, { signal })
    return response.data
  },

  async getUser(id, signal) {
    const response = await axiosClient.get(`/users/${id}`, { signal })
    return response.data
  },

  async getComments(id, signal) {
    const response = await axiosClient.get(`/posts/${id}/comments`, { signal })
    return response.data
  },

  async create(post) {
    const response = await axiosClient.post('/posts', post)
    return response
  },

  async update(id, post) {
    const response = await axiosClient.put(`/posts/${id}`, post)
    return response
  },

  async patch(id, changes) {
    const response = await axiosClient.patch(`/posts/${id}`, changes)
    return response
  },

  async remove(id) {
    return axiosClient.delete(`/posts/${id}`)
  },
}

export default postApi
