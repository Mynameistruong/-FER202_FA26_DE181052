import { useReducer } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { products } from '../data/products';
import { cartReducer, initialCart } from '../reducers/cartReducer';
import CartSummary from '../components/CartSummary';
import ProductFilter from '../components/ProductFilter';

const CartDemoPage = () => {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);
  const handleAddToCart = (product) => dispatch({ type: 'cart/add', payload: product });
  return (
    <Row className="g-4">
      <Col xl={7}>
        <Card><Card.Body>
          <h2 className="h4">Chọn sản phẩm</h2>
          <ProductFilter products={products} onAddToCart={handleAddToCart} />
        </Card.Body></Card>
      </Col>
      <Col xl={5}><CartSummary cart={cart} dispatch={dispatch} /></Col>
    </Row>
  );
};

export default CartDemoPage;
