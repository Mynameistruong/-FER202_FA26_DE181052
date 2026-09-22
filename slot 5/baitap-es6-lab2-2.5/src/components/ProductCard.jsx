import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';

const ProductCard = ({ product }) => {
  const { name, price, category, inStock, discount, rating, image } = product;

  // Tính giá sau giảm
  const finalPrice = price * (1 - discount / 100);

  return (
    <Card className={`h-100 position-relative ${inStock ? '' : 'opacity-50'}`}>
      {/* Badge giảm giá */}
      {discount > 0 && (
        <Badge bg="danger" className="position-absolute top-0 end-0 m-2">
          -{discount}%
        </Badge>
      )}

      {/* Badge bán chạy */}
      {rating?.rate >= 4.5 && (
        <Badge bg="warning" text="dark" className="position-absolute top-0 start-0 m-2">
          Bán chạy
        </Badge>
      )}

      <Card.Img 
        variant="top" 
        src={image} 
        style={{ height: '160px', objectFit: 'cover' }} 
      />

      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <span className="text-muted small">{category.name}</span>
          <Card.Title className="fs-6 mt-1 text-truncate" title={name}>
            {name}
          </Card.Title>

          {/* Trạng thái kho dùng toán tử 3 ngôi */}
          <div className="mb-2">
            {inStock ? (
              <Badge bg="success">Còn hàng</Badge>
            ) : (
              <Badge bg="secondary">Hết hàng</Badge>
            )}
          </div>
        </div>

        <div>
          {/* Giá tiền */}
          <div className="mb-2">
            {discount > 0 && (
              <del className="text-muted small me-2">
                {price.toLocaleString()} đ
              </del>
            )}
            <span className="text-danger fw-bold">
              {(discount > 0 ? finalPrice : price).toLocaleString()} đ
            </span>
          </div>

          <div className="small text-warning mb-3">
            ★ {rating.rate} ({rating.count})
          </div>

          {/* Nút mua */}
          <Button 
            variant="primary" 
            className="w-100" 
            disabled={!inStock}
          >
            {inStock ? 'Thêm vào giỏ' : 'Không khả dụng'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;