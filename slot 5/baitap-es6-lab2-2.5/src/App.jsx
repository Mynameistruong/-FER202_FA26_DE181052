import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { products } from './data/products';
import ProductList from './components/ProductList';

function App() {
  return (
    <div className="bg-light min-vh-100">
      <ProductList products={products} />
    </div>
  );
}

export default App;