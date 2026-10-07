import { useState } from 'react'
import { useAuth } from '../context/AuthProvider.jsx'
import { useCart, useCartDispatch } from '../context/CartContext.jsx'
import { useToast } from '../context/ToastProvider.jsx'
import { products } from '../data/products.js'

export function ContextDemo() {
  const { user, isAuthenticated, login, logout } = useAuth()
  const { items } = useCart()
  const dispatch = useCartDispatch()
  const { showToast } = useToast()

  const [form, setForm] = useState({ username: 'admin', password: '123' })
  const [error, setError] = useState('')

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  const handleLogin = (event) => {
    event.preventDefault()

    const isLoginSuccess = login(form.username, form.password)

    if (isLoginSuccess) {
      showToast('Đăng nhập thành công', 'success')
      setError('')
      return
    }

    setError('Sai tài khoản hoặc mật khẩu')
    showToast('Sai tài khoản hoặc mật khẩu', 'error')
  }

  const handleLogout = () => {
    logout()
    showToast('Đăng xuất thành công', 'info')
  }

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      showToast('Bạn cần đăng nhập trước khi thêm sản phẩm', 'warning')
      return
    }

    dispatch({ type: 'ADD', payload: product })
    showToast(`${product.name} đã được thêm vào giỏ`, 'success')
  }

  return (
    <section className="context-demo">
      <div className="demo-title-row">
        <div>
          <p className="eyebrow"><span />Context Lab</p>
          <h2>Bài 2 + Bài 3 demo</h2>
        </div>
      </div>

      <div className="demo-grid">
        <div className="demo-panel auth-panel">
          <h3>AuthContext</h3>

          {isAuthenticated ? (
            <div className="user-card">
              <p>Xin chào, <strong>{user.username}</strong></p>
              <button type="button" onClick={handleLogout}>Đăng xuất</button>
            </div>
          ) : (
            <form className="login-form" onSubmit={handleLogin}>
              <label>
                Username
                <input
                  type="text"
                  value={form.username}
                  onChange={(event) => setForm({ ...form, username: event.target.value })}
                />
              </label>

              <label>
                Password
                <input
                  type="password"
                  value={form.password}
                  onChange={(event) => setForm({ ...form, password: event.target.value })}
                />
              </label>

              {error && <p className="error-text">{error}</p>}

              <button type="submit">Đăng nhập</button>
            </form>
          )}
        </div>

        <div className="demo-panel cart-panel">
          <h3>CartContext</h3>

          <div className="cart-summary">
            <span>Số lượng: {items.reduce((sum, item) => sum + item.qty, 0)}</span>
            <strong>{total.toLocaleString('vi-VN')}đ</strong>
          </div>

          {products.map((product) => (
            <div key={product.id} className="product-row">
              <div>
                <strong>{product.name}</strong>
                <small>{product.price.toLocaleString('vi-VN')}đ</small>
              </div>
              <button type="button" onClick={() => handleAddToCart(product)}>
                Add to cart
              </button>
            </div>
          ))}

          {items.length > 0 && (
            <div className="cart-list">
              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  <span>
                    {item.name} x {item.qty}
                  </span>
                  <div className="cart-item-actions">
                    <button type="button" onClick={() => dispatch({ type: 'DECREASE', payload: item.id })}>-</button>
                    <button type="button" onClick={() => dispatch({ type: 'REMOVE', payload: item.id })}>Xoá</button>
                  </div>
                </div>
              ))}

              <button type="button" className="clear-cart" onClick={() => dispatch({ type: 'CLEAR' })}>
                Xoá giỏ hàng
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
