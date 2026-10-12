const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^0\d{9}$/;

const getAge = (birthday) => {
  const birthDate = new Date(`${birthday}T00:00:00`);
  if (Number.isNaN(birthDate.getTime())) return 0;
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const beforeBirthday =
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate());
  if (beforeBirthday) age -= 1;
  return age;
};

export const validateRegister = (values) => {
  const errors = {};
  const fullName = values.fullName.trim();

  if (!fullName) errors.fullName = 'Vui lòng nhập họ tên';
  else if (fullName.length < 3) errors.fullName = 'Họ tên phải có ít nhất 3 ký tự';

  if (!values.email.trim()) errors.email = 'Vui lòng nhập email';
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Email không đúng định dạng';

  if (!values.password) errors.password = 'Vui lòng nhập mật khẩu';
  else if (values.password.length < 8) errors.password = 'Mật khẩu phải có ít nhất 8 ký tự';
  else if (!/[a-zA-Z]/.test(values.password) || !/\d/.test(values.password)) {
    errors.password = 'Mật khẩu phải có cả chữ và số';
  }

  if (!values.confirmPassword || values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Mật khẩu nhập lại không khớp';
  }
  if (values.phone && !PHONE_PATTERN.test(values.phone)) {
    errors.phone = 'Số điện thoại gồm 10 số, bắt đầu bằng 0';
  }
  if (values.birthday && getAge(values.birthday) < 16) {
    errors.birthday = 'Bạn phải từ 16 tuổi trở lên';
  }
  if (!values.major) errors.major = 'Vui lòng chọn chuyên ngành';
  if (!values.agree) errors.agree = 'Bạn cần đồng ý điều khoản';
  return errors;
};
