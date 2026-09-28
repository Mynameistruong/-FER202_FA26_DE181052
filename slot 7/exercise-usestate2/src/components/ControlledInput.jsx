import { useState } from 'react';
import { Card, Form } from 'react-bootstrap';

export default function ControlledInput() {
  const [text, setText] = useState('');

  return (
    <Card className="input-card text-center p-4 shadow" style={{ width: '400px' }}>
      <Card.Body>
        <Card.Title className="input-title mb-3">Controlled Input Field</Card.Title>
        
        {/* Ô nhập liệu */}
        <Form.Control
          type="text"
          placeholder="Nhập gì đó..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mb-4"
        />

        {/* Hiển thị văn bản theo thời gian thực */}
        <h5 className="output-text text-secondary">
          Input text: <span className="text-primary fw-bold">{text}</span>
        </h5>
      </Card.Body>
    </Card>
  );
}