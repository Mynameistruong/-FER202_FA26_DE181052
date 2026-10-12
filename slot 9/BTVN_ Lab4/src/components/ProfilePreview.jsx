import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

const MAX_BIO = 150;
const majors = ['Software Engineering', 'Artificial Intelligence', 'Digital Marketing'];

const ProfilePreview = () => {
  const [fullName, setFullName] = useState('');
  const [major, setMajor] = useState(majors[0]);
  const [bio, setBio] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState('');
  const remaining = MAX_BIO - bio.length;

  const handleNameKeyDown = (event) => {
    if (event.key === 'Escape') setFullName('');
  };
  const handleBioChange = (event) => setBio(event.target.value.slice(0, MAX_BIO));

  return (
    <Row className="g-4">
      <Col lg={6}>
        <Card className="h-100"><Card.Body>
          <Card.Title>Hồ sơ của bạn</Card.Title>
          <Form onSubmit={(event) => event.preventDefault()}>
            <Form.Group className="mb-3" controlId="profile-name">
              <Form.Label>Họ tên</Form.Label>
              <Form.Control
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                onKeyDown={handleNameKeyDown}
                onFocus={() => setFocused('fullName')}
                onBlur={() => setFocused('')}
                className={focused === 'fullName' ? 'border-primary border-2' : ''}
                placeholder="Nguyễn Văn An"
              />
              <Form.Text>Nhấn Esc để xóa nhanh.</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="profile-major">
              <Form.Label>Chuyên ngành</Form.Label>
              <Form.Select value={major} onChange={(event) => setMajor(event.target.value)}>
                {majors.map((item) => <option key={item}>{item}</option>)}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="profile-bio">
              <Form.Label>Giới thiệu</Form.Label>
              <Form.Control as="textarea" rows={3} value={bio} onChange={handleBioChange} />
              <Form.Text className={remaining < 20 ? 'text-danger' : ''}>
                Còn {remaining}/{MAX_BIO} ký tự
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="profile-password">
              <Form.Label>Mật khẩu</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <Button variant="outline-secondary" onClick={() => setShowPassword((shown) => !shown)}>
                  {showPassword ? 'Ẩn' : 'Hiện'}
                </Button>
              </InputGroup>
            </Form.Group>
          </Form>
        </Card.Body></Card>
      </Col>
      <Col lg={6}>
        <Card className="h-100 border-primary-subtle"><Card.Body>
          <Card.Subtitle className="mb-3 text-primary">Xem trước hồ sơ</Card.Subtitle>
          <Card.Title>{fullName.trim() || 'Chưa nhập tên'}</Card.Title>
          <Card.Text className="text-muted">{major}</Card.Text>
          <Card.Text>{bio.trim() ? bio : <em>Chưa có giới thiệu</em>}</Card.Text>
          <Card.Text className="small text-muted">Độ dài mật khẩu: {password.length} ký tự</Card.Text>
        </Card.Body></Card>
      </Col>
    </Row>
  );
};

export default ProfilePreview;
