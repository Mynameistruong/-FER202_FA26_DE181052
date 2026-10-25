import { useState } from 'react';
import axios from 'axios';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        title, body, userId: 1,
      });
      setResult({ status: response.status, data: response.data });
      setTitle('');
      setBody('');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>3. POST – Tạo bài viết</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>Tiêu đề<input value={title} onChange={e => setTitle(e.target.value)} placeholder="Nhập tiêu đề" required /></label>
        <label>Nội dung<textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Nhập nội dung" required rows="3" /></label>
        <button type="submit" disabled={submitting}>{submitting ? 'Đang gửi...' : 'Tạo bài viết'}</button>
      </form>
      {error && <p className="error">Lỗi: {error}</p>}
      {result && <Result result={result} />}
      <p className="note">JSONPlaceholder mô phỏng POST; dữ liệu tạo mới không được lưu lâu dài trên server.</p>
    </div>
  );
}

function Result({ result }) {
  return <div className="result"><strong>Status: {result.status}</strong><pre>{JSON.stringify(result.data, null, 2)}</pre></div>;
}
