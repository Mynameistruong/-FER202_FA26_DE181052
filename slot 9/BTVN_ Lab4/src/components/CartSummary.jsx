import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Table from 'react-bootstrap/Table';
import { CART_ACTIONS, MAX_QUANTITY, getCartTotals } from '../reducers/cartReducer';
import { formatVND } from '../utils/format';

const CartSummary = ({ cart, dispatch, onCheckout }) => {
  const { totalQuantity, totalPrice } = getCartTotals(cart);
  return (
    <section>
      <h2 className="h4 mb-3">Giỏ hàng <Badge bg="primary">{totalQuantity}</Badge></h2>
      {cart.items.length === 0 ? (
        <Alert variant="info">Giỏ hàng đang trống.</Alert>
      ) : (
        <>
          <div className="table-responsive">
            <Table bordered hover className="align-middle">
              <thead><tr><th>Sản phẩm</th><th>Đơn giá</th><th>Số lượng</th><th>Thành tiền</th><th /></tr></thead>
              <tbody>
                {cart.items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{formatVND(item.price)}</td>
                    <td>
                      <ButtonGroup size="sm">
                        <Button aria-label={`Giảm ${item.name}`} onClick={() => dispatch({ type: CART_ACTIONS.DECREASE, payload: item.id })}>−</Button>
                        <Button variant="light" disabled className="quantity-value">{item.quantity}</Button>
                        <Button aria-label={`Tăng ${item.name}`} disabled={item.quantity >= MAX_QUANTITY} onClick={() => dispatch({ type: CART_ACTIONS.INCREASE, payload: item.id })}>+</Button>
                      </ButtonGroup>
                    </td>
                    <td>{formatVND(item.price * item.quantity)}</td>
                    <td><Button size="sm" variant="outline-danger" onClick={() => dispatch({ type: CART_ACTIONS.REMOVE, payload: item.id })}>Xóa</Button></td>
                  </tr>
                ))}
              </tbody>
              <tfoot><tr className="fw-bold"><td colSpan={2}>Tổng cộng</td><td>{totalQuantity}</td><td>{formatVND(totalPrice)}</td><td /></tr></tfoot>
            </Table>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <Button variant="outline-danger" onClick={() => dispatch({ type: CART_ACTIONS.CLEAR })}>Xóa toàn bộ giỏ</Button>
            {onCheckout && <Button onClick={onCheckout}>Tiến hành thanh toán</Button>}
          </div>
        </>
      )}
    </section>
  );
};

export default CartSummary;
