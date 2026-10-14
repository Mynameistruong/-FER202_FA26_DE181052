
import {Route, Routes} from 'react-router-dom'
import {Home} from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import New from './pages/New'
import './App.css'
import { AppNavbar } from './components/AppNavbar';

function App() {
  return (
    <div>
      <h1> lab 5 </h1>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/new" element={<New />} />
      </Routes>
    </div>
  )
}

export default App
