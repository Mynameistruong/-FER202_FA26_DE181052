import Card from 'react-bootstrap/Card';

function WelcomeCard() {
  const fullName = 'Lê Quang Trường';
  const birthYear = 2004;
  const currentYear = 2026;
  const major = 'Software Engineering';
  const hour = new Date().getHours();

  let session = 'sáng';
  if (hour >= 12 && hour < 18) {
    session = 'chiều';
  } else if (hour >= 18) {
    session = 'tối';
  }

  const greeting = `Chào buổi ${session}, ${fullName}!!`;
  const age = currentYear - birthYear;
  
  const borderClass = age >= 18 ? 'border-success' : 'border-warning';

  return (
    <Card className={`shadow-sm ${borderClass}`} style={{ maxWidth: 400 }}>
      <Card.Header>Thẻ sinh viên</Card.Header>
      <Card.Body>
        <Card.Title>{greeting}</Card.Title>
        <Card.Text>
          Tuổi: {age} <br />
          Chuyên ngành: {major}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default WelcomeCard;