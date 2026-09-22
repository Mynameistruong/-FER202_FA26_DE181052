import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { products } from './data/products';
import AppButton from './components/AppButton';
import InputField from './components/InputField';
import ProductCard from './components/ProductCard';
import ProductList from './components/ProductList';

function App() {
  const modifiedProduct = { ...products[0], discount: 30 };

  const saleProducts = products.slice(0, 2);
  const newProducts = products.slice(6);
  const featured = [...saleProducts, ...newProducts];

  const baseStyle = { borderRadius: 12 };
  const highlight = { border: '2px solid gold' };

  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container">
        <h2 className="mb-4 fw-bold">Ứng dụng Quản lý Sản phẩm - Lab ES6 & React</h2>

        <div className="mb-4 p-3 bg-white rounded shadow-sm">
          <h5 className="mb-3">Kiểm tra AppButton & InputField (Bài 6)</h5>
          <div className="mb-3 d-flex gap-2">
            <AppButton>Mặc định</AppButton>
            <AppButton variant="danger" size="sm">Danger nhỏ</AppButton>
            <AppButton disabled>Khóa</AppButton>
          </div>
          <div style={{ maxWidth: '400px' }}>
            <InputField 
              id="contactEmail" 
              label="Email liên hệ" 
              type="email" 
              placeholder="name@example.com" 
              required 
              helpText="Chúng tôi không chia sẻ email của bạn" 
            />
          </div>
        </div>

        <hr className="my-4" />

        <h5 className="mb-3">Kiểm tra Spread Object & Style</h5>
        <div className="row mb-4">
          <div className="col-md-3">
            <ProductCard product={modifiedProduct} />
          </div>
          <div className="col-md-3" style={{ ...baseStyle, ...highlight }}>
            <ProductCard product={products[1]} />
          </div>
        </div>

        <hr className="my-4" />

        <h5 className="mb-3">Danh sách sản phẩm tổng hợp (Spread Mảng)</h5>
        <ProductList products={featured} />
      </div>
    </div>
  );
}

export default App;