import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const productNameMap = {
  iphones: 'iPhones',
  ipads: 'iPads',
  macs: 'Macs',
  wearables: 'Wearables'
};

function ProductDetail() {
  let { product } = useParams();
  let [data, setData] = useState(null);

  useEffect(() => {
    console.log(product);
    import(`@/data/${product.toLowerCase()}.json`).then(module => {
      setData(module.default[product.toLowerCase()]);
    });
  }, [product]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{productNameMap[product.toLowerCase()]}</h2>
      <ul className="space-y-2">
        {data.map(item => (
          <li key={item.model}>
            <Link to={`/products/${product}/${item.model.replace(/\s+/g, '-')}`} className="text-primary-blue hover:underline">
              {item.model}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductDetail;
