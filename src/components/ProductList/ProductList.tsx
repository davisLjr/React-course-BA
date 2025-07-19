import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";
import { useTheme } from "../../context/ThemeContext";
import ProductCard from "../ProductCard/ProductCard";
import SearchInput from "../Inputs/SearchInput";
import "./productList.scss";
import { ChevronDown } from "lucide-react";
import ProductSkeleton from "./skeleton/ProductSkeleton";
import LoginModal from "../Modal/LoginModal";

const ITEMS_PER_PAGE = 8;

export const ProductList: React.FC = () => {
  const { theme } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("category") ?? undefined;

  const [searchTerm, setSearchTerm] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [page, setPage] = useState(1);
  const [loadedPages, setLoadedPages] = useState<Set<number>>(new Set());
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const { categories, loading: catLoading } = useCategories();
  const { products: allProducts, loading: prodLoading, error: prodError } = useProducts(filter);

  const filtered = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return allProducts.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
    );
  }, [allProducts, searchTerm]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const currentPageProducts = useMemo(() => {
    return filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  }, [filtered, page]);

  const shouldShowSkeleton = !loadedPages.has(page) && !prodLoading;

  useEffect(() => {
    setSearchTerm("");
    setPage(1);
    setLoadedPages(new Set());
  }, [filter]);

  useEffect(() => {
    setLoadedPages((prev) => {
      if (prev.has(page)) return prev;
      const next = new Set(prev);
      next.add(page);
      return next;
    });
  }, [page]);

  useEffect(() => {
    if (!prodLoading && !loadedPages.has(page)) {
      setLoadedPages((prev) => {
        const next = new Set(prev);
        next.add(page);
        return next;
      });
    }
  }, [prodLoading, page, loadedPages]);

  useEffect(() => {
    const nextPage = page + 1;
    const nextProducts = filtered.slice(
      (nextPage - 1) * ITEMS_PER_PAGE,
      nextPage * ITEMS_PER_PAGE
    );
    nextProducts.forEach((p) => {
      const url = p.images?.[0];
      if (url) {
        const img = new Image();
        img.src = url;
      }
    });
  }, [page, filtered]);

  useEffect(() => {
    const checkScreen = () => {
      setIsSmallScreen(window.innerWidth < 360);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setSearchParams({});
    }
  }, [searchTerm]);

  const getPaginationRange = (
    current: number,
    total: number,
    delta = 2
  ): (number | string)[] => {
    const range: (number | string)[] = [];
    const left = Math.max(2, current - delta);
    const right = Math.min(total - 1, current + delta);

    range.push(1);

    if (left > 2) range.push("...");

    for (let i = left; i <= right; i++) {
      range.push(i);
    }

    if (right < total - 1) range.push("...");

    if (total > 1) range.push(total);

    return range;
  };

  return (
    <>
      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />

      <div className={`product-list__controls product-list__controls--${theme}`}>
        <SearchInput
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {catLoading ? (
          <p>Cargando categorías…</p>
        ) : (
          <div className="product-list__filter">
            <label htmlFor="category-select">
              Categoría:
              <div className="product-list__filter__select-wrapper">
                <select
                  id="category-select"
                  name="category"
                  className="product-list__filter__select"
                  value={searchTerm ? "" : filter ?? ""}
                  onChange={(e) => {
                    const sel = e.target.value;
                    setSearchParams(sel ? { category: sel } : {});
                  }}
                  disabled={!!searchTerm}
                >
                  <option value="">Todas</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="product-list__filter__icon" />
              </div>
            </label>
          </div>
        )}
      </div>

      {prodError && <p className="error">Error productos: {prodError}</p>}

      {prodLoading || shouldShowSkeleton ? (
        <div className="product-list">
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
            <div key={i} className="product-list__item">
              <ProductSkeleton />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="product-list">
            {currentPageProducts.map((p) => (
              <div key={p.id} className={`product-list__item product-list__item--${theme}`}>
                <ProductCard product={p} onLoginRequest={() => setShowLogin(true)} />
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div
              className="product-list__pagination"
              role="navigation"
              aria-label="Paginación de productos"
            >
              <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                Anterior
              </button>

              {isSmallScreen ? (
                <button className="active">{page}</button>
              ) : (
                getPaginationRange(page, totalPages).map((item, i) =>
                  typeof item === "string" ? (
                    <span key={`dots-${i}`} className="pagination__dots">
                      {item}
                    </span>
                  ) : (
                    <button
                      key={item}
                      className={page === item ? "active" : ""}
                      onClick={() => setPage(item)}
                      aria-current={page === item ? "page" : undefined}
                    >
                      {item}
                    </button>
                  )
                )
              )}

              <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
                Siguiente
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProductList;
