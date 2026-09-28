import { Container, Form, Row, Col, Button } from 'react-bootstrap';

const BookingForm = () => {
  return (
    <section id="contact" className="booking-section py-5 text-white">
      <Container style={{ maxWidth: '800px' }}>
        <h2 className="text-center mb-4 fw-bold">Book Your Table</h2>
        <Form>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Control type="text" placeholder="Your Name *" className="bg-secondary text-white border-0 py-2" />
            </Col>
            <Col md={4}>
              <Form.Control type="email" placeholder="Your Email *" className="bg-secondary text-white border-0 py-2" />
            </Col>
            <Col md={4}>
              <Form.Select className="bg-secondary text-white border-0 py-2">
                <option>Select a Service</option>
                <option value="1">Sitting</option>
                <option value="2">Delivery</option>
              </Form.Select>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Control as="textarea" rows={4} placeholder="Please write your comment" className="bg-secondary text-white border-0" />
            </Col>
          </Row>
          <div className="text-center">
            <Button variant="warning" type="submit" className="px-5 py-2 text-uppercase fw-bold text-dark">
              Send Message
            </Button>
          </div>
        </Form>
      </Container>
    </section>
  );
};

export default BookingForm;