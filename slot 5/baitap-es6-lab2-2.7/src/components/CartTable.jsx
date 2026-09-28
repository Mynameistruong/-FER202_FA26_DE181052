
import { Table, ListGroup, Badge, Container } from 'react-bootstrap';
import { cartItems, products } from '../data/cart';

// 1. Hàm tiện ích định dạng tiền[cite: 1]
const formatVND = (n) => n.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

export default function CartTable() {
  // 2. Sắp xếp: dùng [...cartItems] để không làm thay đổi mảng gốc[cite: 1]
  const sortedItems = [...cartItems].sort((a, b) => b.price * b.quantity - a.price * a.quantity);

  // 5. Tổng tiền[cite: 1]
  const totalPrice = cartItems.reduce((sum, { price, quantity }) => sum + price * quantity, 0);
  
  // Tổng số lượng[cite: 1]
  const totalQuantity = cartItems.reduce((sum, { quantity }) => sum + quantity, 0);

  // 6. Đơn giá cao nhất[cite: 1]
  const maxPrice = Math.max(...cartItems.map((item) => item.price));

  // 8. Danh sách giảm giá (đang giảm giá và còn hàng)[cite: 1]
  const onSale = products.filter(({ inStock, discount }) => inStock && discount > 0);

  return (
    <Container className="py-4">
      <h3 className="mb-3">Bài 7: Bảng giỏ hàng có tổng tiền</h3>
      
      {/* Bảng giỏ hàng */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Đơn giá</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {/* 3 & 4. Destructuring trong tham số của map, index dùng làm STT, key là item.id[cite: 1] */}
          {sortedItems.map(({ id, name, price, quantity }, index) => (
            <tr key={id}>
              <td>{index + 1}</td>
              <td>{name}</td>
              <td>{formatVND(price)}</td>
              <td>{quantity}</td>
              <td>{formatVND(price * quantity)}</td>
            </tr>
          ))}
        </tbody>
        
        {/* 7. Đặt ba số liệu trên vào <tfoot> của bảng, dùng colSpan cho ô nhãn[cite: 1] */}
        <tfoot>
          <tr>
            <td colSpan="3" className="text-end fw-bold">Tổng số lượng:</td>
            <td colSpan="2" className="fw-bold">{totalQuantity}</td>
          </tr>
          <tr>
            <td colSpan="3" className="text-end fw-bold">Tổng tiền giỏ hàng:</td>
            <td colSpan="2" className="fw-bold text-danger">{formatVND(totalPrice)}</td>
          </tr>
          <tr>
            <td colSpan="3" className="text-end fw-bold">Đơn giá cao nhất:</td>
            <td colSpan="2" className="fw-bold text-success">{formatVND(maxPrice)}</td>
          </tr>
        </tfoot>
      </Table>

      {/* Danh sách sản phẩm đang giảm giá và còn hàng */}
      <h4 className="mt-4">Sản phẩm đang giảm giá và còn hàng</h4>
      <ListGroup>
        {onSale.map((product) => (
          <ListGroup.Item key={product.id} className="d-flex justify-content-between align-items-center">
            {product.name}
            <Badge bg="danger" pill>
              -{product.discount}%
            </Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}   