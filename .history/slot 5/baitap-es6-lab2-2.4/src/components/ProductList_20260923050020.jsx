import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import ProductCard from './ProductCard'; // Giả định ProductCard đã được tạo ở Bài 3

const ProductList = ({ products }) => {
  // Nâng cao: Lấy danh sách danh mục không trùng bằng Set và spread operator
  const categories = ['Tất cả', ...new Set(products.map((p) => p.category.name))];

  return (
    <div className="container my-4">
      {/* Tiêu đề với template literal số lượng sản phẩm */}
      <h2 className="mb-3">Có {products.length} sản phẩm</h2>

      {/* Thanh nút danh mục (Nâng cao) */}
      <div className="mb-4 d-flex gap-2 flex-wrap">
        {categories.map((category, index) => (
          <Button key={index} variant="outline-primary" size="sm">
            {category}
          </Button>
        ))}
      </div>

      {/* Lưới sản phẩm dùng Row và Col ứng dụng responsive[cite: 1] */}
      <Row className="g-4">
        {products.map((product) => (
          // Đặt key ở phần tử ngoài cùng của hàm map (Col), không đặt trong ProductCard[cite: 1]
          <Col key={product.id} xs={1} md={2} lg={4}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductList;