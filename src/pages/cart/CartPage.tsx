import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

import { ShoppingBag, Trash2, Loader2 } from 'lucide-react';
import './cartPage.scss';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { Text } from '../../components/Text/Text';
import Button from '../../components/Button/Button';
import WhatsAppButton from '../../components/WhatsAppButton/WhatsAppButton';

const CartPage: React.FC = () => {
  const { items, removeFromCart, getTotalPrice, getWhatsAppMessage } = useCart();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  const total = getTotalPrice();

  useEffect(() => {
    // Simular carga inicial
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleRemove = (index: number) => {
    try {
      removeFromCart(index);
      toast('Producto eliminado del carrito');
    } catch {
      toast.error('No se pudo eliminar el producto');
    }
  };

  if (isLoading) {
    return (
      <main className={`cart-page cart-page--${theme}`}>
        <div className="cart-page__container">
          <div className="cart-page__loading">
            <Loader2 size={48} className="loading-spinner" />
            <Text as="h2" className="loading-text" theme={theme}>
              Cargando...
            </Text>
          </div>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className={`cart-page cart-page--${theme}`}>
        <div className="cart-page__container">
          <div className="cart-page__empty-state">
            <div className="empty-state__icon">
              <ShoppingBag size={64} />
            </div>
            <Text as="h2" className="empty-state__title" theme={theme}>
              Tu carrito está vacío
            </Text>
            <Text className="empty-state__description" theme={theme}>
              Añade algunos productos increíbles a tu carrito y regresa aquí para finalizar tu pedido.
            </Text>
            <Button
              isLink
              to="/products"
              color="primary"
              theme={theme}
              className="empty-state__button"
            >
              Explorar Productos
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={`cart-page cart-page--${theme}`}>
      <div className="cart-page__container">
        <div className="cart-page__header">
          <Text as="h1" className="cart-page__title" theme={theme}>
            Tu Carrito
          </Text>
          <Text className="cart-page__subtitle" theme={theme}>
            {items.length} {items.length === 1 ? 'producto' : 'productos'} en tu carrito
          </Text>
        </div>

        <div className="cart-page__content">
          <div className="cart-page__items">
            {items.map((p, i) => (
              <div key={i} className="cart-item">
                <div className="cart-item__image-wrapper">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="cart-item__image"
                    loading="lazy"
                  />
                </div>
                <div className="cart-item__details">
                  <Text as="h3" className="cart-item__title" theme={theme}>
                    {p.title}
                  </Text>
                  <div className="cart-item__specs">
                    <Text className="cart-item__spec" theme={theme}>
                      <span className="spec-label">Talla:</span> {p.size}
                    </Text>
                    <Text className="cart-item__spec" theme={theme}>
                      <span className="spec-label">Cantidad:</span> {p.quantity}
                    </Text>
                  </div>
                  <Text className="cart-item__price" theme={theme}>
                    {new Intl.NumberFormat('es-AR', {
                      style: 'currency',
                      currency: 'ARS'
                    }).format(p.price * p.quantity)}
                  </Text>
                </div>
                <Button
                  onClick={() => handleRemove(i)}
                  theme={theme}
                  color="base"
                  outline
                  aria-label="Eliminar producto"
                  className="cart-item__remove"
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            ))}
          </div>

          <div className="cart-page__summary">
            <div className="cart-summary">
              <div className="cart-summary__header">
                <Text as="h3" className="cart-summary__title" theme={theme}>
                  Resumen del Pedido
                </Text>
              </div>
              
              <div className="cart-summary__details">
                <div className="summary-row">
                  <Text className="summary-label" theme={theme}>Productos</Text>
                  <Text className="summary-value" theme={theme}>{items.length}</Text>
                </div>
                <div className="summary-row">
                  <Text className="summary-label" theme={theme}>Subtotal</Text>
                  <Text className="summary-value" theme={theme}>
                    {new Intl.NumberFormat('es-AR', {
                      style: 'currency',
                      currency: 'ARS'
                    }).format(total)}
                  </Text>
                </div>
                <div className="summary-row summary-row--total">
                  <Text className="summary-label" theme={theme}>Total</Text>
                  <Text className="summary-value summary-value--total" theme={theme}>
                    {new Intl.NumberFormat('es-AR', {
                      style: 'currency',
                      currency: 'ARS'
                    }).format(total)}
                  </Text>
                </div>
              </div>

              <div className="cart-summary__actions">
                <WhatsAppButton 
                  message={getWhatsAppMessage()}
                  className="cart-summary__whatsapp"
                >
                  Enviar Pedido por WhatsApp
                </WhatsAppButton>
                
                <Text className="cart-summary__note" theme={theme}>
                  Al hacer clic, se abrirá WhatsApp con los detalles de tu pedido.
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
