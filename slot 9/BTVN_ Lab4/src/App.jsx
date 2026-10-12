import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import AuthProvider from './context/AuthProvider';
import useAuth from './context/useAuth';
import CartProvider from './context/CartProvider';
import ThemeProvider from './context/ThemeProvider';
import useTheme from './context/useTheme';
import CartDemoPage from './pages/CartDemoPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ShopPage from './pages/ShopPage';
import ThemeAuthDemo from './pages/ThemeAuthDemo';
import LoginForm from './components/LoginForm';
import MiniCart from './components/MiniCart';
import ProductFilter from './components/ProductFilter';
import ProfilePreview from './components/ProfilePreview';
import QuantityPicker from './components/QuantityPicker';
import RegisterForm from './components/RegisterForm';
import TodoList from './components/TodoList';
import ValidatedRegisterForm from './components/ValidatedRegisterForm';
import StoreHeader from './components/StoreHeader';
import { products } from './data/products';
import './App.css';

const lessons = [
  { id: '1', label: 'Bài 1 · useState', title: 'Bộ chọn số lượng và giỏ hàng mini', description: 'State số, state mảng và cập nhật bất biến.' },
  { id: '2', label: 'Bài 2 · Controlled', title: 'Form hồ sơ xem trước trực tiếp', description: 'Controlled input, sự kiện bàn phím và focus.' },
  { id: '3', label: 'Bài 3 · Derived state', title: 'Tìm kiếm, lọc và sắp xếp', description: 'Kết hợp nhiều state để suy ra danh sách sản phẩm.' },
  { id: '4', label: 'Bài 4 · Form state', title: 'Form đăng ký có điều khiển', description: 'Quản lý form bằng một object và xử lý submit.' },
  { id: '5', label: 'Bài 5 · Validation', title: 'Form đăng ký có validation', description: 'Regex, lỗi theo touched và kiểm tra dữ liệu.' },
  { id: '6', label: 'Bài 6 · Todo', title: 'Todo list', description: 'Thêm, sửa, xóa bất biến và lọc công việc.' },
  { id: '7', label: 'Bài 7 · useReducer', title: 'Giỏ hàng với useReducer', description: 'Reducer thuần, action và dữ liệu tổng hợp.' },
  { id: '8', label: 'Bài 8 · Login', title: 'Đăng nhập với useReducer', description: 'Validation và trạng thái gửi giả lập API.' },
  { id: '9', label: 'Bài 9 · useContext', title: 'Theme và đăng nhập với useContext', description: 'Chia sẻ theme và người dùng qua Provider.' },
  { id: '10', label: 'Bài 10 · Tổng hợp', title: 'Cửa hàng mini', description: 'Context, reducer, giỏ hàng và thanh toán.' },
];

const LessonOne = () => (
  <>
    <section className="exercise-section" aria-labelledby="quantity-title">
      <div className="section-heading"><div><span className="section-index">01A</span><h2 id="quantity-title">Bộ chọn số lượng</h2></div><p>Functional update</p></div>
      <Card className="exercise-panel"><Card.Body>
        <div className="picker-row"><div><h3>Bộ chọn mặc định</h3><p>Giới hạn từ 1 đến 10</p></div><QuantityPicker /></div>
        <div className="picker-row"><div><h3>Bộ chọn độc lập</h3><p>Giới hạn từ 2 đến 5</p></div><QuantityPicker min={2} max={5} /></div>
        <div className="experiment-note"><strong>Thử nghiệm:</strong> đặt lại về 1 rồi so sánh “+3 (sai)” với “+3 (đúng)”. Functional update giúp mỗi lần cập nhật đọc state mới nhất.</div>
      </Card.Body></Card>
    </section>
    <section className="exercise-section" aria-labelledby="cart-title">
      <div className="section-heading"><div><span className="section-index">01B</span><h2 id="cart-title">Giỏ hàng mini</h2></div><p>Tổng số lượng và thành tiền tự cập nhật</p></div>
      <Card className="exercise-panel"><Card.Body><MiniCart /></Card.Body></Card>
    </section>
  </>
);

const LessonContent = ({ lessonId }) => {
  switch (lessonId) {
    case '1': return <LessonOne />;
    case '2': return <ProfilePreview />;
    case '3': return <ProductFilter products={products} />;
    case '4': return <RegisterForm />;
    case '5': return <ValidatedRegisterForm />;
    case '6': return <TodoList />;
    case '7': return <CartDemoPage />;
    case '8': return <LoginForm />;
    case '9': return <ThemeAuthDemo />;
    default: return null;
  }
};

const StoreContent = () => {
  const [page, setPage] = useState('shop');
  const { login } = useAuth();
  const navigate = (nextPage) => setPage(nextPage);

  return (
    <>
      <StoreHeader currentPage={page} onNavigate={navigate} />
      {page === 'shop' && <ShopPage />}
      {page === 'cart' && <CartPage onCheckout={navigate} />}
      {page === 'checkout' && <CheckoutPage onNavigate={navigate} />}
      {page === 'login' && <Card><Card.Body>
        <h2 className="h4">Đăng nhập</h2>
        <LoginForm onLoginSuccess={(email) => { login(email); navigate('shop'); }} />
      </Card.Body></Card>}
    </>
  );
};

const AppShell = () => {
  const [lessonId, setLessonId] = useState('1');
  const { theme } = useTheme();
  const activeLesson = lessons.find((lesson) => lesson.id === lessonId);
  const isStore = lessonId === '10';

  return (
    <main className="lab-page" data-bs-theme={theme}>
      <Container className="lab-container">
        <header className="page-heading">
          <div>
            <p className="eyebrow">FER202 <span>/</span> REACT HOOKS</p>
            <h1>{isStore ? 'Bài 10' : `Bài ${lessonId}`} <span>·</span> {isStore ? 'Cửa hàng mini' : activeLesson.title}</h1>
            <p className="heading-note">{isStore ? 'Ứng dụng tổng hợp Context, reducer, validation và thanh toán.' : activeLesson.description}</p>
          </div>
          <div className="lesson-stamp">{lessonId.padStart(2, '0')} <small>/ 10</small></div>
        </header>

        <Nav
          variant="pills"
          activeKey={lessonId}
          onSelect={(key) => key && setLessonId(key)}
          className="exercise-nav flex-nowrap overflow-auto"
          aria-label="Điều hướng 10 bài tập Hook"
        >
          {lessons.map((lesson) => (
            <Nav.Item key={lesson.id} className="flex-shrink-0">
              <Nav.Link eventKey={lesson.id}>{lesson.label}</Nav.Link>
            </Nav.Item>
          ))}
        </Nav>

        {!isStore && <LessonContent lessonId={lessonId} />}
        {isStore && <StoreContent />}

        <footer className="page-footer"><span>React Hooks · FER202</span><span>React-Bootstrap</span></footer>
      </Container>
    </main>
  );
};

const App = () => (
  <ThemeProvider>
    <AuthProvider>
      <CartProvider>
        <AppShell />
      </CartProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default App;
