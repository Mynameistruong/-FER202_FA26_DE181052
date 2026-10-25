import { useEffect, useState } from 'react';
import axios from 'axios';

const URL = 'https://jsonplaceholder.typicode.com/posts/1';

export default function UpdatePost() {
  const [post, setPost] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(URL);
        setPost(response.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchPost();
  }, []);

  const handleUpdate = async () => {
    setSaving(true);
    setError(null);
    try {
      const response = await axios.put(URL, {
        id: post.id, userId: post.userId, title: post.title, body: post.body,
      });
      setResult({ status: response.status, data: response.data });
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (error && !post) return <div><h2>4. PUT – Cập nhật bài viết</h2><p className="error">Lỗi: {error}</p></div>;
  if (!post) return <div><h2>4. PUT – Cập nhật bài viết</h2><p className="muted">Đang tải dữ liệu...</p></div>;

  return (
    <div>
      <h2>4. PUT – Cập nhật bài viết #1</h2>
      <label>Tiêu đề<input value={post.title} onChange={e => setPost({ ...post, title: e.target.value })} /></label>
      <label>Nội dung<textarea rows="3" value={post.body} onChange={e => setPost({ ...post, body: e.target.value })} /></label>
      <button onClick={handleUpdate} disabled={saving}>{saving ? 'Đang lưu...' : 'Cập nhật (PUT)'}</button>
      {error && <p className="error">Lỗi: {error}</p>}
      {result && <div className="result"><strong>Status: {result.status}</strong><pre>{JSON.stringify(result.data, null, 2)}</pre></div>}
    </div>
  );
}
