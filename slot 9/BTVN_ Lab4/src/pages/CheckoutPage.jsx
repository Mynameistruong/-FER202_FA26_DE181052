import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import useAuth from '../context/useAuth';
import useCart from '../context/useCart';
import { formatVND } from '../utils/format';
import InputField from '../components/InputField';

const SHIPPING_FEE = 30000;
const validateCheckout = (values) => {
  const errors = {};
  if (values.receiver.trim().length < 3) errors.receiver = 'Người nhận cần ít nhất 3 ký tự';
  if (!/^0\d{9}$/.test(values.phone)) errors.phone = 'Số điện thoại gồm 10 số, bắt đầu bằng 0';
  if (values.address.trim().length < 10) errors.address = 'Địa chỉ cần ít nhất 10 ký tự';
  if (!values.payment) errors.payment = 'Vui lòng chọn phương thức thanh toán';
  return errors;
};

const CheckoutPage = ({ onNavigate }) => {
  const { user } = useAuth();
  const { cart, totalPrice, clearCart } = useCart();
  const [values, setValues] = useState({
    receiver: user?.name ?? '',
    phone: '',
    address: '',
    payment: '',
    note: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [order, setOrder] = useState(null);
  const errors = validateCheckout(values);
  const shipping = totalPrice >= 1000000 ? 0 : SHIPPING_FEE;
  const total = totalPrice + shipping;
  const errorOf = (name) => (submitted ? errors[name] : '');

  const updateField = (event) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length > 0) return;
    setOrder({
      id: `DH${Math.floor(100000 + Math.random() * 900000)}`,
      receiver: values.receiver.trim(),
      total,
    });
    clearCart();
  };

  if (order) {
    return (
      <Alert variant="success">
        <Alert.Heading>Đặt hàng thành công!</Alert.Heading>
        <p>Mã đơn: <strong>{order.id}</strong></p>
        <p>Người nhận: {order.receiver}</p>
        <p className="mb-3">Tổng thanh toán: <strong>{formatVND(order.total)}</strong></p>
        <Button onClick={() => onNavigate('shop')}>Tiếp tục mua sắm</Button>
      </Alert>
    );
  }
  if (cart.items.length === 0) {
    return (
      <Alert variant="info">
        Giỏ hàng đang trống. Hãy chọn sản phẩm trước khi thanh toán.
        <div><Button className="mt-2" onClick={() => onNavigate('shop')}>Đến cửa hàng</Button></div>
      </Alert>
    );
  }

  return (
    <Row className="g-4">
      <Col lg={7}>
        <Card><Card.Body>
          <Card.Title>Thông tin giao hàng</Card.Title>
          <Form noValidate onSubmit={handleSubmit}>
            <InputField
              id="checkout-receiver"
              label="Người nhận"
              name="receiver"
              value={values.receiver}
              onChange={updateField}
              error={errorOf('receiver')}
            />
            <InputField
              id="checkout-phone"
              label="Số điện thoại"
              name="phone"
              type="tel"
              value={values.phone}
              onChange={updateField}
              error={errorOf('phone')}
            />
            <InputField
              id="checkout-address"
              label="Địa chỉ"
              name="address"
              as="textarea"
              rows={2}
              value={values.address}
              onChange={updateField}
              error={errorOf('address')}
            />
            <Form.Group className="mb-3">
              <Form.Label htmlFor="payment-cod">Phương thức thanh toán</Form.Label>
              {['COD', 'Chuyển khoản', 'Ví điện tử'].map((method) => (
                <Form.Check
                  key={method}
                  type="radio"
                  id={`payment-${method === 'COD' ? 'cod' : method === 'Chuyển khoản' ? 'bank' : 'wallet'}`}
                  name="payment"
                  label={method}
                  value={method}
                  checked={values.payment === method}
                  onChange={updateField}
                />
              ))}
              {errorOf('payment') && <div className="text-danger small">{errorOf('payment')}</div>}
            </Form.Group>
            <InputField
              id="checkout-note"
              label="Ghi chú (không bắt buộc)"
              name="note"
              as="textarea"
              rows={2}
              value={values.note}
              onChange={updateField}
            />
            <Button type="submit">Đặt hàng</Button>
          </Form>
        </Card.Body></Card>
      </Col>
      <Col lg={5}>
        <Card><Card.Body>
          <Card.Title>Tóm tắt đơn hàng</Card.Title>
          {cart.items.map((item) => (
            <div key={item.id} className="d-flex justify-content-between gap-2 small mb-2">
              <span>{item.name} × {item.quantity}</span>
              <span>{formatVND(item.price * item.quantity)}</span>
            </div>
          ))}
          <hr />
          <div className="d-flex justify-content-between mb-2"><span>Tiền hàng</span><span>{formatVND(totalPrice)}</span></div>
          <div className="d-flex justify-content-between mb-2"><span>Phí giao hàng</span><span>{shipping ? formatVND(shipping) : 'Miễn phí'}</span></div>
          <div className="d-flex justify-content-between fw-bold"><span>Tổng thanh toán</span><span>{formatVND(total)}</span></div>
        </Card.Body></Card>
      </Col>
    </Row>
  );
};

export default CheckoutPage;
