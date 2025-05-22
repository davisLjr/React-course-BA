import React from 'react';
import { toast } from 'sonner';

import { X } from 'lucide-react';
import './cartPage.scss';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { Text } from '../../components/Text/Text';
import Button from '../../components/Button/Button';

const CartPage: React.FC = () => {
  const { items, removeFromCart } = useCart();
  const { theme } = useTheme();

  const total = items.reduce((sum, p) => sum + p.price, 0);

  const handleRemove = (index: number) => {
    try {
      removeFromCart(index);
      toast('Producto eliminado del carrito');
    } catch {
      toast.error('No se pudo eliminar el producto');
    }
  };

  if (items.length === 0) {
    return (
      <main className={`cart-page cart-page--${theme}`}>
        <Text as="h2" className="cart-page__empty" theme={theme}>
          Tu carrito está vacío
        </Text>
      </main>
    );
  }

  return (
    <main className={`cart-page cart-page--${theme}`}>
      <Text as="h1" className="cart-page__title" theme={theme}>
        Tu Carrito
      </Text>

      <ul className="cart-list">
        {items.map((p, i) => (
          <li key={i} className="cart-list__item">
            <img
              src={p.image}
              alt={p.title}
              className="cart-list__image"
              loading="lazy"
              width={64}
              height={64}
            />
            <div className="cart-list__info">
              <Text as="p" className="cart-list__name" theme={theme}>
                {p.title}
              </Text>
              <Text as="p" className="cart-list__price" theme={theme}>
                ${p.price.toFixed(2)}
              </Text>
            </div>
            <Button
              onClick={() => handleRemove(i)}
              theme={theme}
              color="base"
              size="large"
              outline
              aria-label="Eliminar"
              className="cart-list__remove"
            ><X size={20} /></Button>
          </li>
        ))}
      </ul>

      <Text as="p" className="cart-page__total" theme={theme}>
        Total: ${total.toFixed(2)}
      </Text>
    </main>
  );
};

export default CartPage;
