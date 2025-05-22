import React from "react";
import {Link, useSearchParams} from "react-router-dom";
import {toast} from "sonner";
import {useProducts} from "../../hooks/useProducts";
import {useProductsByCategory} from "../../hooks/useProductsByCategory";
import {useCategories} from "../../hooks/useCategories";
import {useCart} from "../../context/CartContext";
import ProductCard from "../ProductCard/ProductCard";
import "./productList.scss";
import Button from "../Button/Button";
import {useTheme} from "../../context/ThemeContext";
import {ChevronDown} from "lucide-react";
import type {Product} from "../../services/productsService";
import {Text} from "../Text/Text";
import ProductSkeleton from "./skeleton/ProductSkeleton";

export const ProductList: React.FC = () => {
  const {theme} = useTheme();
  const {addToCart} = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  const filter = searchParams.get("category") ?? "";

  const {categories} = useCategories();
  const allHook = useProducts();
  const catHook = useProductsByCategory(filter);
  const {
    products,
    loading: prodLoading,
    error: prodError,
  } = filter ? catHook : allHook;

  const handleAdd = (p: Product) => {
    try {
      addToCart(p);
      toast.success(
        <>
          <Text className="toast__title">Producto añadido al carrito.</Text>
          <Text className="toast__subtitle">
            Puedes verlos en la sección Carrito
          </Text>
        </>
      );
    } catch {
      toast.error("No se pudo añadir al carrito");
    }
  };

  return (
    <>
      <div className={`product-list__filter product-list__filter--${theme}`}>
        <label className="product-list__filter__label">
          Categoría:{" "}
          <div className="product-list__filter__select-wrapper">
            <select
              className="product-list__filter__select"
              value={filter}
              onChange={(e) => {
                const cat = e.target.value;
                if (cat) setSearchParams({category: cat});
                else setSearchParams({});
              }}
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

      {prodError && <p>Error productos: {prodError}</p>}

      <div className="product-list">
        {prodLoading
          ? Array.from({length: 8}).map((_, i) => (
              <div key={i} className="product-list__item product-list__item">
                <ProductSkeleton />
              </div>
            ))
          : products.map((p) => (
              <div
                key={p.id}
                className={`product-list__item product-list__item--${theme}`}
              >
                <Link
                  to={`/products/${p.id}`}
                  className="product-list__link"
                  aria-label={`Ver detalles de ${p.title}`}
                >
                  <ProductCard product={p} />
                </Link>
                <Button
                  onClick={() => handleAdd(p)}
                  color="secondary"
                  size="large"
                  outline
                  theme={theme}
                  fullWidth
                  className="button-custom"
                >
                  Añadir al carrito
                </Button>
              </div>
            ))}
      </div>
    </>
  );
};
