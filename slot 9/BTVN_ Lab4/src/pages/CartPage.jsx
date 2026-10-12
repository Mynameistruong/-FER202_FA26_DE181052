import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import useCart from '../context/useCart';
import CartSummary from '../components/CartSummary';

const CartPage = ({ onCheckout }) => {
  const { cart, dispatch } = useCart();
  if (cart.items.length === 0) {
    return (
      <Alert variant="info">
        Giỏ hàng đang trống.
        <div><Button className="mt-2" onClick={() => onCheckout('shop')}>Tiếp tục mua sắm</Button></div>
      </Alert>
    );
  }
  return <CartSummary cart={cart} dispatch={dispatch} onCheckout={() => onCheckout('checkout')} />;
};

export default CartPage;
