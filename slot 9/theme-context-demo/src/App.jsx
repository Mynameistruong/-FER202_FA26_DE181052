import { ContextDemo } from './components/ContextDemo.jsx'
import { Footer } from './components/Footer.jsx'
import { Header } from './components/Header.jsx'
import { ToastContainer } from './components/ToastContainer.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { LanguageProvider } from './context/LanguageProvider.jsx'
import { ToastProvider } from './context/ToastProvider.jsx'
import { HomePage } from './pages/HomePage.jsx'
import './App.css'

function App() {
  return (
    <LanguageProvider>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <div className="site-shell">
              <Header />
              <HomePage />
              <ContextDemo />
              <Footer />
              <ToastContainer />
            </div>
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </LanguageProvider>
  )
}

export default App