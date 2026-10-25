import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DeletePost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', { params: { _limit: 5 } });
        setPosts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm(`Xóa bài viết #${id}?`)) return;
    setDeletingId(id);
    setError(null);
    try {
      const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      setPosts(previous => previous.filter(post => post.id !== id));
      setMessage(`Đã gửi yêu cầu xóa bài #${id} – Status: ${response.status}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <h2>6. DELETE – Xóa bài viết</h2>
      {loading && <p className="muted">Đang tải dữ liệu...</p>}
      {error && <p className="error">Lỗi: {error}</p>}
      {message && <p className="success">{message}</p>}
      {!loading && !error && <ul>{posts.map(post => (
        <li key={post.id} className="delete-row">
          <span><strong>#{post.id}</strong> – {post.title}</span>
          <button className="danger-button" onClick={() => handleDelete(post.id)} disabled={deletingId === post.id}>
            {deletingId === post.id ? 'Đang xóa...' : 'Xóa'}
          </button>
        </li>
      ))}</ul>}
      <p className="note">Thao tác xóa trên JSONPlaceholder chỉ là mô phỏng, không thay đổi dữ liệu thật lâu dài.</p>
    </div>
  );
}
