import { Container, Row, Col } from 'react-bootstrap';
import MenuCard from './MenuCard';
import { menuItems } from '../data/menuData';

const MenuSection = () => {
  return (
    <section id="about" className="menu-section py-5">
      <Container>
      <h2 className="text-white text-center mb-4 fw-bold">Our Menu</h2>
      <Row className="g-4">
        {menuItems.map((item) => (
          <Col key={item.id} xs={12} sm={6} md={3}>
            <MenuCard item={item} />
          </Col>
        ))}
      </Row>
      </Container>
    </section>
  );
};

export default MenuSection;