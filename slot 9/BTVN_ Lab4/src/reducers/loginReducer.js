const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const initialLoginState = {
  values: { email: '', password: '', remember: false },
  errors: {},
  touched: {},
  status: 'idle',
  message: '',
};

export const validateLogin = (values) => {
  const errors = {};
  if (!values.email.trim()) errors.email = 'Vui lòng nhập email';
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Email không đúng định dạng';
  if (!values.password) errors.password = 'Vui lòng nhập mật khẩu';
  else if (values.password.length < 8) errors.password = 'Mật khẩu cần ít nhất 8 ký tự';
  return errors;
};

export const loginReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_FIELD': {
      const values = { ...state.values, [action.name]: action.value };
      const errors = validateLogin(values);
      return {
        ...state,
        values,
        errors,
        message: '',
        status: state.status === 'error' ? 'idle' : state.status,
      };
    }
    case 'BLUR_FIELD':
      return { ...state, touched: { ...state.touched, [action.name]: true } };
    case 'SUBMIT': {
      const errors = validateLogin(state.values);
      return {
        ...state,
        errors,
        touched: { email: true, password: true },
        status: Object.keys(errors).length ? 'idle' : 'submitting',
        message: '',
      };
    }
    case 'LOGIN_SUCCESS':
      return { ...state, status: 'success', message: `Xin chào ${state.values.email}!` };
    case 'LOGIN_FAILURE':
      return { ...state, status: 'error', message: 'Email hoặc mật khẩu không đúng' };
    case 'RESET':
      return initialLoginState;
    default:
      throw new Error(`Unknown login action: ${action.type}`);
  }
};
