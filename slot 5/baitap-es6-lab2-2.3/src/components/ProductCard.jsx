import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

const ProductCard = ({ product = {} }) => {
  // 1. Destructuring với giá trị mặc định cho name
  const { 
    name = 'Sản phẩm chưa đặt tên', 
    price, 
    image, 
    rating, 
    category 
  } = product;

  // 2. Xử lý ảnh mặc định nếu thiếu image
  const imageSrc = image ?? 'https://placehold.co/300x200?text=No+Image';

  // 3. Xử lý danh mục an toàn bằng optional chaining và nullish coalescing
  const categoryName = category?.name ?? 'Chưa phân loại';

  // 4. Xử lý điểm đánh giá và số lượt đánh giá
  const ratingScore = rating?.rate ?? 'Chưa có';
  const ratingCount = rating?.count ?? 0;

  // 5. Xử lý giá tiền (nếu giá là 0 vẫn hiển thị 0 đ, nếu thiếu/undefined thì hiện "Liên hệ")
  const displayPrice = price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) ?? 'Liên hệ';

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img variant="top" src={imageSrc} alt={name} style={{ height: '200px', objectFit: 'cover' }} />
      <Card.Body className="d-flex flex-column">
        <div className="mb-2">
          <Badge bg="secondary">{categoryName}</Badge>
        </div>
        <Card.Title className="fs-6">{name}</Card.Title>
        <Card.Text className="mt-auto">
          <div className="fw-bold text-primary mb-1">{displayPrice}</div>
          <small className="text-muted">
            ⭐ {ratingScore} ({ratingCount} đánh giá)
          </small>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;