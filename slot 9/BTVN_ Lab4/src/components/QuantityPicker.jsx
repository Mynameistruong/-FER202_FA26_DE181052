import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const QuantityPicker = ({ min = 1, max = 10 }) => {
  const [quantity, setQuantity] = useState(min);

  const decrease = () => setQuantity((current) => Math.max(current - 1, min));
  const increase = () => setQuantity((current) => Math.min(current + 1, max));

  const addThreeWrong = () => {
    setQuantity(Math.min(quantity + 1, max));
    setQuantity(Math.min(quantity + 1, max));
    setQuantity(Math.min(quantity + 1, max));
  };

  const addThree = () => {
    increase();
    increase();
    increase();
  };

  return (
    <div className="quantity-control">
      <ButtonGroup aria-label="Điều chỉnh số lượng">
        <Button variant="outline-secondary" aria-label="Giảm số lượng" disabled={quantity <= min} onClick={decrease}>
          −
        </Button>
        <Button variant="light" disabled className="quantity-value">
          {quantity}
        </Button>
        <Button variant="outline-secondary" aria-label="Tăng số lượng" disabled={quantity >= max} onClick={increase}>
          +
        </Button>
      </ButtonGroup>
      <div className="quantity-experiments">
        <Button size="sm" variant="outline-danger" onClick={addThreeWrong}>+3 (sai)</Button>
        <Button size="sm" variant="outline-success" onClick={addThree}>+3 (đúng)</Button>
        <Button size="sm" variant="link" onClick={() => setQuantity(min)}>Đặt lại</Button>
      </div>
      {quantity === max && <small className="quantity-warning">Tối đa {max} sản phẩm</small>}
    </div>
  );
};

export default QuantityPicker;