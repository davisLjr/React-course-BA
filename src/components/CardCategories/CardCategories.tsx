import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { type CardCategoriesProps } from './types';
import type { Product as FirestoreProduct } from '../../hooks/useProducts';
import { useProducts } from '../../hooks/useProducts';

const CardCategories: React.FC<CardCategoriesProps> = ({
  category,
  imageSrc,
  to,
}) => {
  const { products } = useProducts(category);
  const thumb = imageSrc ?? products[0]?.images[0] ?? '/categories/default.webp';

  const simulatedProduct: FirestoreProduct = {
    id: `category-${category}`,
    title: category,
    description: `Explora productos en ${category}`,
    price: 0,
    category,
    images: [thumb],
  };

  return (
    <ProductCard
      product={simulatedProduct}
      showAddToCart={false}
      overrideRedirect={to}
    />
  );
};

export default CardCategories;
