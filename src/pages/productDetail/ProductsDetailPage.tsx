import React from 'react';
import { ProductDetail } from '../../components/ProductDetails/ProductDetails';


const ProductDetailPage: React.FC = () => {
  return (
    <main style={{ height: '100%', display: 'flex', alignItems: 'center', maxWidth: '1920px', margin: 'auto' }}>
      <ProductDetail />
    </main>
  );
};

export default ProductDetailPage;
