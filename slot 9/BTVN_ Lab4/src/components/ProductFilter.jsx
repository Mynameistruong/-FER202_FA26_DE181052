import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { formatVND, getFinalPrice } from '../utils/format';

const sorters = {
  default: () => 0,
  priceAsc: (a, b) => getFinalPrice(a) - getFinalPrice(b),
  priceDesc: (a, b) => getFinalPrice(b) - getFinalPrice(a),
  rating: (a, b) => b.rating - a.rating,
};

const ProductFilter = ({ products, onAddToCart = () => {} }) => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('Tất cả');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState('default');
  const categories = ['Tất cả', ...new Set(products.map((product) => product.category?.name ?? 'Khác'))];
  const normalizedKeyword = keyword.trim().toLocaleLowerCase('vi');
  const visibleProducts = products
    .filter((product) => product.name.toLocaleLowerCase('vi').includes(normalizedKeyword))
    .filter((product) => category === 'Tất cả' || product.category?.name === category)
    .filter((product) => !onlyInStock || product.inStock)
    .sort(sorters[sortBy]);

  const resetFilters = () => {
    setKeyword('');
    setCategory('Tất cả');
    setOnlyInStock(false);
    setSortBy('default');
  };

  return (
    <>
      <Card className="mb-4"><Card.Body>
        <Row className="g-3 align-items-end">
          <Col md={5}>
            <Form.Label htmlFor="product-search">Tìm sản phẩm</Form.Label>
            <Form.Control
              id="product-search"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="Ví dụ: chuột, webcam..."
            />
          </Col>
          <Col md={4}>
            <Form.Label htmlFor="product-sort">Sắp xếp</Form.Label>
            <Form.Select id="product-sort" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              <option value="default">Mặc định</option>
              <option value="priceAsc">Giá tăng dần</option>
              <option value="priceDesc">Giá giảm dần</option>
              <option value="rating">Đánh giá cao</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Check
              type="switch"
              id="only-in-stock"
              label="Còn hàng"
              checked={onlyInStock}
              onChange={(event) => setOnlyInStock(event.target.checked)}
            />
          </Col>
        </Row>
        <div className="d-flex flex-wrap align-items-center gap-2 mt-3">
          {categories.map((name) => (
            <Button key={name} size="sm" variant={category === name ? 'primary' : 'outline-primary'} onClick={() => setCategory(name)}>
              {name}
            </Button>
          ))}
          <Button size="sm" variant="link" onClick={resetFilters}>Xóa lọc</Button>
          <span className="small text-secondary ms-auto">
            Tìm thấy <strong>{visibleProducts.length}</strong>/{products.length} sản phẩm
          </span>
        </div>
      </Card.Body></Card>
      {visibleProducts.length === 0 ? (
        <Alert variant="info">Không có sản phẩm phù hợp.</Alert>
      ) : (
        <Row xs={1} md={2} xl={4} className="g-3">
          {visibleProducts.map((product) => (
            <Col key={product.id}>
              <Card className="h-100 product-card">
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between gap-2">
                    <Card.Subtitle className="text-secondary">{product.category?.name}</Card.Subtitle>
                    {product.inStock
                      ? <Badge bg="success">Còn hàng</Badge>
                      : <Badge bg="secondary">Tạm hết</Badge>}
                  </div>
                  <Card.Title className="mt-3">{product.name}</Card.Title>
                  <Card.Text className="text-secondary small flex-grow-1">{product.description}</Card.Text>
                  <div className="mb-3">
                    <strong className="text-primary">{formatVND(getFinalPrice(product))}</strong>
                    {product.discount > 0 && (
                      <span className="small text-secondary ms-2 text-decoration-line-through">
                        {formatVND(product.price)}
                      </span>
                    )}
                    <div className="small text-secondary">★ {product.rating.toFixed(1)}</div>
                  </div>
                  <Button disabled={!product.inStock} onClick={() => onAddToCart(product)}>
                    Thêm vào giỏ
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default ProductFilter;
