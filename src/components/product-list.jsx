import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import iphones from '../data/iphones.json';
import ipads from '../data/ipads.json';
import macs from '../data/macs.json';
import wearables from '../data/wearables.json';

let products = [
  { name: 'iPhones', data: iphones },
  { name: 'iPads', data: ipads },
  { name: 'Macs', data: macs },
  { name: 'Wearables', data: wearables }
];

function ProductList() {
  let [selectedProduct, setSelectedProduct] = useState(null);
  let [models, setModels] = useState([]);

  let location = useLocation();

  useEffect(() => {
    let productName = location.pathname.split('/')[2];
    if (productName) {
      let product = products.find(p => p.name.toLowerCase() === productName);
      if (product) {
        setSelectedProduct(product.name);
        setModels(product.data.iphones || product.data.ipads || product.data.macs || product.data.wearables || []);
      }
    }
  }, [location]);

  return (
    <ul className="space-y-4">
      {products.map(product => (
        <li key={product.name}>
          <Link
            to={`/products/${product.name.toLowerCase()}`}
            className="text-lg text-primary-blue hover:underline"
          >
            {product.name}
          </Link>
          {selectedProduct === product.name && models.length > 0 && (
            <ul className="mt-2 ml-4 space-y-2">
              {models.map((model, index) => (
                <li key={index} className="text-gray-700">
                  <Link
                    to={`/products/${product.name.toLowerCase()}/${model.model.replace(/\s+/g, '-').toLowerCase()}`}
                    className="text-gray-700 hover:underline"
                  >
                    {model.model}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
