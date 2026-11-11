import { useState } from 'react';
import { Container, Nav } from 'react-bootstrap';
import Counter from './components/Counter.jsx';
import TodoDemo from './components/TodoDemo.jsx';
import UsersDemo from './components/UsersDemo.jsx';
import ShopDemo from './components/ShopDemo.jsx';
import StudentsDemo from './components/StudentsDemo.jsx';

export default function App() {
  const [tab, setTab] = useState('todo');
  const pages = { counter: <Counter />, todo: <TodoDemo />, users: <UsersDemo />, cart: <ShopDemo />, students: <StudentsDemo /> };
  return <><Nav variant="tabs" activeKey={tab} onSelect={(k) => setTab(k)} className="px-3 pt-3"><Nav.Item><Nav.Link eventKey="todo">Bài 2 · Todo</Nav.Link></Nav.Item><Nav.Item><Nav.Link eventKey="users">Bài 3 · Users</Nav.Link></Nav.Item><Nav.Item><Nav.Link eventKey="cart">Bài 4 · Giỏ hàng</Nav.Link></Nav.Item><Nav.Item><Nav.Link eventKey="students">Bài 5 · Sinh viên</Nav.Link></Nav.Item><Nav.Item><Nav.Link eventKey="counter">Bài 1</Nav.Link></Nav.Item></Nav><Container className="py-4">{pages[tab]}</Container></>;
}
