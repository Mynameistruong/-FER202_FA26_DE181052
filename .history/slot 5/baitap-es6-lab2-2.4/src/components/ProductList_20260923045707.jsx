
import { Row, Col, Button } from 'react-bootstrap';
import ProductCard from './ProductCard'; // Import card sản phẩm từ bài 3

function ProductList({ products }) {
  // Lấy danh sách danh mục không trùng lặp (phần nâng cao)[cite: 5]
  const categories = ['Tất cả', ...new Set(products.map((p) => p.category.name))];

  return (
    <div className="container my-4">
      {/* Tiêu đề hiển thị số lượng sản phẩm[cite: 5] */}
      <h4 className="mb-3">Có {products.length} sản phẩm</h4>

      {/* Thanh nút danh mục (Nâng cao)[cite: 5] */}
      <div className="mb-4 d-flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <Button key={cat} variant="outline-primary" size="sm">
            {cat}
          </Button>
        ))}
      </div>

      {/* Lưới sản phẩm với Responsive: xs=1, md=2, lg=4[cite: 5] */}
      <Row xs={1} md={2} lg={4} className="g-4">
        {products.map((product) => (
          // key đặt ở thẻ ngoài cùng của map() (Col), không đặt trong ProductCard[cite: 5]
          <Col key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ProductList;