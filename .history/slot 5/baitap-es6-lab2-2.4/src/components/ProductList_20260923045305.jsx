import React from 'react';
import { Row, Col, Button } from 'react-bootstrap'; // Hoặc thư viện UI tương ứng bạn đang dùng
import ProductCard from './ProductCard'; // Đường dẫn tới component ProductCard từ Bài 3

function ProductList({ products }) {
  // Nâng cao: Lấy danh sách danh mục không trùng lặp
  const categories = ['Tất cả', ...new Set(products.map((p) => p.category.name))];

  return (
    <div className="container my-4">
      {/* Tiêu đề đếm số lượng sản phẩm */}
      <h4 className="mb-3">Có {products.length} sản phẩm</h4>

      {/* Thanh nút danh mục (Nâng cao) */}
      <div className="mb-4 d-flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <Button key={cat} variant="outline-primary" size="sm">
            {cat}
          </Button>
        ))}
      </div>

      {/* Lưới Card sản phẩm */}
      <Row xs={1} md={2} lg={4} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ProductList;