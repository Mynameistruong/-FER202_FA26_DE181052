import { useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';

const FILTERS = { all: 'Tất cả', active: 'Chưa xong', done: 'Đã xong' };
const initialTodos = [
  { id: 1, title: 'Ôn lại ES6', done: true },
  { id: 2, title: 'Làm bài tập useState', done: false },
];

const TodoList = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const validateTitle = (text, ignoreId = null) => {
    const trimmed = text.trim();
    if (!trimmed) return 'Nội dung không được để trống';
    if (trimmed.length > 60) return 'Nội dung không được dài quá 60 ký tự';
    if (todos.some((todo) => todo.id !== ignoreId && todo.title.toLocaleLowerCase('vi') === trimmed.toLocaleLowerCase('vi'))) {
      return 'Công việc này đã có trong danh sách';
    }
    return '';
  };

  const handleAdd = (event) => {
    event.preventDefault();
    const nextError = validateTitle(title);
    setError(nextError);
    if (nextError) return;
    setTodos((previous) => [...previous, { id: Date.now(), title: title.trim(), done: false }]);
    setTitle('');
  };
  const toggleTodo = (id) => {
    setTodos((previous) => previous.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
  };
  const deleteTodo = (id) => setTodos((previous) => previous.filter((todo) => todo.id !== id));
  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.title);
  };
  const saveEdit = (id) => {
    const nextError = validateTitle(editText, id);
    if (nextError) {
      setError(nextError);
      return;
    }
    setTodos((previous) => previous.map((todo) => (todo.id === id ? { ...todo, title: editText.trim() } : todo)));
    setError('');
    setEditingId(null);
  };
  const visibleTodos = todos.filter((todo) =>
    filter === 'all' || (filter === 'active' && !todo.done) || (filter === 'done' && todo.done),
  );
  const remaining = todos.filter((todo) => !todo.done).length;
  const hasCompleted = todos.some((todo) => todo.done);

  return (
    <Card><Card.Body>
      <Form noValidate onSubmit={handleAdd}>
        <Form.Label htmlFor="todo-title">Công việc mới</Form.Label>
        <div className="d-flex gap-2">
          <Form.Control
            id="todo-title"
            value={title}
            maxLength={61}
            isInvalid={Boolean(error)}
            onChange={(event) => { setTitle(event.target.value); setError(''); }}
            placeholder="Nhập công việc rồi nhấn Enter"
          />
          <Button type="submit">Thêm</Button>
        </div>
        {error && <div className="text-danger small mt-1">{error}</div>}
      </Form>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 my-3">
        <ButtonGroup size="sm" aria-label="Lọc công việc">
          {Object.entries(FILTERS).map(([key, label]) => (
            <Button key={key} variant={filter === key ? 'primary' : 'outline-primary'} onClick={() => setFilter(key)}>
              {label}
            </Button>
          ))}
        </ButtonGroup>
        <Badge bg="success">Còn {remaining} việc chưa xong</Badge>
      </div>
      <ListGroup>
        {visibleTodos.map((todo) => (
          <ListGroup.Item key={todo.id} className="d-flex align-items-center gap-2">
            <Form.Check
              type="checkbox"
              aria-label={`Đánh dấu ${todo.title} hoàn thành`}
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
            />
            {editingId === todo.id ? (
              <Form.Control
                autoFocus
                value={editText}
                isInvalid={Boolean(error)}
                onChange={(event) => { setEditText(event.target.value); setError(''); }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') saveEdit(todo.id);
                  if (event.key === 'Escape') { setEditText(todo.title); setEditingId(null); setError(''); }
                }}
                onBlur={() => { if (editingId === todo.id) saveEdit(todo.id); }}
              />
            ) : (
              <span
                className={`flex-grow-1 ${todo.done ? 'text-decoration-line-through text-secondary' : ''}`}
                onDoubleClick={() => startEdit(todo)}
                title="Nhấp đúp để sửa"
              >
                {todo.title}
              </span>
            )}
            <Button size="sm" variant="outline-danger" onClick={() => deleteTodo(todo.id)}>Xóa</Button>
          </ListGroup.Item>
        ))}
        {visibleTodos.length === 0 && <ListGroup.Item className="text-secondary">Không có công việc trong bộ lọc này.</ListGroup.Item>}
      </ListGroup>
      {hasCompleted && (
        <Button
          className="mt-3"
          variant="outline-secondary"
          size="sm"
          onClick={() => setTodos((previous) => previous.filter((todo) => !todo.done))}
        >
          Xóa việc đã xong
        </Button>
      )}
    </Card.Body></Card>
  );
};

export default TodoList;
