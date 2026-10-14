import { Container } from 'react-bootstrap';

export const AppFooter = () => (
  <footer className="bg-dark text-light py-4 mt-4">
    <Container>
      <h5>Thông tin về trang</h5>
      <p className="mb-1">Trang web cá nhân của Trường.</p>
      <p className="mb-1">Chia sẻ thông tin và các dự án của mình.</p>
      <a className="text-light" href="mailto:truong@example.com">
        truong@example.com
      </a>
      <p className="mt-3 mb-0">
        © {new Date().getFullYear()} Trường. All rights reserved.
      </p>
    </Container>
  </footer>
);