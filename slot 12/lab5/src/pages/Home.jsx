import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Home = () => (
  <Container className="mt-4">
    <h1>Trang Chủ</h1>
    <p>Chào mừng bạn đến với trang web cá nhân!</p>
    <div className="text-center mt-4">
      <Button as={Link} to="/about" variant="primary">
        Tìm hiểu thêm
      </Button>
    </div>
  </Container>
);
export default Home;