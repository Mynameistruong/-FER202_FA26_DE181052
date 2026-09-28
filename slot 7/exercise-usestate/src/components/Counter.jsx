import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

export default function Counter() {
  const [count, setCount] = useState(0);

  const getColor = () => {
    if (count > 0) return 'text-success';
    if (count < 0) return 'text-danger';
    return 'text-primary';
  };

  return (
    <Card className="text-center p-4 shadow" style={{ width: '350px' }}>
      <Card.Body>
        <Card.Title className="mb-3">Counter App</Card.Title>
        <h1 className={`display-3 fw-bold mb-4 ${getColor()}`}>{count}</h1>
        <div className="d-flex justify-content-between gap-2">
          <Button variant="danger" onClick={() => setCount(count - 1)}>
            Giảm (-)
          </Button>
          <Button variant="secondary" onClick={() => setCount(0)}>
            Reset
          </Button>
          <Button variant="success" onClick={() => setCount(count + 1)}>
            Tăng (+)
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}