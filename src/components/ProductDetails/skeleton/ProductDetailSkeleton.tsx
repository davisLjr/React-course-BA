import React from 'react';
import { useMedia } from 'use-media';
import Skeleton from '../../Skeleton/Skeleton';
import './ProductDetailSkeleton.scss'

const ProductDetailSkeleton: React.FC = () => {
  const isMobile = useMedia({ maxWidth: '1017px' });
  const imageHeight = isMobile ? 464 : 700;

  return (
    <div className="product-detail-skeleton">
      <div className="product-detail-skeleton__container">
        <div className="product-detail-skeleton__image">
          <Skeleton width="100%" height={imageHeight} borderRadius="0.5rem" />
        </div>
        <div className="product-detail-skeleton__info">
          <Skeleton width="60%" height={38} />
          <Skeleton width="100%" height={16} />
          <Skeleton width="100%" height={16} />
          <Skeleton width="40%" height={24} />
          <Skeleton width="200px" height={78} borderRadius="0.5rem" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
