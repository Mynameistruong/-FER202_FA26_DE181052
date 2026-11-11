import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup, Card, Form, InputGroup, ListGroup } from 'react-bootstrap';
import { addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted, setFilter } from '../redux/todoActions';

export default function TodoDemo() {
  const dispatch = useDispatch(); const { todos, filter } = useSelector((s) => s.todo);
  const [text, setText] = useState(''); const [editing, setEditing] = useState(null); const [editText, setEditText] = useState('');
  const visible = useMemo(() => filter === 'active' ? todos.filter((t) => !t.done) : filter === 'done' ? todos.filter((t) => t.done) : todos, [todos, filter]);
  const submit = (e) => { e.preventDefault(); if (text.trim()) { dispatch(addTodo(text.trim())); setText(''); } };
  return <Card className="shadow"><Card.Body><h3>📝 Todo — Redux thuần</h3>
    <Form onSubmit={submit}><InputGroup><Form.Control placeholder="Nhập công việc..." value={text} onChange={(e) => setText(e.target.value)} /><Button type="submit">Thêm</Button></InputGroup></Form>
    <ButtonGroup className="my-3">{[['all','Tất cả'],['active','Chưa xong'],['done','Đã xong']].map(([k,l]) => <Button key={k} variant={filter === k ? 'primary' : 'outline-primary'} onClick={() => dispatch(setFilter(k))}>{l}</Button>)}</ButtonGroup>
    <ListGroup>{visible.map((t) => <ListGroup.Item key={t.id} className="d-flex align-items-center gap-2"><Form.Check checked={t.done} onChange={() => dispatch(toggleTodo(t.id))} />{editing === t.id ? <Form.Control autoFocus value={editText} onChange={(e) => setEditText(e.target.value)} onBlur={() => { if (editText.trim()) dispatch(editTodo(t.id, editText.trim())); setEditing(null); }} onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()} /> : <span className="flex-grow-1" style={{ textDecoration: t.done ? 'line-through' : 'none' }} onDoubleClick={() => { setEditing(t.id); setEditText(t.text); }}>{t.text}</span>}<Button size="sm" variant="outline-danger" onClick={() => dispatch(deleteTodo(t.id))}>Xóa</Button></ListGroup.Item>)}</ListGroup>
    <div className="d-flex justify-content-between mt-3"><small>Còn <b>{todos.filter((t) => !t.done).length}</b> việc chưa xong</small><Button size="sm" variant="link" onClick={() => dispatch(clearCompleted())}>Xóa việc đã xong</Button></div>
  </Card.Body></Card>;
}
