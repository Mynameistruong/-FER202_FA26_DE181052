import { useEffect, useState } from 'react';
import axios from 'axios';

export default function RequestConfig() {
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWithConfig = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: 'https://jsonplaceholder.typicode.com/posts',
          params: { _page: 1, _limit: 3 },
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer demo-token-123',
          },
          timeout: 5000,
        });
        setInfo({
          status: response.status,
          contentType: response.headers['content-type'],
          total: response.headers['x-total-count'],
          data: response.data,
        });
      } catch (err) {
        if (err.code === 'ECONNABORTED') setError('Request quá thời gian (timeout)');
        else if (err.response) setError(`Server trả lỗi ${err.response.status}`);
        else setError(err.message);
      }
    };
    fetchWithConfig();
  }, []);

  return (
    <div>
      <h2>7. Cấu hình request</h2>
      {error && <p className="error">Lỗi: {error}</p>}
      {!info && !error && <p className="muted">Đang tải dữ liệu...</p>}
      {info && <>
        <p><strong>Status:</strong> {info.status}</p>
        <p><strong>Content-Type:</strong> {info.contentType}</p>
        <p><strong>Tổng số bài viết:</strong> {info.total ?? 'Header không được cung cấp'}</p>
        <ul>{info.data.map(post => <li key={post.id}>{post.title}</li>)}</ul>
      </>}
    </div>
  );
}
