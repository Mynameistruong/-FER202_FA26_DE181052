import { useReducer, useState } from 'react'
import { Button, ButtonGroup, Card, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { COLORS, initialNotes, NOTE_ACTIONS } from '../../data/notesData.js'
import { notesReducer } from '../../reducers/notesReducer.js'
import { createHistory, undoable } from '../../reducers/undoable.js'

const notesWithHistory = undoable(notesReducer)

export default function NotesBoard() {
  const [history, dispatch] = useReducer(notesWithHistory, initialNotes, createHistory)
  const [text, setText] = useState('')
  const [color, setColor] = useState(COLORS[0])
  const { past, present, future } = history
  const notes = [...present.items].sort((first, second) => Number(second.pinned) - Number(first.pinned))

  const handleAdd = (event) => {
    event.preventDefault()
    dispatch({ type: NOTE_ACTIONS.ADD, payload: { text, color } })
    setText('')
  }

  const handleKeyDown = (event) => {
    if (!event.ctrlKey) return
    if (event.key.toLowerCase() === 'z') {
      event.preventDefault()
      dispatch({ type: 'UNDO' })
    } else if (event.key.toLowerCase() === 'y') {
      event.preventDefault()
      dispatch({ type: 'REDO' })
    }
  }

  return (
    <section aria-label="Bảng ghi chú" onKeyDown={handleKeyDown}>
      <div className="d-flex flex-wrap gap-2 mb-3">
        <Form onSubmit={handleAdd} className="flex-grow-1">
          <InputGroup>
            <Form.Control aria-label="Nội dung ghi chú" placeholder="Nội dung ghi chú" value={text} onChange={(event) => setText(event.target.value)} />
            <Form.Select aria-label="Màu ghi chú" className="flex-grow-0" style={{ width: 115 }} value={color} onChange={(event) => setColor(event.target.value)}>
              {COLORS.map((value, index) => <option key={value} value={value}>{`Màu ${index + 1}`}</option>)}
            </Form.Select>
            <Button type="submit" disabled={!text.trim()}>Thêm</Button>
          </InputGroup>
        </Form>
        <ButtonGroup aria-label="Lịch sử ghi chú">
          <Button variant="outline-dark" disabled={!past.length} onClick={() => dispatch({ type: 'UNDO' })}>{`↶ Hoàn tác (${past.length})`}</Button>
          <Button variant="outline-dark" disabled={!future.length} onClick={() => dispatch({ type: 'REDO' })}>{`↷ Làm lại (${future.length})`}</Button>
        </ButtonGroup>
        <Button variant="outline-danger" disabled={!present.items.length} onClick={() => dispatch({ type: NOTE_ACTIONS.CLEAR_ALL })}>Xóa hết</Button>
      </div>
      <Row xs={1} md={2} lg={3} className="g-3">
        {notes.map(({ id, text: noteText, color: noteColor, pinned }) => (
          <Col key={id}>
            <Card className="note-card h-100 border-0 shadow-sm" style={{ backgroundColor: noteColor }}>
              <Card.Body className="d-flex flex-column">
                <Card.Text className="flex-grow-1">{pinned && <span aria-label="Đã ghim">📌 </span>}{noteText}</Card.Text>
                <div className="d-flex gap-2 align-items-center">
                  {COLORS.map((value) => (
                    <button key={value} className="note-color-button" type="button" aria-label={`Đổi màu ${value}`} aria-pressed={noteColor === value} onClick={() => dispatch({ type: NOTE_ACTIONS.CHANGE_COLOR, payload: { id, color: value } })} style={{ backgroundColor: value, border: noteColor === value ? '2px solid #26382d' : '1px solid #89958d' }} />
                  ))}
                  <Button size="sm" variant="link" className="ms-auto p-0" onClick={() => dispatch({ type: NOTE_ACTIONS.TOGGLE_PIN, payload: id })}>{pinned ? 'Bỏ ghim' : 'Ghim'}</Button>
                  <Button size="sm" variant="link" className="text-danger p-0" onClick={() => dispatch({ type: NOTE_ACTIONS.DELETE, payload: id })}>Xóa</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {notes.length === 0 && <p className="text-secondary mt-3">Chưa có ghi chú. Thử bấm Hoàn tác.</p>}
    </section>
  )
}