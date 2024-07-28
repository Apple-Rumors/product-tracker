import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './index.css';
import App from './app';

import ProductDetail from './components/product-detail';
import GenerationDetail from './components/generation-detail';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="products/:product" element={<ProductDetail />} />
          <Route path="products/:product/:generation" element={<GenerationDetail />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
