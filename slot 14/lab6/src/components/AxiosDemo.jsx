
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AxiosDemo() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts/1'
        );
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Lỗi: {error}</p>;

  return (
    <div>
      <h2>1. Axios Demo - GET</h2>
      <h3>{data.title}</h3>
      <p>{data.body}</p>
    </div>
  );
}
