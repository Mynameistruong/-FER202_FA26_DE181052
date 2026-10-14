import { useReducer, useState } from 'react';
import { Button, Container, Form, Modal } from 'react-bootstrap';

const initialFormState = {
  values: {
    name: '',
    email: '',
    message: '',
  },
  errors: {},
};

function formReducer(state, action) {
  switch (action.type) {
    case 'change':
      return {
        values: {
          ...state.values,
          [action.field]: action.value,
        },
        errors: {
          ...state.errors,
          [action.field]: '',
        },
      };
    case 'validate':
      return { ...state, errors: action.errors };
    default:
      return state;
  }
}

function validateForm(values) {
  const errors = {};

  if (values.name.trim().length < 2) {
    errors.name = 'Vui lòng nhập họ tên (ít nhất 2 ký tự).';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Vui lòng nhập địa chỉ email hợp lệ.';
  }

  if (values.message.trim().length < 10) {
    errors.message = 'Nội dung cần có ít nhất 10 ký tự.';
  }

  return errors;
}

function Contact() {
  const [form, dispatch] = useReducer(formReducer, initialFormState);
  const [showModal, setShowModal] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    const errors = validateForm(form.values);
    dispatch({ type: 'validate', errors });

    if (Object.keys(errors).length === 0) {
      setShowModal(true);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    dispatch({ type: 'change', field: name, value });
  }

  return (
    <Container className="contact-page my-4">
      <h1>Liên hệ</h1>
      <p className="mb-4">Điền thông tin bên dưới để gửi liên hệ.</p>

      <Form className="contact-form" noValidate onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="contactName">
          <Form.Label>Họ và tên</Form.Label>
          <Form.Control
            name="name"
            type="text"
            autoComplete="name"
            value={form.values.name}
            onChange={handleChange}
            isInvalid={Boolean(form.errors.name)}
            placeholder="Nhập họ và tên"
          />
          <Form.Control.Feedback type="invalid">
            {form.errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="contactEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            type="email"
            autoComplete="email"
            value={form.values.email}
            onChange={handleChange}
            isInvalid={Boolean(form.errors.email)}
            placeholder="name@example.com"
          />
          <Form.Control.Feedback type="invalid">
            {form.errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="contactMessage">
          <Form.Label>Nội dung</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="message"
            value={form.values.message}
            onChange={handleChange}
            isInvalid={Boolean(form.errors.message)}
            placeholder="Nhập nội dung liên hệ (ít nhất 10 ký tự)"
          />
          <Form.Control.Feedback type="invalid">
            {form.errors.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" variant="primary">
          Gửi thông tin
        </Button>
      </Form>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        aria-labelledby="completed-lab-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="completed-lab-title">Completed Lab5</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-2">
            <strong>Họ và tên:</strong> {form.values.name}
          </p>
          <p className="mb-2">
            <strong>Email:</strong> {form.values.email}
          </p>
          <p className="mb-0">
            <strong>Nội dung:</strong> {form.values.message}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Contact;
