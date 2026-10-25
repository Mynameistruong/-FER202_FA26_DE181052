import { useCallback } from 'react'
import { Alert, Card, ListGroup, Spinner } from 'react-bootstrap'
import axiosClient from '../api/axiosClient.js'
import useAxios from '../hooks/useAxios.js'

async function getConfiguredPosts(signal) {
  const response = await axiosClient({
    method: 'get',
    url: '/posts',
    params: { _page: 1, _limit: 3 },
    headers: { Accept: 'application/json' },
    timeout: 5000,
    signal,
  })

  return {
    status: response.status,
    contentType: response.headers['content-type'],
    total: response.headers['x-total-count'] || 'Không có header',
    posts: response.data,
    durationMs: response.durationMs,
  }
}

function RequestConfig() {
  const fetchData = useCallback((signal) => getConfiguredPosts(signal), [])
  const { data, loading, error, refetch } = useAxios(fetchData)

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">NC2 · axios(config)</p>
          <h1>Cấu hình request</h1>
          <p className="text-secondary">Gửi params, headers, timeout và đọc response headers.</p>
        </div>
      </div>
      {loading && <div className="py-4"><Spinner animation="border" size="sm" /> Đang tải...</div>}
      {error && <Alert variant="danger">{error} <button className="btn btn-link p-0" onClick={() => void refetch()}>Thử lại</button></Alert>}
      {data && (
        <>
          <Card className="content-card mb-4">
            <Card.Body>
              <div>Status: <strong>{data.status}</strong></div>
              <div>Content-Type: <code>{data.contentType}</code></div>
              <div>x-total-count: <strong>{data.total}</strong></div>
              <div>Thời gian request: <strong>{data.durationMs} ms</strong></div>
            </Card.Body>
          </Card>
          <Card className="content-card">
            <ListGroup variant="flush">
              {data.posts.map((post) => <ListGroup.Item key={post.id}>#{post.id} · {post.title}</ListGroup.Item>)}
            </ListGroup>
          </Card>
        </>
      )}
    </section>
  )
}

export default RequestConfig
