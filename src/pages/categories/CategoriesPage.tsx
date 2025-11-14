import React, {useRef, useState, useEffect, useCallback} from "react";
import {useCategories} from "../../hooks/useCategories";
import {useTheme} from "../../context/ThemeContext";
import {Text} from "../../components/Text/Text";
import {Banner} from "../../components/Banner/Banner";
import CardCategories from "../../components/CardCategories/CardCategories";
import "./categoriesPage.scss";
import CardCategoriesSkeleton from "../../components/CardCategories/skeleton/CardCategoriesSkeleton";
import {ChevronLeft, ChevronRight} from "lucide-react";

const CategoriesPage: React.FC = () => {
  const {categories, loading: catLoading} = useCategories();
  const {theme} = useTheme();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [infiniteCategories, setInfiniteCategories] = useState<string[]>([]);

  // Create infinite loop by triplicating the categories
  useEffect(() => {
    if (categories.length > 0) {
      const tripled = [...categories, ...categories, ...categories];
      setInfiniteCategories(tripled);
      // Start at the middle set to allow scrolling in both directions
      setCurrentIndex(categories.length);
    }
  }, [categories]);

  const cardWidth = 375; // Width + gap
  const totalCards = infiniteCategories.length;
  const originalCount = categories.length;

  const scrollToIndex = useCallback((index: number, smooth: boolean = true) => {
    if (carouselRef.current && infiniteCategories.length > 0) {
      const scrollLeft = index * cardWidth;
      carouselRef.current.scrollTo({
        left: scrollLeft,
        behavior: smooth ? 'smooth' : 'auto'
      });
      setCurrentIndex(index);
    }
  }, [infiniteCategories.length, cardWidth]);

  const handleInfiniteScroll = useCallback(() => {
    if (!carouselRef.current || originalCount === 0) return;
    
    const scrollLeft = carouselRef.current.scrollLeft;
    const index = Math.round(scrollLeft / cardWidth);
    
    // Reset position when reaching boundaries for infinite effect
    if (index <= 0) {
      // Jumped to end of first set, move to end of second set
      const newIndex = originalCount + index;
      setTimeout(() => scrollToIndex(newIndex, false), 50);
    } else if (index >= totalCards - originalCount) {
      // Jumped to start of third set, move to start of second set
      const newIndex = originalCount + (index - (totalCards - originalCount));
      setTimeout(() => scrollToIndex(newIndex, false), 50);
    }
  }, [originalCount, totalCards, cardWidth, scrollToIndex]);

  const scrollLeft = () => {
    const newIndex = currentIndex - 1;
    scrollToIndex(newIndex);
    setTimeout(handleInfiniteScroll, 300);
  };

  const scrollRight = () => {
    const newIndex = currentIndex + 1;
    scrollToIndex(newIndex);
    setTimeout(handleInfiniteScroll, 300);
  };


  // Initialize scroll position
  useEffect(() => {
    if (infiniteCategories.length > 0 && carouselRef.current) {
      scrollToIndex(originalCount, false);
    }
  }, [infiniteCategories, originalCount, scrollToIndex]);

  return (
    <>
      <Banner
        title="Categorías"
        imgSrc="https://res.cloudinary.com/dqqnxoj15/image/upload/v1757527036/pexels-leeloothefirst-5715251_1_zb65e4.jpg"
        imgAlt="Sección de categorías"
      />

      <div style={{maxWidth: "1920px", margin: "auto"}}>
        <div className="text-container">
          <Text
            style={{
              fontSize: "1.45rem",
              fontWeight: 300,
              maxWidth: "1100px",
              fontFamily: '"Libre Franklin", sans-serif',
              margin: 0
            }}
            theme={theme}
          >
            En Magia en Papel organizamos nuestras piñatas en categorías para
            que encuentres rápido la ideal. Explora la sección de Chicas, con
            diseños tiernos de princesas, unicornios y colores mágicos. Descubre
            la categoría de Chicos, llena de héroes, aventuras y personajes
            favoritos. Si buscas algo que guste a todos, la sección Unisex
            ofrece opciones divertidas y coloridas. La categoría de Fantasía te
            transporta a mundos mágicos con dragones, hadas y castillos. Cada
            categoría está pensada para que tu fiesta tenga un toque único y
            especial.
          </Text>
        </div>

        <div className={`categories-page categories-page--${theme}`}>
          <h2 className="categories-page__title">Categorías</h2>

          <div className="categories-page__controls">
            <button onClick={scrollLeft} className="categories-page__btn">
              <ChevronLeft size={20} />
            </button>
            <button onClick={scrollRight} className="categories-page__btn">
              <ChevronRight size={20} />
            </button>
          </div>

          <div
            ref={carouselRef}
            className="categories-page__carousel hide-scrollbar"
          >
            {catLoading
              ? Array.from({length: 5}).map((_, i) => (
                  <CardCategoriesSkeleton key={i} />
                ))
              : infiniteCategories.map((cat, index) => (
                  <CardCategories
                    key={`${cat}-${Math.floor(index / categories.length)}-${index % categories.length}`}
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
