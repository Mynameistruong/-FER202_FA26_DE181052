import { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Card, Spinner } from 'react-bootstrap';

const API_URL = 'https://jsonplaceholder.typicode.com/posts/1';

function AxiosDemo() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    axios
      .get(API_URL)
      .then((response) => {
        if (isMounted) {
          setData(response.data);
          setError(null);
        }
      })
      .catch((requestError) => {
        if (isMounted) {
          setError(requestError.message);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center gap-2 py-5">
        <Spinner animation="border" role="status" />
        <span>Loading...</span>
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
    <Card className="mx-auto shadow-sm post-card">
      <Card.Header className="fw-semibold">
        Post #{data.id}
      </Card.Header>

      <Card.Body>
        <Card.Title>{data.title}</Card.Title>
        <Card.Text>{data.body}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default AxiosDemo;