import { useState, useEffect } from 'react';
import { fetchProductById, type Product } from '../services/productsService';

export function useProduct(id?: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError('ID de producto no proporcionado');
      return;
    }
    let cancelled = false;
    setLoading(true);
    fetchProductById(Number(id))
      .then(data => {
        if (!cancelled) {
          setProduct(data);
          setError(null);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err.message || 'Error al cargar producto');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [id]);

  return { product, loading, error };
}