import { useReducer } from 'react'
import { Alert, Button, Card, Form, ListGroup, Nav } from 'react-bootstrap'
import { COURSES, SCHEDULES, STEPS } from '../../data/wizardData.js'
import { initWizard, wizardReducer } from '../../reducers/wizardReducer.js'

const formatVND = (amount) => amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })

export default function CourseWizard({ initialCourseId = 'react' }) {
  const [state, dispatch] = useReducer(wizardReducer, initialCourseId, initWizard)
  const { step, maxVisited, values, errors, submitted } = state
  const course = COURSES.find(({ id }) => id === values.courseId)

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    dispatch({ type: 'CHANGE', payload: { name, value: type === 'checkbox' ? checked : value } })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch({ type: step === STEPS.length - 1 ? 'SUBMIT' : 'NEXT' })
  }

  const field = (name, label, type = 'text') => (
    <Form.Group className="mb-3" controlId={`wizard-${name}`}>
      <Form.Label>{label}</Form.Label>
      <Form.Control type={type} name={name} value={values[name]} onChange={handleChange} isInvalid={Boolean(errors[name])} />
      <Form.Control.Feedback type="invalid">{errors[name]}</Form.Control.Feedback>
    </Form.Group>
  )

  if (submitted) {
    return (
      <Alert variant="success" className="exercise-panel">
        <Alert.Heading>Đăng ký thành công!</Alert.Heading>
        <p className="mb-3">{`${values.fullName} đã đăng ký ${course.name} (${values.schedule}). Học phí: ${formatVND(course.fee)}.`}</p>
        <Button variant="outline-success" onClick={() => dispatch({ type: 'RESET', payload: initialCourseId })}>Đăng ký khóa khác</Button>
      </Alert>
    )
  }

  return (
    <Card className="exercise-panel">
      <Card.Header>
        <Nav variant="pills" aria-label="Các bước đăng ký">
          {STEPS.map((label, index) => (
            <Nav.Item key={label}>
              <Nav.Link as="button" type="button" active={index === step} disabled={index > maxVisited} onClick={() => dispatch({ type: 'GO_TO', payload: index })}>
                {`${index + 1}. ${label}`}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </Card.Header>
      <Card.Body>
        <Form noValidate onSubmit={handleSubmit}>
          {step === 0 && <>{field('fullName', 'Họ và tên')}{field('email', 'Email', 'email')}{field('phone', 'Số điện thoại', 'tel')}</>}
          {step === 1 && (
            <>
              <Form.Group className="mb-3" controlId="wizard-courseId">
                <Form.Label>Khóa học</Form.Label>
                <Form.Select name="courseId" value={values.courseId} onChange={handleChange} isInvalid={Boolean(errors.courseId)}>
                  <option value="">-- Chọn khóa học --</option>
                  {COURSES.map(({ id, name, fee }) => <option key={id} value={id}>{`${name} · ${formatVND(fee)}`}</option>)}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.courseId}</Form.Control.Feedback>
              </Form.Group>
              <fieldset className="mb-3">
                <legend className="fs-6">Lịch học</legend>
                {SCHEDULES.map((schedule, index) => (
                  <Form.Check key={schedule} inline type="radio" id={`wizard-schedule-${index}`} name="schedule" label={schedule} value={schedule} checked={values.schedule === schedule} onChange={handleChange} />
                ))}
                {errors.schedule && <div className="text-danger small" role="alert">{errors.schedule}</div>}
              </fieldset>
            </>
          )}
          {step === 2 && (
            <>
              <ListGroup className="mb-3">
                <ListGroup.Item>{`Học viên: ${values.fullName}`}</ListGroup.Item>
                <ListGroup.Item>{`Liên hệ: ${values.email} · ${values.phone}`}</ListGroup.Item>
                <ListGroup.Item>{`Khóa học: ${course?.name ?? ''} · ${values.schedule}`}</ListGroup.Item>
                <ListGroup.Item className="fw-bold">{`Học phí: ${course ? formatVND(course.fee) : ''}`}</ListGroup.Item>
              </ListGroup>
              <Form.Check id="wizard-agree" name="agree" className="mb-3" label="Tôi xác nhận thông tin trên là chính xác" checked={values.agree} onChange={handleChange} isInvalid={Boolean(errors.agree)} feedback={errors.agree} feedbackType="invalid" />
            </>
          )}
          <div className="d-flex justify-content-between gap-2">
            <Button variant="outline-secondary" disabled={step === 0} onClick={() => dispatch({ type: 'BACK' })}>← Quay lại</Button>
            <Button type="submit" variant={step === STEPS.length - 1 ? 'success' : 'primary'}>{step === STEPS.length - 1 ? 'Xác nhận đăng ký' : 'Tiếp tục →'}</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}