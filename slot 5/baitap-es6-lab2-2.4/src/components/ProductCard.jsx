import React from 'react';
import { Card, Badge } from 'react-bootstrap';

const ProductCard = ({ product }) => {
  return (
    <Card className="h-100 shadow-sm border-0">
      <div className="position-relative">
        <Card.Img 
          variant="top" 
          src={product.image} 
          style={{ height: '180px', objectFit: 'cover' }} 
        />
        {product.discount > 0 && (
          <Badge bg="danger" className="position-absolute top-0 end-0 m-2">
            -{product.discount}%
          </Badge>
        )}
      </div>
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <span className="text-muted small">{product.category.name}</span>
          <Card.Title className="fs-6 mt-1 text-truncate" title={product.name}>
            {product.name}
          </Card.Title>
        </div>
        <div className="mt-3">
          <div className="text-danger fw-bold fs-5">
            {product.price.toLocaleString()} đ
          </div>
          <div className="small text-warning">
            ★ {product.rating.rate} ({product.rating.count})
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;