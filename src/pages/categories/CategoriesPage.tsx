import React, { useRef } from 'react';
import { useCategories } from '../../hooks/useCategories';
import { useTheme } from '../../context/ThemeContext';
import { Text } from '../../components/Text/Text';
import { Banner } from '../../components/Banner/Banner';
import CardCategories from '../../components/CardCategories/CardCategories';
import './categoriesPage.scss';
import CardCategoriesSkeleton from '../../components/CardCategories/skeleton/CardCategoriesSkeleton';

const CategoriesPage: React.FC = () => {
  const { categories, loading: catLoading } = useCategories();
  const { theme } = useTheme();
  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Banner
        title="Categorías"
        imgSrc='https://res.cloudinary.com/djqiqpilh/image/upload/v1752947977/categories_ubydoa.jpg'
        imgAlt="Sección de categorías"
      />

      <div style={{ maxWidth: '1920px', margin: 'auto' }}>
        <div className="text-container">
          <Text
            style={{
              fontSize: '1.45rem',
              fontWeight: 300,
              maxWidth: '1100px',
              fontFamily: '"Libre Franklin", sans-serif',
            }}
            theme={theme}
          >
            Explora nuestras categorías: encuentra productos de calidad en cada sección.
          </Text>
        </div>

        <div className={`categories-page categories-page--${theme}`}>
          <h2 className="categories-page__title">Categorías</h2>

          <div
            ref={carouselRef}
            className="categories-page__carousel hide-scrollbar"
          >
            {catLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <CardCategoriesSkeleton key={i} />
                ))
              : categories.map((cat) => (
                  <CardCategories
                    key={cat}
                    category={cat}
                    to={`/products?category=${encodeURIComponent(cat)}`}
                  />
                ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
