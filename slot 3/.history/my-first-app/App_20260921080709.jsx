// src/App.jsx
import About from './About'; // Nhúng file About vừa tạo

function App() {
  return (
    <div>
      <h1>Ứng dụng React của tôi</h1>
      <hr />
      
      {/* Gọi component About ở đây */}
      <About />
    </div>
  );
}

export default App;