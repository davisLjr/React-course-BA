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

  const { categories, loading: catLoading } = useCategories();
  const { products: allProducts, loading: prodLoading, error: prodError } = useProducts(filter);

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

  const filtered = useMemo(() => {
    return allProducts.filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allProducts, searchTerm]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const currentPageProducts = useMemo(() => {
    return filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  }, [filtered, page]);

  const shouldShowSkeleton = !loadedPages.has(page) && !prodLoading;

  // Precarga imágenes de la siguiente página
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
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={page === i + 1 ? "active" : ""}
                  onClick={() => setPage(i + 1)}
                  aria-current={page === i + 1 ? "page" : undefined}
                >
                  {i + 1}
                </button>
              ))}
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
