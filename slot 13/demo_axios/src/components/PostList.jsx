import { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert, Card, ListGroup, Spinner } from 'react-bootstrap';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts', {
        params: {
          userId: 1,
          _limit: 5
        }
      })
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-4">
        <Spinner animation="border" />
        <p>Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        Error: {error}
      </Alert>
    );
  }

  return (
    <Card className="mt-4 shadow-sm">
      <Card.Header className="bg-primary text-white">
        <h4 className="mb-0">
          GET – Danh sách bài viết của user 1
        </h4>
      </Card.Header>

      <ListGroup variant="flush">
        {posts.map((post) => (
          <ListGroup.Item key={post.id}>
            <h5>
              #{post.id} – {post.title}
            </h5>

            <p className="mb-1">{post.body}</p>

            <small className="text-muted">
              User ID: {post.userId}
            </small>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};

export default PostList;