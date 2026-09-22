
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Đảm bảo đã import Bootstrap
import { products } from './data/products';
import ProductList from './components/ProductList';

function App() {
  return (
    <div>
      <ProductList products={products} />
    </div>
  );
}

export default App;