import React from 'react';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Button from '../Button/Button';
import { useTheme } from '../../context/ThemeContext';
import { useProduct } from '../../hooks/useProduct';
import './productDetail.scss';
import { Text } from '../Text/Text';
import ProductDetailSkeleton from './skeleton/ProductDetailSkeleton';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error } = useProduct(id);
  const { addToCart } = useCart();
  const { theme } = useTheme();

  const handleAdd = () => {
    try {
      addToCart(product!);
      toast.success(
        <>
          <Text className="toast__title">
            Producto añadido al carrito.
          </Text>
          <Text className="toast__subtitle">
            Puedes verlo en la sección Carrito
          </Text>
        </>
      );
    } catch {
      toast.error('No se pudo añadir al carrito');
    }
  };

  return (
    <div className={`product-detail product-detail--${theme}`}>
      <div className="product-detail__container">
        {(() => {
          if (loading) {
            return <ProductDetailSkeleton />;
          }
          if (error || !product) {
            return (
              <p className="product-detail__error">
                Error: {error ?? 'No encontrado'}
              </p>
            );
          }
          return (
            <>
              <div className="product-detail__image">
                <img src={product.image} alt={product.title} loading="lazy" width={500} height={600} />
              </div>
              <div className="product-detail__info">
                <h1 className="product-detail__title">{product.title}</h1>
                <p className="product-detail__description">
                  {product.description}
                </p>
                <div className="product-detail__price">
                  USD ${product.price.toFixed(2)}
                </div>
                <Button
                  onClick={handleAdd}
                  color="secondary"
                  outline={theme === 'light'}
                  theme={theme}
                  className="product-detail__button"
                >
                  Añadir al carrito
                </Button>
              </div>
            </>
          );
        })()}
      </div>
    </div>
  );
};

export default ProductDetail;
