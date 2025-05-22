import { useState, useEffect } from 'react';
import { fetchProducts, type Product } from '../services/productsService';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchProducts()
      .then(data => {
        if (!cancelled) {
          setProducts(data);
          setError(null);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err.message ?? 'Error al cargar productos');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return { products, loading, error };
}