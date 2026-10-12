import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => (
  <Container className="mt-5 text-center">
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <Link to="/" className="btn btn-outline-primary">
      Go to Home
    </Link>
  </Container>
);

export default NotFoundPage;