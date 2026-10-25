import { Container } from 'react-bootstrap';
import AxiosDemo from './components/AxiosDemo.jsx';
import PostList from './components/PostList.jsx';

function App() {
  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">DemoAxios</h1>

      {/* Bài trước */}
      <AxiosDemo />

      <hr className="my-4" />

      {/* Bài 2.1 */}
      <PostList />
    </Container>
  );
}

export default App;