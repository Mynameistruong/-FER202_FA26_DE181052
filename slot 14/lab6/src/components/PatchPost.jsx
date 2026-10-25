import { useState } from 'react';
import axios from 'axios';

export default function PatchPost() {
  const [title, setTitle] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const handlePatch = async () => {
    setSaving(true);
    setError(null);
    try {
      const response = await axios.patch('https://jsonplaceholder.typicode.com/posts/1', { title });
      setResult({ status: response.status, data: response.data });
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2>5. PATCH – Sửa tiêu đề</h2>
      <label>Tiêu đề mới<input value={title} onChange={e => setTitle(e.target.value)} placeholder="Nhập tiêu đề mới" /></label>
      <button onClick={handlePatch} disabled={!title.trim() || saving}>{saving ? 'Đang lưu...' : 'Cập nhật (PATCH)'}</button>
      {error && <p className="error">Lỗi: {error}</p>}
      {result && <div className="result"><strong>Status: {result.status}</strong><pre>{JSON.stringify(result.data, null, 2)}</pre></div>}
    </div>
  );
}
