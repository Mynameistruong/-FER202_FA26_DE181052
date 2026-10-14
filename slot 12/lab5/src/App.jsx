
import {Route, Routes} from 'react-router-dom'
import {Home} from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import New from './pages/New'
import ProductList from './pages/ProductList'
import {AppFooter} from './components/AppFooter'
import './App.css'
import { AppNavbar } from './components/AppNavbar';
import MyCarousel from './components/MyCarousel';

function App() {
  return (
    <div>
      <h1 className="heading">Lab 5</h1>
      <AppNavbar />
      <div className="carousel-section">
        <MyCarousel />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/new" element={<New />} />
        <Route path="/products" element={<ProductList />} />
      </Routes>
      <AppFooter />
    </div>
  )
}

export default App
