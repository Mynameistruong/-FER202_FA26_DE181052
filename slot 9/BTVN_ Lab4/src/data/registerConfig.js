export const fields = [
  { id: 'fullName', label: 'Họ và tên', type: 'text', required: true },
  { id: 'email', label: 'Email', type: 'email', required: true },
  { id: 'password', label: 'Mật khẩu', type: 'password', required: true },
  { id: 'confirmPassword', label: 'Nhập lại mật khẩu', type: 'password', required: true },
  { id: 'phone', label: 'Số điện thoại', type: 'tel' },
  { id: 'birthday', label: 'Ngày sinh', type: 'date' },
];

export const genders = ['Nam', 'Nữ', 'Khác'];
export const majors = ['Software Engineering', 'Artificial Intelligence', 'Digital Marketing'];

export const initialValues = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  birthday: '',
  gender: 'Nam',
  major: '',
  agree: false,
};
