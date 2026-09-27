import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const StudentCard = ({ student }) => {
  const { id, name, major, gpa, avatar, contact: { email: studentEmail, phone } } = student;

  return (
    <Card style={{ width: '18rem' }} className="shadow-sm">
      <Card.Img variant="top" src={avatar} alt={name} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Mã số: {id}</Card.Subtitle>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Chuyên ngành: {major}</ListGroup.Item>
        <ListGroup.Item>GPA: {gpa}</ListGroup.Item>
        <ListGroup.Item>Email: {studentEmail}</ListGroup.Item>
        <ListGroup.Item>Điện thoại: {phone}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Button variant="primary" onClick={() => alert(`Xem hồ sơ của ${name}`)}>
          Xem hồ sơ
        </Button>
      </Card.Body>
    </Card>
  );
};

export default StudentCard;