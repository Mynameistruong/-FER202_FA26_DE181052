import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import useAuth from '../context/useAuth';
import useCart from '../context/useCart';
import useTheme from '../context/useTheme';

const menuItems = [
  { key: 'shop', label: 'Cửa hàng' },
  { key: 'cart', label: 'Giỏ hàng' },
  { key: 'checkout', label: 'Thanh toán' },
];

const StoreHeader = ({ currentPage, onNavigate }) => {
  const { totalQuantity } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  return (
    <Navbar expand="lg" bg={theme} data-bs-theme={theme} className="border-bottom mb-4">
      <Container fluid className="px-0">
        <Navbar.Brand className="fw-bold">FPT Shop Mini</Navbar.Brand>
        <Navbar.Toggle aria-controls="store-navigation" />
        <Navbar.Collapse id="store-navigation">
          <Nav className="me-auto" activeKey={currentPage}>
            {menuItems.map(({ key, label }) => (
              <Nav.Link
                key={key}
                eventKey={key}
                onClick={(event) => { event.preventDefault(); onNavigate(key); }}
              >
                {label}
                {key === 'cart' && totalQuantity > 0 && <Badge bg="primary" className="ms-2">{totalQuantity}</Badge>}
              </Nav.Link>
            ))}
            <Nav.Link
              eventKey="login"
              onClick={(event) => { event.preventDefault(); onNavigate('login'); }}
            >
              Đăng nhập
            </Nav.Link>
          </Nav>
          <div className="d-flex align-items-center gap-2">
            {user && <span className="small">Xin chào, {user.name}</span>}
            {user && <Button size="sm" variant="outline-danger" onClick={logout}>Đăng xuất</Button>}
            <Button size="sm" variant="outline-secondary" onClick={toggleTheme}>
              {theme === 'light' ? '🌙' : '☀️'}
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default StoreHeader;
