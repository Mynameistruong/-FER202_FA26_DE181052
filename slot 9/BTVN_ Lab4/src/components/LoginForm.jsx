import { useReducer } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { initialLoginState, loginReducer, validateLogin } from '../reducers/loginReducer';

const fakeLoginApi = (values) =>
  new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (values.email === 'admin@fpt.edu.vn' && values.password === '12345678') resolve();
      else reject(new Error('Invalid credentials'));
    }, 1000);
  });

const LoginForm = ({ onLoginSuccess = () => {} }) => {
  const [state, dispatch] = useReducer(loginReducer, initialLoginState);
  const isSubmitting = state.status === 'submitting';

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch({ type: 'SUBMIT' });
    if (Object.keys(validateLogin(state.values)).length > 0) return;
    try {
      await fakeLoginApi(state.values);
      dispatch({ type: 'LOGIN_SUCCESS' });
      onLoginSuccess(state.values.email);
    } catch {
      dispatch({ type: 'LOGIN_FAILURE' });
    }
  };

  if (state.status === 'success') {
    return (
      <Alert variant="success">
        {state.message}
        <div><Button className="mt-2" variant="outline-success" onClick={() => dispatch({ type: 'RESET' })}>Đăng nhập lại</Button></div>
      </Alert>
    );
  }

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="login-email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={state.values.email}
          disabled={isSubmitting}
          isInvalid={state.touched.email && Boolean(state.errors.email)}
          isValid={state.touched.email && !state.errors.email}
          onChange={(event) => dispatch({ type: 'CHANGE_FIELD', name: 'email', value: event.target.value })}
          onBlur={() => dispatch({ type: 'BLUR_FIELD', name: 'email' })}
        />
        <Form.Control.Feedback type="invalid">{state.errors.email}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="login-password">
        <Form.Label>Mật khẩu</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={state.values.password}
          disabled={isSubmitting}
          isInvalid={state.touched.password && Boolean(state.errors.password)}
          onChange={(event) => dispatch({ type: 'CHANGE_FIELD', name: 'password', value: event.target.value })}
          onBlur={() => dispatch({ type: 'BLUR_FIELD', name: 'password' })}
        />
        <Form.Control.Feedback type="invalid">{state.errors.password}</Form.Control.Feedback>
      </Form.Group>
      <Form.Check
        className="mb-3"
        label="Ghi nhớ đăng nhập"
        checked={state.values.remember}
        disabled={isSubmitting}
        onChange={(event) => dispatch({ type: 'CHANGE_FIELD', name: 'remember', value: event.target.checked })}
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <><Spinner size="sm" className="me-2" />Đang đăng nhập...</> : 'Đăng nhập'}
      </Button>
      {state.status === 'error' && <Alert className="mt-3 mb-0" variant="danger">{state.message}</Alert>}
    </Form>
  );
};

export default LoginForm;
