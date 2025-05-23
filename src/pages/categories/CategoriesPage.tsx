import React, {useRef} from "react";
import {useCategories} from "../../hooks/useCategories";
import {useTheme} from "../../context/ThemeContext";
import {Text} from "../../components/Text/Text";
import {Banner} from "../../components/Banner/Banner";
import CardCategories from "../../components/CardCategories/CardCategories";
import "./categoriesPage.scss";
import CardCategoriesSkeleton from "../../components/CardCategories/skeleton/CardCategoriesSkeleton";

const categoryImages: Record<string, string> = {
  electronics:
    "/categories/elect.webp",
  jewelery: "/categories/jewel.webp",
  "men's clothing":
    "/categories/men.webp",
  "women's clothing":
    "/categories/women.webp",
};

const CategoriesPage: React.FC = () => {
  const {categories, loading, error} = useCategories();
  const {theme} = useTheme();
  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Banner
        title="Categorías"
        imgSrc="/sections/tinified/categories.webp"
        imgAlt="imagen referente a seccion productos"
      />

      <div style={{maxWidth: "1920px", margin: "auto"}}>
        <div className="text-container">
          <Text
            style={{
              fontSize: "1.45rem",
              fontWeight: 300,
              maxWidth: "1100px",
              fontFamily: '"Libre Franklin", sans-serif',
            }}
            theme={theme}
          >
            Lorem Ipsum is simply dummy text Lorem Ipsum is simply dummy text,
            Lorem Ipsum is simply dummy text Lorem Ipsum is simply dummy text
          </Text>
        </div>

        <div className={`categories-page categories-page--${theme}`}>
          <h2 className="categories-page__title">Categorías</h2>
          <div className="categories-page__wrapper">
            {error && <p className="categories-page__error">Error: {error}</p>}
            <div
              ref={carouselRef}
              className="categories-page__carousel hide-scrollbar"
            >
              {loading
                ? Array.from({length: 4}).map((_, i) => (
                    <CardCategoriesSkeleton key={i} />
                  ))
                : categories.map((cat) => (
                    <CardCategories
                      key={cat}
                      category={cat}
                      imageSrc={
                        categoryImages[cat] || categoryImages["electronics"]
                      }
                      to={`/products?category=${encodeURIComponent(cat)}`}
                      theme={theme}
                      
                    />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
