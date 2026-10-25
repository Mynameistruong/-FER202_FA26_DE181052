import { useState } from 'react'
import { Container, Nav, Navbar, Toast, ToastContainer } from 'react-bootstrap'
import { NavLink, Outlet, useLocation } from 'react-router-dom'

function Layout() {
  const location = useLocation()
  const [dismissedNoticeKey, setDismissedNoticeKey] = useState(null)
  const notice = dismissedNoticeKey === location.key ? '' : location.state?.notice

  return (
    <>
      <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="shadow-sm">
        <Container>
          <Navbar.Brand as={NavLink} to="/posts">DemoAxios</Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navigation" />
          <Navbar.Collapse id="main-navigation">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/posts">Bài viết</Nav.Link>
              <Nav.Link as={NavLink} to="/posts/new">Tạo bài viết</Nav.Link>
              <Nav.Link as={NavLink} to="/axios-demo">Hủy request</Nav.Link>
              <Nav.Link as={NavLink} to="/request-config">Request config</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main className="app-main">
        <Container className="py-4 py-lg-5">
          <Outlet />
        </Container>
      </main>

      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          bg="success"
          onClose={() => setDismissedNoticeKey(location.key)}
          show={Boolean(notice)}
          delay={3500}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">DemoAxios</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{notice}</Toast.Body>
          {location.state?.result && (
            <pre className="toast-result mb-0">{JSON.stringify(location.state.result, null, 2)}</pre>
          )}
        </Toast>
      </ToastContainer>
    </>
  )
}

export default Layout
