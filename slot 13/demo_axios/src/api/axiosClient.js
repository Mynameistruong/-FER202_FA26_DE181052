import axios from 'axios'

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://jsonplaceholder.typicode.com',
  timeout: 5000,
  headers: {
    Accept: 'application/json',
  },
})

axiosClient.interceptors.request.use((config) => {
  config.metadata = { startedAt: performance.now() }
  console.info(`[API] ${(config.method || 'get').toUpperCase()} ${config.url}`)

  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

axiosClient.interceptors.response.use(
  (response) => {
    response.durationMs = Math.round(performance.now() - response.config.metadata.startedAt)
    return response
  },
  (error) => {
    const status = error.response?.status

    if (status === 404) {
      error.message = 'Không tìm thấy dữ liệu yêu cầu.'
    } else if (status >= 500) {
      error.message = 'Máy chủ lỗi. Vui lòng thử lại sau.'
    } else if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
      error.message = 'Request quá thời gian (timeout).'
    } else if (!error.response && !axios.isCancel(error)) {
      error.message = 'Không kết nối được server. Hãy kiểm tra kết nối và thử lại.'
    }

    if (error.config?.metadata?.startedAt) {
      error.durationMs = Math.round(performance.now() - error.config.metadata.startedAt)
    }

    return Promise.reject(error)
  },
)

export default axiosClient
