
import { Row, Col, Button } from 'react-bootstrap';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
  // Lấy danh sách danh mục không trùng lặp dùng Set và spread operator (Nâng cao)[cite: 1]
  const categories = ['Tất cả', ...new Set(products.map((p) => p.category.name))];

  return (
    <div className="container my-5">
      {/* Tiêu đề với template literal số lượng sản phẩm[cite: 1] */}
      <h2 className="mb-4 fw-bold">Có {products.length} sản phẩm</h2>

      {/* Thanh nút danh mục[cite: 1] */}
      <div className="mb-4 d-flex gap-2 flex-wrap">
        {categories.map((category, index) => (
          <Button key={index} variant="outline-primary" size="sm">
            {category}
          </Button>
        ))}
      </div>

      {/* Lưới sản phẩm dùng Row và Col ứng dụng responsive (xs=1, md=2, lg=4)[cite: 1] */}
      <Row className="g-4">
        {products.map((product) => (
          // Đặt key ở phần tử ngoài cùng của hàm map (Col), không đặt trong ProductCard[cite: 1]
          <Col key={product.id} xs={12} sm={6} md={6} lg={3}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductList;