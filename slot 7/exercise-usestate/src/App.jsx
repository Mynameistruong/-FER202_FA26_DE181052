
import { Container } from "react-bootstrap";
import Counter from "./components/Counter";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Counter />
    </Container>
  );
}