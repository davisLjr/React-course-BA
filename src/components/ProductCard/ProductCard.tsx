import React, { useMemo, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";
import { Text } from "../Text/Text";
import { ShoppingCart } from "lucide-react";
import type { Product as FirestoreProduct } from "../../hooks/useProducts";
import { useNavigate } from "react-router-dom";
import "./productCard.scss";

export interface ProductCardProps {
  product: FirestoreProduct;
  onLoginRequest?: () => void;
  disableNavigation?: boolean;
  showAddToCart?: boolean;
  overrideRedirect?: string;
}

const ProductCardComponent: React.FC<ProductCardProps> = ({
  product,
  onLoginRequest,
  disableNavigation = false,
  showAddToCart = true,
  overrideRedirect,
}) => {
  const { theme } = useTheme();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  const thumbnail = useMemo(
    () => product.images?.[0] ?? "/fallback.png",
    [product.images]
  );

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!user) {
      toast.error("Inicia sesión para añadir al carrito");
      onLoginRequest?.();
      return;
    }
    try {
      const defaultSize = product.sizes?.[0] || { name: 'S', price: 0 };
      addToCart({
        id: typeof product.id === "string" ? parseInt(product.id, 10) : product.id,
        title: product.title,
        description: product.description,
        price: defaultSize.price,
        category: product.category,
        image: thumbnail,
        rating: { rate: 0, count: 0 },
      }, defaultSize.name, 1);
      toast.success("Producto añadido al carrito");
    } catch {
      toast.error("No se pudo añadir al carrito");
    }
  };

  const handleNavigate = () => {
    if (!disableNavigation) {
      navigate(overrideRedirect || `/products/${product.id}`);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={`futuristic-card futuristic-card--${theme}`}
      onClick={handleNavigate}
      onKeyDown={(e) => e.key === "Enter" && handleNavigate()}
      aria-label={`Ver producto ${product.title}`}
    >
      <img
        src={thumbnail}
        alt={product.title}
        className={`futuristic-card__image ${loaded ? "loaded" : "loading"}`}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        width={300}
        height={200}
        onLoad={() => setLoaded(true)}
      />
      <div className="futuristic-card__category-top">
        <Text as="p" className="futuristic-card__category" themeInverted>
          {product.category}
        </Text>
      </div>
      <div className="futuristic-card__overlay">
        <Text as="h3" className="futuristic-card__title" themeInverted>
          {product.title}
        </Text>
        <Text as="p" className="futuristic-card__description" themeInverted>
          {product.description}
        </Text>

        {showAddToCart && (
          <button
            className="futuristic-card__button"
            onClick={handleAdd}
            type="button"
            aria-label={user ? "Añadir al carrito" : "Iniciar sesión para añadir al carrito"}
          >
            <ShoppingCart size={16} />
            <span aria-hidden="true">
              {user ? "Añadir al carrito" : "Inicia sesión"}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default React.memo(ProductCardComponent);
