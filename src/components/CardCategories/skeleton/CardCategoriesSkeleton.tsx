import React from 'react';
import Skeleton from '../../Skeleton/Skeleton';
import './CardCategoriesSkeleton.scss';

const CardCategoriesSkeleton: React.FC = () => (
  <div className="card-categories-skeleton">
    <Skeleton width="100%" height={350} />
    <div className="card-categories-skeleton__label">
      <Skeleton width="50%" height={24} />
    </div>
  </div>
);

export default CardCategoriesSkeleton;
