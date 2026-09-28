
import { Card, Button, Badge } from 'react-bootstrap';

const MenuCard = ({ item }) => {
  return (
    <Card className="h-100 shadow-sm border-0 position-relative text-center bg-dark text-white">
      {item.badge && (
        <Badge 
          bg={item.badgeVariant} 
          className="position-absolute m-2 top-0 start-0"
        >
          {item.badge}
        </Badge>
      )}
      <Card.Img variant="top" src={item.image} alt={item.title} style={{ height: '200px', objectFit: 'cover' }} />
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title className="fs-6 fw-bold">{item.title}</Card.Title>
          <Card.Text className="mb-3">
            <span className="text-warning fw-bold">{item.price}</span>{' '}
            {item.oldPrice && <span className="text-muted text-decoration-line-through small">{item.oldPrice}</span>}
          </Card.Text>
        </div>
        <Button variant="outline-light" size="sm" className="w-100 text-uppercase fw-bold">
          Buy
        </Button>
      </Card.Body>
    </Card>
  );
};

export default MenuCard;