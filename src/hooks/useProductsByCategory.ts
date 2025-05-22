import { useState, useEffect } from 'react';
import { fetchProductsByCategory, type Product } from '../services/productsService';

export function useProductsByCategory(category: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchProductsByCategory(category)
      .then(data => {
        if (!cancelled) {
          setProducts(data);
          setError(null);
        }
      })
      .catch(err => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [category]);

  return { products, loading, error };
}
