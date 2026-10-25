import { useCallback, useState } from 'react'
import { Alert, Button, Card, Form, ListGroup, Modal, Spinner } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import postApi from '../api/postApi.js'
import useAxios from '../hooks/useAxios.js'

function PostDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const fetchPost = useCallback((signal) => postApi.getById(id, signal), [id])
  const { data: post, loading, error, refetch } = useAxios(fetchPost)
  const fetchRelated = useCallback(async (signal) => {
    if (!post) return null
    const [authorResult, commentsResult] = await Promise.allSettled([
      postApi.getUser(post.userId, signal),
      postApi.getComments(post.id, signal),
    ])
    return { authorResult, commentsResult }
  }, [post])
  const {
    data: relatedData,
    loading: relatedLoading,
    error: relatedError,
    refetch: refetchRelated,
  } = useAxios(fetchRelated)
  const [comparing, setComparing] = useState(false)
  const [timings, setTimings] = useState(null)
  const [titleDraft, setTitleDraft] = useState(null)
  const [patching, setPatching] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [actionError, setActionError] = useState('')
  const [actionNotice, setActionNotice] = useState('')

  const author = relatedData?.authorResult?.status === 'fulfilled'
    ? relatedData.authorResult.value
    : null
  const comments = relatedData?.commentsResult?.status === 'fulfilled'
    ? relatedData.commentsResult.value
    : []
  const relatedFailure = relatedError
    || (relatedData?.authorResult?.status === 'rejected' && relatedData.authorResult.reason.message)
    || (relatedData?.commentsResult?.status === 'rejected' && relatedData.commentsResult.reason.message)
  const title = titleDraft?.id === post?.id ? titleDraft.value : (post?.title || '')

  const compareRequestTimes = async () => {
    setTimings(null)
    setComparing(true)
    setActionError('')
    try {
      const sequentialStart = performance.now()
      await postApi.getUser(post.userId)
      await postApi.getComments(post.id)
      const sequentialMs = Math.round(performance.now() - sequentialStart)

      const parallelStart = performance.now()
      await Promise.all([
        postApi.getUser(post.userId),
        postApi.getComments(post.id),
      ])
      const parallelMs = Math.round(performance.now() - parallelStart)
      setTimings({ sequentialMs, parallelMs })
    } catch (requestError) {
      setActionError(requestError.message)
    } finally {
      setComparing(false)
    }
  }

  const updateTitle = async (event) => {
    event.preventDefault()
    if (!title.trim() || title.trim() === post.title) return

    setPatching(true)
    setActionError('')
    setActionNotice('')
    try {
      const response = await postApi.patch(id, { title: title.trim() })
      setActionNotice(`Đã cập nhật tiêu đề · HTTP ${response.status}.`)
      await refetch()
    } catch (requestError) {
      setActionError(requestError.message)
    } finally {
      setPatching(false)
    }
  }

  const deletePost = async () => {
    setDeleting(true)
    setActionError('')
    try {
      const response = await postApi.remove(id)
      navigate('/posts', { state: { notice: `Đã xóa bài viết #${id} · HTTP ${response.status}.` } })
    } catch (requestError) {
      setActionError(requestError.message)
    } finally {
      setDeleting(false)
      setShowDelete(false)
    }
  }

  if (loading) return <div className="py-5 text-center"><Spinner animation="border" /> Đang tải bài viết...</div>
  if (error) return <Alert variant="danger">{error} <Button variant="link" onClick={() => void refetch()}>Thử lại</Button></Alert>
  if (!post) return <Alert variant="warning">Không tìm thấy bài viết.</Alert>

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">GET · PATCH · DELETE · NC3</p>
          <h1>Bài viết #{post.id}</h1>
        </div>
        <div className="d-flex flex-wrap gap-2">
          <Button as={Link} to={`/posts/${id}/edit`} variant="outline-primary">Sửa toàn bộ (PUT)</Button>
          <Button variant="outline-danger" onClick={() => setShowDelete(true)}>Xóa</Button>
        </div>
      </div>

      {actionError && <Alert variant="danger" dismissible onClose={() => setActionError('')}>{actionError}</Alert>}
      {actionNotice && (
        <Alert variant="success" dismissible onClose={() => setActionNotice('')}>
          {actionNotice}
        </Alert>
      )}
      {relatedFailure && (
        <Alert variant="warning">
          {relatedFailure}{' '}
          <Button variant="link" className="p-0" onClick={() => void refetchRelated()}>Thử lại</Button>
        </Alert>
      )}

      <Card className="content-card mb-4">
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.body}</Card.Text>
          <div className="small text-secondary">
            Tác giả: {author ? `${author.name} (${author.email})` : relatedLoading ? 'Đang tải...' : `#${post.userId}`}
          </div>
          <Form className="mt-4" onSubmit={updateTitle}>
            <Form.Label htmlFor="quick-title">Sửa nhanh tiêu đề (PATCH)</Form.Label>
            <div className="d-flex gap-2">
              <Form.Control
                id="quick-title"
                value={title}
                onChange={(event) => setTitleDraft({ id: post.id, value: event.target.value })}
              />
              <Button type="submit" disabled={patching || !title.trim()}>
                {patching ? 'Đang lưu...' : 'Lưu'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <Card className="content-card mb-4">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <strong>Bình luận</strong>
          <Button size="sm" variant="outline-secondary" onClick={() => void compareRequestTimes()} disabled={relatedLoading || comparing}>
            {comparing ? 'Đang đo...' : 'So sánh tuần tự / song song'}
          </Button>
        </Card.Header>
        {relatedLoading ? (
          <Card.Body><Spinner size="sm" animation="border" /> Đang tải dữ liệu liên quan...</Card.Body>
        ) : comments.length === 0 ? (
          <Card.Body className="text-secondary">
            Bài viết này chưa có bình luận.
          </Card.Body>
        ) : (
          <ListGroup variant="flush">
            {comments.map((comment) => (
              <ListGroup.Item key={comment.id}>
                <strong>{comment.name}</strong>
                <div className="small text-secondary">{comment.email}</div>
                <p className="mb-0 mt-2">{comment.body}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
        {timings && (
          <Card.Footer className="small text-secondary">
            Tuần tự: {timings.sequentialMs} ms · Song song (Promise.all): {timings.parallelMs} ms
          </Card.Footer>
        )}
      </Card>

      <Modal show={showDelete} onHide={() => setShowDelete(false)} centered>
        <Modal.Header closeButton><Modal.Title>Xóa bài viết #{id}?</Modal.Title></Modal.Header>
        <Modal.Body>Thao tác này sẽ xóa bài viết khỏi danh sách.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDelete(false)} disabled={deleting}>Hủy</Button>
          <Button variant="danger" onClick={() => void deletePost()} disabled={deleting}>
            {deleting ? 'Đang xóa...' : 'Xác nhận xóa'}
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  )
}

export default PostDetail
