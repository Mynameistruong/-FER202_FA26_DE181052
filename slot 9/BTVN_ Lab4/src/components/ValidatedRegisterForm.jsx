import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { fields, genders, majors, initialValues } from '../data/registerConfig';
import { validateRegister } from '../utils/validateRegister';
import InputField from './InputField';

const ValidatedRegisterForm = () => {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [success, setSuccess] = useState('');
  const errors = validateRegister(values);
  const isValid = Object.keys(errors).length === 0;
  const showError = (name) => (touched[name] ? errors[name] : '');

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setValues((previous) => ({ ...previous, [name]: type === 'checkbox' ? checked : value }));
    setSuccess('');
  };
  const handleBlur = (event) => {
    setTouched((previous) => ({ ...previous, [event.target.name]: true }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setTouched(Object.keys(initialValues).reduce((all, name) => ({ ...all, [name]: true }), {}));
    if (!isValid) return;
    setSuccess(`Đăng ký thành công! Chào mừng ${values.fullName}.`);
    setValues(initialValues);
    setTouched({});
  };

  return (
    <div className="lesson-grid">
      <Form noValidate onSubmit={handleSubmit}>
        {fields.map((field) => (
          <InputField
            key={field.id}
            id={`validated-${field.id}`}
            label={field.label}
            type={field.type}
            required={field.required}
            name={field.id}
            value={values[field.id]}
            onChange={handleChange}
            onBlur={handleBlur}
            error={showError(field.id)}
          />
        ))}
        <Form.Group className="mb-3" controlId="validated-gender">
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
        <Form.Group className="mb-3" controlId="validated-major">
          <Form.Label>Chuyên ngành</Form.Label>
          <Form.Select name="major" value={values.major} onChange={handleChange} onBlur={handleBlur} isInvalid={Boolean(showError('major'))}>
            <option value="">Chọn chuyên ngành</option>
            {majors.map((major) => <option key={major}>{major}</option>)}
          </Form.Select>
          <Form.Control.Feedback type="invalid">{showError('major')}</Form.Control.Feedback>
        </Form.Group>
        <Form.Check
          className="mb-3"
          name="agree"
          checked={values.agree}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={Boolean(showError('agree'))}
          feedback={showError('agree')}
          feedbackType="invalid"
          label="Tôi đồng ý với điều khoản sử dụng."
        />
        <Button type="submit">Đăng ký</Button>
        <p className={`small mt-2 mb-0 ${isValid ? 'text-success' : 'text-secondary'}`}>
          {isValid ? 'Thông tin hợp lệ' : `Còn ${Object.keys(errors).length} mục chưa hợp lệ`}
        </p>
      </Form>
      <div>
        <h3 className="h5">Trạng thái đăng ký</h3>
        {success ? <Alert variant="success">{success}</Alert> : <p className="text-secondary">Lỗi sẽ xuất hiện sau khi rời ô hoặc gửi form.</p>}
      </div>
    </div>
  );
};

export default ValidatedRegisterForm;
