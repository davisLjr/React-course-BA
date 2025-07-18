import React, { useState } from 'react';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../Button/Button';
import { useTheme } from '../../context/ThemeContext';
import { useProduct } from '../../hooks/useProduct';
import './productDetail.scss';
import { Text } from '../Text/Text';
import ProductDetailSkeleton from './skeleton/ProductDetailSkeleton';
import LoginModal from '../Modal/LoginModal';
import type { Product as ServiceProduct } from '../../services/productsService';
import { motion, AnimatePresence } from 'framer-motion';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error } = useProduct(id);
  const { addToCart } = useCart();
  const { theme } = useTheme();
  const { user } = useAuth();
  const [mainImage, setMainImage] = useState<string>();
  const [showLogin, setShowLogin] = useState(false);

  const handleAdd = () => {
    if (!product) return;
    if (!user) {
      setShowLogin(true);
      return;
    }
    const pService: ServiceProduct = {
      id: Number(product.id),
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.images[0] ?? '',
      rating: { rate: 0, count: 0 }
    };
    try {
      addToCart(pService);
      toast.success(
        <>
          <Text className="toast__title">Producto añadido al carrito.</Text>
          <Text className="toast__subtitle">
            Puedes verlo en la sección Carrito
          </Text>
        </>
      );
    } catch {
      toast.error('No se pudo añadir al carrito');
    }
  };

  if (loading) return <ProductDetailSkeleton />;
  if (error || !product) {
    return <p className="product-detail__error">Error: {error ?? 'No encontrado'}</p>;
  }

  const images = product.images;
  const current = mainImage || images[0];

  return (
    <>
      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />

      <motion.div
        className={`product-detail product-detail--${theme}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="product-detail__container">
          <div className="product-detail__gallery">
            <AnimatePresence mode="wait">
              <motion.img
                key={current}
                src={current}
                alt={product.title}
                className="product-detail__main-image"
                loading="lazy"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>

            <div className="product-detail__thumbs">
              {images.map((src, idx) => (
                <motion.img
                  key={idx}
                  src={src}
                  alt={`${product.title} (${idx + 1})`}
                  className={`product-detail__thumb ${src === current ? 'active' : ''}`}
                  onClick={() => setMainImage(src)}
                  loading="lazy"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                />
              ))}
            </div>
          </div>

          <motion.div
            className="product-detail__info"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="product-detail__title">{product.title}</h1>
            <p className="product-detail__description">{product.description}</p>
            <div className="product-detail__price">
              {new Intl.NumberFormat('es-AR', {
                style: 'currency',
                currency: 'ARS'
              }).format(product.price)}
            </div>
            <Button
              onClick={handleAdd}
              color="secondary"
              outline={theme === 'light'}
              theme={theme}
              className="product-detail__button"
            >
              {user ? 'Añadir al carrito' : 'Inicia sesión para añadir'}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default ProductDetail;
