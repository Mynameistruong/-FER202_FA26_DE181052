import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

export default function StudentForm({ onAddStudent }) {
  const [name, setName] = useState('')
  const canAdd = name.trim().length >= 3

  function handleSubmit(event) {
    event.preventDefault()
    if (!canAdd) return

    onAddStudent(name.trim())
    setName('')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Label htmlFor="student-name">Họ tên sinh viên mới</Form.Label>
      <div className="d-flex gap-2">
        <Form.Control
          id="student-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Nhập ít nhất 3 ký tự"
        />
        <Button type="submit" disabled={!canAdd}>Thêm</Button>
      </div>
    </Form>
  )
}