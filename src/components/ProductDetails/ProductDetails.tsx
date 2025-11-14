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
import type { LegacyProduct as ServiceProduct } from '../../types/product';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error } = useProduct(id);
  const { addToCart } = useCart();
  const { theme } = useTheme();
  const { user } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(1); // Default to M (index 1)
  const [customSize, setCustomSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  const selectedSize = product?.sizes[selectedSizeIndex];
  const selectedPrice = selectedSize?.price || 0;

  const handleAdd = () => {
    if (!product || !selectedSize) return;
    if (!user) {
      setShowLogin(true);
      return;
    }
    
    const finalSize = selectedSize.name === 'Personalizado' ? customSize : selectedSize.name;
    if (selectedSize.name === 'Personalizado' && !customSize.trim()) {
      toast.error('Por favor especifica el tamaño personalizado');
      return;
    }
    
    const pService: ServiceProduct = {
      id: Number(product.id),
      title: product.title,
      description: product.description,
      price: selectedSize.price,
      category: product.category,
      image: product.images[0] ?? '',
      rating: { rate: 0, count: 0 }
    };
    try {
      addToCart(pService, finalSize, quantity);
      toast.success(
        <div aria-live="polite">
          <Text className="toast__title">Producto añadido al carrito.</Text>
          <Text className="toast__subtitle">
            Talla {finalSize} - Cantidad: {quantity}
          </Text>
        </div>
      );
    } catch {
      toast.error('No se pudo añadir al carrito');
    }
  };

  if (loading) return <ProductDetailSkeleton />;
  if (error || !product) {
    return <p className="product-detail__error" role="alert">Error: {error ?? 'No encontrado'}</p>;
  }

  const images = product.images;
  const currentImage = images[currentImageIndex] || images[0];
  const visibleThumbnails = images.slice(1, 4);
  const extraImagesCount = Math.max(0, images.length - 4);

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <>
      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />

      <motion.div
        className={`product-detail product-detail--${theme}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        aria-label={`Detalles del producto ${product.title}`}
        role="region"
      >
        <div className="product-detail__container">
          <div className="product-detail__gallery">
            <div className="product-detail__main-image-container">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={currentImage}
                  alt={`Imagen principal del producto ${product.title}`}
                  className="product-detail__main-image"
                  loading="lazy"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
              
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePreviousImage}
                    className="product-detail__nav-btn product-detail__nav-btn--prev"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    className="product-detail__nav-btn product-detail__nav-btn--next"
                    aria-label="Imagen siguiente"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            <div className="product-detail__thumbs">
              <button
                type="button"
                onClick={() => handleThumbnailClick(0)}
                aria-label={`Ver imagen principal de ${product.title}`}
                className="product-detail__thumb-button"
              >
                <motion.img
                  src={images[0]}
                  alt={`Miniatura principal de ${product.title}`}
                  className={`product-detail__thumb ${currentImageIndex === 0 ? 'active' : ''}`}
                  loading="lazy"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                />
              </button>
              
              {visibleThumbnails.map((src, idx) => {
                const actualIndex = idx + 1;
                const isLast = idx === visibleThumbnails.length - 1 && extraImagesCount > 0;
                
                return (
                  <button
                    key={actualIndex}
                    type="button"
                    onClick={() => handleThumbnailClick(actualIndex)}
                    aria-label={`Ver imagen ${actualIndex + 1} de ${product.title}`}
                    className="product-detail__thumb-button"
                  >
                    <motion.img
                      src={src}
                      alt={`Miniatura ${actualIndex + 1} de ${product.title}`}
                      className={`product-detail__thumb ${currentImageIndex === actualIndex ? 'active' : ''}`}
                      loading="lazy"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    />
                    {isLast && (
                      <div className="product-detail__thumb-overlay">
                        +{extraImagesCount}
                      </div>
                    )}
                  </button>
                );
              })}
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
              }).format(selectedPrice)}
            </div>
            
            <div className="product-detail__options">
              <div className="product-detail__size-section">
                <span className="product-detail__label">Talla:</span>
                <div className="product-detail__sizes">
                  {product.sizes.map((size, index) => (
                    <button
                      key={size.name}
                      type="button"
                      className={`product-detail__size-btn ${
                        selectedSizeIndex === index ? 'active' : ''
                      }`}
                      onClick={() => setSelectedSizeIndex(index)}
                      title={`${size.name} - $${size.price.toLocaleString('es-AR')}`}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
                {selectedSize?.name === 'Personalizado' && (
                  <input
                    type="text"
                    className="product-detail__custom-input"
                    placeholder="Especifica el tamaño personalizado"
                    value={customSize}
                    onChange={(e) => setCustomSize(e.target.value)}
                  />
                )}
              </div>
              
              <div className="product-detail__quantity-section">
                <span className="product-detail__label">Cantidad:</span>
                <div className="product-detail__quantity">
                  <button
                    type="button"
                    className="product-detail__qty-btn"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="product-detail__qty-display">{quantity}</span>
                  <button
                    type="button"
                    className="product-detail__qty-btn"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <Button
              onClick={handleAdd}
              color="secondary"
              outline={theme === 'light'}
              theme={theme}
              className="product-detail__button"
              aria-label={user ? 'Añadir producto al carrito' : 'Inicia sesión para añadir al carrito'}
            >
              {user ? `Añadir ${quantity} al carrito` : 'Inicia sesión para añadir'}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default ProductDetail;
