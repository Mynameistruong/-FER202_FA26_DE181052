import { useCallback, useState } from 'react'
import { Alert, Card, Form, Spinner } from 'react-bootstrap'
import postApi from '../api/postApi.js'
import useAxios from '../hooks/useAxios.js'

function AxiosDemo() {
  const [postId, setPostId] = useState('1')
  const fetchPost = useCallback(
    (signal) => postId ? postApi.getById(postId, signal) : Promise.resolve(null),
    [postId],
  )
  const { data: post, loading, error, refetch } = useAxios(fetchPost)

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">NC4 · AbortController</p>
          <h1>Đổi bài viết và hủy request cũ</h1>
          <p className="text-secondary">
            Thử đổi ID liên tục; request trước sẽ bị hủy và chỉ dữ liệu mới nhất được hiển thị.
          </p>
        </div>
      </div>

      <Form.Group className="mb-4" controlId="post-id">
        <Form.Label>Post ID (1–100)</Form.Label>
        <Form.Control
          type="number"
          min="1"
          max="100"
          step="1"
          value={postId}
          onChange={(event) => {
            const value = event.target.value
            const numericValue = Number(value)
            if (value === '' || (Number.isInteger(numericValue) && numericValue >= 1 && numericValue <= 100)) {
              setPostId(value)
            }
          }}
          onBlur={() => {
            if (!postId) setPostId('1')
          }}
        />
      </Form.Group>

      {loading && (
        <div className="d-flex align-items-center gap-2 py-4" role="status">
          <Spinner animation="border" size="sm" />
          Đang tải bài viết #{postId}...
        </div>
      )}
      {error && (
        <Alert variant="danger">
          {error}
          <button type="button" className="btn btn-link p-0 ms-2" onClick={() => void refetch()}>
            Thử lại
          </button>
        </Alert>
      )}
      {post && !loading && (
        <Card className="content-card">
          <Card.Header>Bài viết #{post.id}</Card.Header>
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.body}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </section>
  )
}

export default AxiosDemo
