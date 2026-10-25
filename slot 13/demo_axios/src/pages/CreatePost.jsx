import { useState } from 'react'
import { Alert, Button, Card, Form, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import postApi from '../api/postApi.js'

function CreatePost() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [userId, setUserId] = useState('1')
  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const titleError = submitted && title.trim().length < 5
  const bodyError = submitted && body.trim().length < 10

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitted(true)
    setError('')
    if (title.trim().length < 5 || body.trim().length < 10) return

    setSaving(true)
    try {
      const response = await postApi.create({
        title: title.trim(),
        body: body.trim(),
        userId: Number(userId),
      })
      navigate('/posts', {
        state: {
          notice: `Đã tạo bài viết #${response.data.id} · HTTP ${response.status}.`,
          result: response.data,
        },
      })
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="form-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">POST · NC5 · NC6</p>
          <h1>Tạo bài viết</h1>
          <p className="text-secondary">Tiêu đề tối thiểu 5 ký tự, nội dung tối thiểu 10 ký tự.</p>
        </div>
      </div>
      <Card className="content-card">
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="create-title">
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control
                value={title}
                isInvalid={Boolean(titleError)}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">Tiêu đề cần ít nhất 5 ký tự.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="create-body">
              <Form.Label>Nội dung</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={body}
                isInvalid={Boolean(bodyError)}
                onChange={(event) => setBody(event.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">Nội dung cần ít nhất 10 ký tự.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-4" controlId="create-user">
              <Form.Label>Tác giả</Form.Label>
              <Form.Select value={userId} onChange={(event) => setUserId(event.target.value)}>
                {Array.from({ length: 10 }, (_, index) => index + 1).map((id) => (
                  <option value={id} key={id}>Tác giả #{id}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button type="submit" disabled={saving}>
              {saving ? <><Spinner size="sm" className="me-2" />Đang gửi...</> : 'Tạo bài viết'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </section>
  )
}

export default CreatePost
