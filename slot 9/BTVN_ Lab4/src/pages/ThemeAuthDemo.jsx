import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import useAuth from '../context/useAuth';
import useTheme from '../context/useTheme';
import LoginForm from '../components/LoginForm';

const ThemeAuthDemo = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, isLoggedIn, login, logout } = useAuth();
  return (
    <div data-bs-theme={theme}>
      <Nav variant="pills" className="mb-3 align-items-center justify-content-between">
        <Nav.Item><Nav.Link active>Trang chủ</Nav.Link></Nav.Item>
        <div className="d-flex align-items-center gap-2">
          <Button variant="outline-secondary" onClick={toggleTheme}>
            {theme === 'light' ? '🌙 Tối' : '☀️ Sáng'}
          </Button>
          {isLoggedIn ? (
            <>
              <span className="small">Xin chào, {user.name}</span>
              <Button variant="outline-danger" onClick={logout}>Đăng xuất</Button>
            </>
          ) : <span className="small text-secondary">Chưa đăng nhập</span>}
        </div>
      </Nav>
      <Card><Card.Body>
        {isLoggedIn ? (
          <Alert variant="success" className="mb-0">
            Bạn đã đăng nhập bằng <strong>{user.email}</strong>. Dữ liệu người dùng được lấy trực tiếp từ AuthContext.
          </Alert>
        ) : (
          <>
            <Card.Title>Đăng nhập để tiếp tục</Card.Title>
            <p className="small text-secondary">Tài khoản thử: admin@fpt.edu.vn / 12345678</p>
            <LoginForm onLoginSuccess={login} />
          </>
        )}
      </Card.Body></Card>
    </div>
  );
};

export default ThemeAuthDemo;
