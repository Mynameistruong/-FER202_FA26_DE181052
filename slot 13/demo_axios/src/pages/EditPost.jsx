import { useCallback, useState } from 'react'
import { Alert, Button, Card, Form, Spinner } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import postApi from '../api/postApi.js'
import useAxios from '../hooks/useAxios.js'

function EditPost() {
  const { id } = useParams()
  const navigate = useNavigate()
  const fetchPost = useCallback((signal) => postApi.getById(id, signal), [id])
  const { data: post, loading, error: loadError, refetch } = useAxios(fetchPost)
  const [form, setForm] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const currentForm = form?.id === post?.id ? form : post
  const title = currentForm?.title || ''
  const body = currentForm?.body || ''
  const titleError = submitted && title.trim().length < 5
  const bodyError = submitted && body.trim().length < 10

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitted(true)
    setError('')
    if (title.trim().length < 5 || body.trim().length < 10 || !post) return

    setSaving(true)
    try {
      const response = await postApi.update(id, {
        id: post.id,
        userId: post.userId,
        title: title.trim(),
        body: body.trim(),
      })
      navigate(`/posts/${id}`, {
        state: { notice: `Đã cập nhật bài viết #${id} · HTTP ${response.status}.` },
      })
      return response
    } catch (requestError) {
      setError(requestError.message)
      return undefined
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="py-5 text-center"><Spinner animation="border" /> Đang tải bài viết...</div>
  if (loadError) {
    return <Alert variant="danger">{loadError} <Button variant="link" onClick={() => void refetch()}>Thử lại</Button></Alert>
  }
  if (!post) return <Alert variant="warning">Không tìm thấy bài viết.</Alert>

  return (
    <section className="form-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">PUT · NC5 · NC6</p>
          <h1>Sửa bài viết #{post.id}</h1>
          <p className="text-secondary">PUT gửi toàn bộ các trường của bài viết.</p>
        </div>
      </div>
      <Card className="content-card">
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="edit-title">
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control value={title} isInvalid={Boolean(titleError)} onChange={(event) => setForm({ ...currentForm, title: event.target.value })} />
              <Form.Control.Feedback type="invalid">Tiêu đề cần ít nhất 5 ký tự.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-4" controlId="edit-body">
              <Form.Label>Nội dung</Form.Label>
              <Form.Control as="textarea" rows={5} value={body} isInvalid={Boolean(bodyError)} onChange={(event) => setForm({ ...currentForm, body: event.target.value })} />
              <Form.Control.Feedback type="invalid">Nội dung cần ít nhất 10 ký tự.</Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" disabled={saving}>
              {saving ? 'Đang lưu...' : 'Cập nhật toàn bộ (PUT)'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </section>
  )
}

export default EditPost
