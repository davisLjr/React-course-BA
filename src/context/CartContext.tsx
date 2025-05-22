import React, { createContext, useContext, useState, useMemo } from 'react';
import type { Product } from '../services/productsService';

interface CartContextValue {
  items: Product[];
  addToCart: (p: Product) => void;
  removeFromCart: (index: number) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Product[]>([]);

  const addToCart = (p: Product) => {
    setItems(prev => [...prev, p]);
  };

  const removeFromCart = (index: number) => {
    setItems(prev => {
      const next = [...prev];
      next.splice(index, 1);
      return next;
    });
  };

  const value = useMemo(
    () => ({ items, addToCart, removeFromCart }),
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
