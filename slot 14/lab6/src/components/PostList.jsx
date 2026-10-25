import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: { userId: 1, _limit: 5 },
        });
        setPosts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h2>2. GET – Danh sách bài viết</h2>
      {loading && <p className="muted">Đang tải dữ liệu...</p>}
      {error && <p className="error">Lỗi: {error}</p>}
      {!loading && !error && <ul>{posts.map(post => <li key={post.id}><strong>#{post.id}</strong> – {post.title}</li>)}</ul>}
    </div>
  );
}
