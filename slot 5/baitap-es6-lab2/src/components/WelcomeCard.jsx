import Card from 'react-bootstrap/Card';


const fullName = 'Nguyễn Văn An';
const birthYear = 2005;
const currentYear = 2026;
const major = 'Software Engineering';
const hour = new Date().getHours();

function WelcomeCard() {
 
  let session = 'sáng';
  if (hour >= 18) {
    session = 'tối';
  } else if (hour >= 12) {
    session = 'chiều';
  }


  const greeting = `Chào buổi ${session}, ${fullName}!`;

  
  const age = `${currentYear - birthYear}`;

  
  const borderClass = Number(age) >= 18 ? 'border-success' : 'border-warning';

  return (
    
    <Card className={`shadow-sm ${borderClass}`} style={{ maxWidth: 400 }}>
      <Card.Header>Thẻ sinh viên</Card.Header>
      <Card.Body>
        <Card.Title>{greeting}</Card.Title>
        <Card.Text>
          Hiện tại bạn {age} tuổi. Chuyên ngành của bạn là {major}.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}


export default WelcomeCard;