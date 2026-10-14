import { Container, Row, Col } from 'react-bootstrap';
import MyProduct from '../components/MyProduct';
import { products } from '../data/products';

function ProductList() {
  return (
    <Container className="my-4">
      <h1>Danh sách sản phẩm</h1>
      <Row className="g-4">
        {products.map((product) => (
          <Col
            key={product.id}
            xs={12}
            sm={6}
            lg={4}
            xl={3}
            className="product-list__item"
          >
            <MyProduct product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductList;
  