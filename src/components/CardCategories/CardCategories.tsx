import React from 'react';
import { Link } from 'react-router-dom';
import { Text } from '../Text/Text';
import type { CardCategoriesProps } from './types';
import './CardCategories.scss';

const CardCategories: React.FC<CardCategoriesProps> = ({
  category,
  imageSrc,
  to,
  theme,
  className = ''
}) => {
  return (
    <Link to={to} className={`card-categories card-categories--${theme} ${className}`}>
      <div className="card-categories__content">
        <img
          className="card-categories__image"
          src={imageSrc}
          alt={`categoria ${category}`}
          width={340}
          height={350}
          loading="lazy"
        />
        <div className="card-categories__label">
          <Text as="p" theme={theme} className="card-categories__text">
            {category}
          </Text>
        </div>
      </div>
    </Link>
  );
};

export default CardCategories;
