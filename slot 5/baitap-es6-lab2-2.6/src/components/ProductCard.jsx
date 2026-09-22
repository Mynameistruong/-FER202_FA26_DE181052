import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';

const ProductCard = ({ product }) => {
  const { name, price, category, inStock, discount, rating, image } = product;
  const finalPrice = price * (1 - (discount ?? 0) / 100);

  return (
    <Card className={`h-100 position-relative ${inStock ? '' : 'opacity-50'}`}>
      {(discount ?? 0) > 0 && (
        <Badge bg="danger" className="position-absolute top-0 end-0 m-2">
          -{discount}%
        </Badge>
      )}

      {rating?.rate >= 4.5 && (
        <Badge bg="warning" text="dark" className="position-absolute top-0 start-0 m-2">
          Bán chạy
        </Badge>
      )}

      <Card.Img variant="top" src={image ?? 'https://placehold.co/300x200?text=No+Image'} style={{ height: '160px', objectFit: 'cover' }} />

      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <span className="text-muted small">{category?.name ?? 'Chưa phân loại'}</span>
          <Card.Title className="fs-6 mt-1 text-truncate" title={name}>
            {name ?? 'Sản phẩm chưa đặt tên'}
          </Card.Title>

          <div className="mb-2">
            {inStock ? (
              <Badge bg="success">Còn hàng</Badge>
            ) : (
              <Badge bg="secondary">Hết hàng</Badge>
            )}
          </div>
        </div>

        <div>
          <div className="mb-2">
            {(discount ?? 0) > 0 && (
              <del className="text-muted small me-2">
                {price?.toLocaleString()} đ
              </del>
            )}
            <span className="text-danger fw-bold">
              {price !== undefined ? (discount > 0 ? finalPrice : price).toLocaleString() : 'Liên hệ'} đ
            </span>
          </div>

          <div className="small text-warning mb-3">
            ★ {rating?.rate ?? 'Chưa có'} ({rating?.count ?? 0})
          </div>

          <Button variant="primary" className="w-100" disabled={!inStock}>
            {inStock ? 'Thêm vào giỏ' : 'Không khả dụng'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;