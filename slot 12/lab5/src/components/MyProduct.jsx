import { useState } from 'react';
import { Badge, Button, Card } from 'react-bootstrap';

const currencyFormatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  maximumFractionDigits: 0,
});

function MyProduct({ product }) {
  const [addedToCart, setAddedToCart] = useState(false);
  const discountedPrice = product.price * (1 - product.discount / 100);

  return (
    <Card className="h-100 product-card">
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.name}
        className="product-card__image"
      />
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
          <Badge bg="secondary">{product.category}</Badge>
          {product.discount > 0 && (
            <Badge bg="danger">Giảm {product.discount}%</Badge>
          )}
        </div>

        <Card.Title>{product.name}</Card.Title>
        <Card.Text className="text-body-secondary flex-grow-1">
          {product.description}
        </Card.Text>

        <p className="mb-2" aria-label={`Đánh giá ${product.rating} trên 5`}>
          <span className="product-rating" aria-hidden="true">★</span>{' '}
          {product.rating.toFixed(1)} / 5
        </p>

        <div className="mb-3">
          {product.discount > 0 && (
            <del className="d-block text-body-secondary">
              {currencyFormatter.format(product.price)}
            </del>
          )}
          <strong className="product-price">
            {currencyFormatter.format(discountedPrice)}
          </strong>
        </div>

        <p className={product.instock > 0 ? 'text-success' : 'text-danger'}>
          {product.instock > 0
            ? `Còn hàng: ${product.instock}`
            : 'Hết hàng'}
        </p>

        {product.instock > 0 && (
          <Button
            type="button"
            variant={addedToCart ? 'success' : 'primary'}
            onClick={() => setAddedToCart(true)}
          >
            {addedToCart ? 'Đã thêm vào giỏ' : 'Thêm vào giỏ'}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default MyProduct;
