
import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';

const NavbarComponent = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3 shadow-sm">
      <Container>
        <Navbar.Brand href="#home" className="fw-bold fs-4 text-warning">
          Pizza House
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center gap-3">
            <Nav.Link href="#home" className="text-white active">Home</Nav.Link>
            <Nav.Link href="#about" className="text-white-50">About Us</Nav.Link>
            <Nav.Link href="#contact" className="text-white-50">Contact</Nav.Link>
            <Form className="d-flex ms-2">
              <Form.Control
                type="search"
                placeholder="Search"
                className="bg-secondary text-white border-0 me-2"
                aria-label="Search"
                size="sm"
              />
              <Button variant="danger" size="sm">
                <i className="bi bi-search"></i> 🔍
              </Button>
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent; 