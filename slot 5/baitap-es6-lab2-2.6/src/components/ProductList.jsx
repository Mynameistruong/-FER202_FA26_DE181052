import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
  const categories = ['Tất cả', ...new Set(products.map((p) => p.category?.name).filter(Boolean))];

  return (
    <div className="container my-5">
      <h2 className="mb-4 fw-bold">Có {products.length} sản phẩm</h2>

      <div className="mb-4 d-flex gap-2 flex-wrap">
        {categories.map((category, index) => (
          <Button key={index} variant="outline-primary" size="sm">
            {category}
          </Button>
        ))}
      </div>

      <Row className="g-4">
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={6} lg={3}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductList;