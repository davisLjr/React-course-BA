import React, { createContext, useContext, useState, useMemo } from 'react';
import type { LegacyProduct as Product, CartItem } from '../types/product';

interface CartContextValue {
  items: CartItem[];
  addToCart: (product: Product, size: string, quantity?: number) => void;
  removeFromCart: (index: number) => void;
  getTotalPrice: () => number;
  getWhatsAppMessage: () => string;
}

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, size: string, quantity: number = 1) => {
    const existingItemIndex = items.findIndex(
      item => item.id === product.id && item.size === size
    );
    
    if (existingItemIndex >= 0) {
      setItems(prev => {
        const updated = [...prev];
        updated[existingItemIndex].quantity += quantity;
        return updated;
      });
    } else {
      const cartItem: CartItem = {
        ...product,
        size,
        quantity
      };
      setItems(prev => [...prev, cartItem]);
    }
  };

  const removeFromCart = (index: number) => {
    setItems(prev => {
      const next = [...prev];
      next.splice(index, 1);
      return next;
    });
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getWhatsAppMessage = () => {
    const itemsList = items.map(item => 
      `• ${item.title} - Talla: ${item.size} - Cantidad: ${item.quantity} - $${(item.price * item.quantity).toLocaleString('es-AR')}`
    ).join('\n');
    
    const total = getTotalPrice();
    
    return `🎉 *¡Hola! Quiero hacer un pedido de piñatas personalizadas* 🎉\n\n` +
           `📋 *Detalles del pedido:*\n${itemsList}\n\n` +
           `💰 *Total: $${total.toLocaleString('es-AR')}*\n\n` +
           `¿Podrían confirmar la disponibilidad y tiempo de entrega? ¡Gracias! 😊`;
  };

  const value = useMemo(
    () => ({ items, addToCart, removeFromCart, getTotalPrice, getWhatsAppMessage }),
    [items]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>');
  return ctx;
};
