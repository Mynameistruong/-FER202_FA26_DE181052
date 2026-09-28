
import { Container } from "react-bootstrap";
import ControlledInput from "./components/ControlledInput";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <Container className="app-shell d-flex justify-content-center align-items-center vh-100">
      <ControlledInput />
    </Container>
  );
}