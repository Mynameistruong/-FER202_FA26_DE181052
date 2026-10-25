import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Alert,
  Button,
  Card,
  Form,
  ListGroup,
  Modal,
  Pagination,
  Spinner,
  Toast,
  ToastContainer,
} from 'react-bootstrap'
import { Link, useSearchParams } from 'react-router-dom'
import postApi from '../api/postApi.js'
import useAxios from '../hooks/useAxios.js'

const PAGE_SIZE = 5
const EMPTY_POSTS = []

function PostList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Math.max(1, Number(searchParams.get('page')) || 1)
  const userId = searchParams.get('userId') || ''
  const query = searchParams.get('q') || ''
  const [debouncedQuery, setDebouncedQuery] = useState(query)
  const [selectedIds, setSelectedIds] = useState([])
  const [deleteIds, setDeleteIds] = useState([])
  const [deleting, setDeleting] = useState(false)
  const [notice, setNotice] = useState('')
  const [deleteError, setDeleteError] = useState('')

  useEffect(() => {
    const timeout = window.setTimeout(() => setDebouncedQuery(query), 500)
    return () => window.clearTimeout(timeout)
  }, [query])

  const fetchPosts = useCallback(
    (signal) =>
      postApi.getAll(
        {
          _page: page,
          _limit: PAGE_SIZE,
          ...(userId ? { userId } : {}),
          ...(debouncedQuery.trim() ? { q: debouncedQuery.trim() } : {}),
        },
        signal,
      ),
    [page, userId, debouncedQuery],
  )
  const { data, setData, loading, error, refetch } = useAxios(fetchPosts)
  const posts = data?.posts || EMPTY_POSTS
  const pageCount = Math.max(1, Math.ceil((data?.total || 0) / PAGE_SIZE))
  const allVisibleSelected = useMemo(
    () => posts.length > 0 && posts.every((post) => selectedIds.includes(post.id)),
    [posts, selectedIds],
  )

  const updateQuery = (key, value) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    if (key !== 'page') next.delete('page')
    setSearchParams(next)
  }

  const togglePost = (id) => {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((selectedId) => selectedId !== id) : [...current, id],
    )
  }

  const deleteSelected = async () => {
    const targets = posts.filter((post) => deleteIds.includes(post.id))
    if (targets.length === 0) return

    setDeleting(true)
    setDeleteError('')
    setSelectedIds((current) => current.filter((id) => !deleteIds.includes(id)))
    setData((current) => ({
      ...current,
      posts: current.posts.filter((post) => !deleteIds.includes(post.id)),
      total: Math.max(0, current.total - targets.length),
    }))
    setDeleteIds([])

    const results = await Promise.allSettled(targets.map((post) => postApi.remove(post.id)))
    const failedPosts = targets.filter((_, index) => results[index].status === 'rejected')
    const successCount = targets.length - failedPosts.length

    if (failedPosts.length > 0) {
      setData((current) => ({
        ...current,
        posts: [...current.posts, ...failedPosts].sort((left, right) => left.id - right.id),
        total: current.total + failedPosts.length,
      }))
      setDeleteError(
        `Không xóa được ${failedPosts.map((post) => `#${post.id}`).join(', ')}. Đã khôi phục các bài này.`,
      )
    }

    if (successCount > 0) {
      const status = results.find((result) => result.status === 'fulfilled')?.value.status
      setNotice(`Đã xóa thành công ${successCount}/${targets.length} bài viết · HTTP ${status}.`)
    }
    setDeleting(false)
  }

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">NC6 · NC9 · NC10</p>
          <h1>Danh sách bài viết</h1>
          <p className="text-secondary">Tìm kiếm có debounce, lọc theo tác giả và xóa lạc quan.</p>
        </div>
        <Button as={Link} to="/posts/new">Tạo bài viết</Button>
      </div>

      <Card className="content-card mb-4">
        <Card.Body>
          <div className="row g-3">
            <Form.Group className="col-md-8" controlId="post-search">
              <Form.Label>Tìm kiếm bài viết</Form.Label>
              <Form.Control
                type="search"
                value={query}
                placeholder="Nhập từ khóa..."
                onChange={(event) => updateQuery('q', event.target.value)}
              />
              <Form.Text>API chỉ được gọi sau khi bạn ngừng gõ 500 ms.</Form.Text>
            </Form.Group>
            <Form.Group className="col-md-4" controlId="post-user">
              <Form.Label>Lọc theo tác giả</Form.Label>
              <Form.Select value={userId} onChange={(event) => updateQuery('userId', event.target.value)}>
                <option value="">Tất cả tác giả</option>
                {Array.from({ length: 10 }, (_, index) => index + 1).map((id) => (
                  <option value={id} key={id}>Tác giả #{id}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
        </Card.Body>
      </Card>

      {deleteError && (
        <Alert variant="danger" dismissible onClose={() => setDeleteError('')}>{deleteError}</Alert>
      )}
      {error && (
        <Alert variant="danger">
          {error}{' '}
          <Button variant="link" className="p-0" onClick={() => void refetch()}>Thử lại</Button>
        </Alert>
      )}

      <Card className="content-card">
        <Card.Header className="d-flex flex-wrap align-items-center justify-content-between gap-2">
          <Form.Check
            type="checkbox"
            label="Chọn tất cả trang này"
            checked={allVisibleSelected}
            onChange={() => setSelectedIds((current) =>
              allVisibleSelected
                ? current.filter((id) => !posts.some((post) => post.id === id))
                : [...new Set([...current, ...posts.map((post) => post.id)])],
            )}
          />
          <Button
            variant="outline-danger"
            size="sm"
            disabled={selectedIds.length === 0 || deleting}
            onClick={() => setDeleteIds(posts.filter((post) => selectedIds.includes(post.id)).map((post) => post.id))}
          >
            Xóa đã chọn ({selectedIds.length})
          </Button>
        </Card.Header>

        {loading ? (
          <div className="p-5 text-center">
            <Spinner animation="border" role="status" />
            <span className="ms-2">Đang tải bài viết...</span>
          </div>
        ) : posts.length === 0 ? (
          <Card.Body className="text-secondary">Không tìm thấy bài viết nào.</Card.Body>
        ) : (
          <ListGroup variant="flush">
            {posts.map((post) => (
              <ListGroup.Item key={post.id} className="d-flex gap-3 align-items-start py-3">
                <Form.Check
                  aria-label={`Chọn bài viết ${post.id}`}
                  checked={selectedIds.includes(post.id)}
                  onChange={() => togglePost(post.id)}
                />
                <div className="flex-grow-1">
                  <Link className="post-link" to={`/posts/${post.id}`}>
                    <strong>#{post.id} · {post.title}</strong>
                  </Link>
                  <p className="mb-1 mt-1 text-secondary">{post.body}</p>
                  <small className="text-secondary">Tác giả #{post.userId}</small>
                </div>
                <Button
                  variant="outline-danger"
                  size="sm"
                  disabled={deleting}
                  onClick={() => setDeleteIds([post.id])}
                >
                  Xóa
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <span className="text-secondary">Trang {page} / {pageCount} · Tổng {data?.total || 0} bài</span>
        <Pagination className="mb-0">
          <Pagination.Prev
            disabled={page <= 1}
            onClick={() => updateQuery('page', String(page - 1))}
          />
          <Pagination.Item active>{page}</Pagination.Item>
          <Pagination.Next
            disabled={page >= pageCount}
            onClick={() => updateQuery('page', String(page + 1))}
          />
        </Pagination>
      </div>

      <Modal show={deleteIds.length > 0} onHide={() => setDeleteIds([])} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Xóa {deleteIds.length} bài viết đã chọn? Giao diện sẽ cập nhật ngay; nếu server lỗi, bài viết sẽ được khôi phục.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteIds([])} disabled={deleting}>Hủy</Button>
          <Button variant="danger" onClick={() => void deleteSelected()} disabled={deleting}>
            {deleting ? 'Đang xóa...' : 'Xác nhận xóa'}
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          bg="success"
          onClose={() => setNotice('')}
          show={Boolean(notice)}
          delay={3500}
          autohide
        >
          <Toast.Header><strong className="me-auto">DemoAxios</strong></Toast.Header>
          <Toast.Body className="text-white">{notice}</Toast.Body>
        </Toast>
      </ToastContainer>
    </section>
  )
}

export default PostList
