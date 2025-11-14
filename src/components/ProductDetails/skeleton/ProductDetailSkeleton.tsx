import React from 'react';
import Skeleton from '../../Skeleton/Skeleton';
import './ProductDetailSkeleton.scss'

const ProductDetailSkeleton: React.FC = () => {
  return (
    <div className="product-detail-skeleton">
      <div className="product-detail-skeleton__container">
        <div className="product-detail-skeleton__image">
          <div className="product-detail-skeleton__main-image">
            <Skeleton width="100%" height="100%" borderRadius="0.5rem" />
          </div>
          <div className="product-detail-skeleton__thumbs">
            <div className="product-detail-skeleton__thumb">
              <Skeleton width="100%" height="100%" borderRadius="0.25rem" />
            </div>
            <div className="product-detail-skeleton__thumb">
              <Skeleton width="100%" height="100%" borderRadius="0.25rem" />
            </div>
            <div className="product-detail-skeleton__thumb">
              <Skeleton width="100%" height="100%" borderRadius="0.25rem" />
            </div>
            <div className="product-detail-skeleton__thumb">
              <Skeleton width="100%" height="100%" borderRadius="0.25rem" />
            </div>
          </div>
        </div>
        <div className="product-detail-skeleton__info">
          <Skeleton width="60%" height={38} borderRadius="0" />
          <Skeleton width="100%" height={16} borderRadius="0" />
          <Skeleton width="100%" height={16} borderRadius="0" />
          <Skeleton width="40%" height={24} borderRadius="0" />
          <div style={{ margin: '1.5rem 0' }}>
            <Skeleton width="80px" height={16} borderRadius="0" />
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
              <Skeleton width="40px" height={36} borderRadius="0" />
              <Skeleton width="40px" height={36} borderRadius="0" />
              <Skeleton width="40px" height={36} borderRadius="0" />
              <Skeleton width="40px" height={36} borderRadius="0" />
              <Skeleton width="40px" height={36} borderRadius="0" />
              <Skeleton width="120px" height={36} borderRadius="0" />
            </div>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <Skeleton width="80px" height={16} borderRadius="0" />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
              <Skeleton width="40px" height={40} borderRadius="0" />
              <Skeleton width="60px" height={20} borderRadius="0" />
              <Skeleton width="40px" height={40} borderRadius="0" />
            </div>
          </div>
          <Skeleton width="200px" height={78} borderRadius="0.5rem" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
