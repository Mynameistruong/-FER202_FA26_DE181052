import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { fields, genders, majors, initialValues } from '../data/registerConfig';
import InputField from './InputField';

const validate = (values) => {
  const errors = {};
  if (!values.fullName.trim()) errors.fullName = 'Vui lòng nhập họ và tên';
  if (!values.email.trim()) errors.email = 'Vui lòng nhập email';
  if (!values.password) errors.password = 'Vui lòng nhập mật khẩu';
  if (!values.confirmPassword) errors.confirmPassword = 'Vui lòng nhập lại mật khẩu';
  else if (values.confirmPassword !== values.password) errors.confirmPassword = 'Mật khẩu nhập lại không khớp';
  if (!values.major) errors.major = 'Vui lòng chọn chuyên ngành';
  if (!values.agree) errors.agree = 'Bạn cần đồng ý điều khoản';
  return errors;
};

const RegisterForm = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setValues((previous) => ({ ...previous, [name]: type === 'checkbox' ? checked : value }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setSubmitted(values);
  };

  const handleReset = () => {
    setValues(initialValues);
    setErrors({});
    setSubmitted(null);
  };

  return (
    <div className="lesson-grid">
      <Form noValidate onSubmit={handleSubmit}>
        {fields.map((field) => (
          <InputField
            key={field.id}
            id={`register-${field.id}`}
            label={field.label}
            type={field.type}
            required={field.required}
            name={field.id}
            value={values[field.id]}
            onChange={handleChange}
            error={errors[field.id]}
          />
        ))}
        <Form.Group className="mb-3" controlId="register-gender">
          <Form.Label>Giới tính</Form.Label>
          <div className="d-flex gap-3">
            {genders.map((gender) => (
              <Form.Check
                key={gender}
                inline
                type="radio"
                name="gender"
                label={gender}
                value={gender}
                checked={values.gender === gender}
                onChange={handleChange}
              />
            ))}
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="register-major">
          <Form.Label>Chuyên ngành</Form.Label>
          <Form.Select name="major" value={values.major} onChange={handleChange} isInvalid={Boolean(errors.major)}>
            <option value="">Chọn chuyên ngành</option>
            {majors.map((major) => <option key={major}>{major}</option>)}
          </Form.Select>
          <Form.Control.Feedback type="invalid">{errors.major}</Form.Control.Feedback>
        </Form.Group>
        <Form.Check
          className="mb-3"
          name="agree"
          checked={values.agree}
          onChange={handleChange}
          isInvalid={Boolean(errors.agree)}
          feedback={errors.agree}
          feedbackType="invalid"
          label="Tôi đồng ý với điều khoản sử dụng."
        />
        <div className="d-flex gap-2">
          <Button type="submit">Đăng ký</Button>
          <Button type="button" variant="outline-secondary" onClick={handleReset}>Làm lại</Button>
        </div>
      </Form>
      <div>
        <h3 className="h5">Kết quả gửi form</h3>
        {submitted ? (
          <Alert variant="success">
            Đã nhận đăng ký của {submitted.fullName}.
            <pre className="mb-0 mt-2 small">{JSON.stringify(submitted, null, 2)}</pre>
          </Alert>
        ) : <p className="text-secondary">Hoàn thành các trường bắt buộc rồi gửi biểu mẫu.</p>}
      </div>
    </div>
  );
};

export default RegisterForm;
