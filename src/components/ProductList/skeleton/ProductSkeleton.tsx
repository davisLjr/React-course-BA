import React from 'react';
import './productSkeleton.scss';
import Skeleton from '../../Skeleton/Skeleton';

const ProductSkeleton: React.FC = () => (
  <div className="product-skeleton">
    <Skeleton className="product-skeleton__image" width="100%" height={320} />
    <div className="product-skeleton__body">
      <Skeleton width="100%" height={16} />
      <Skeleton width={40} height={16} />
    </div>
    <Skeleton className="product-skeleton__button" width="100%" height={51} />
  </div>
);

export default ProductSkeleton;
