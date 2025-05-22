import { useState, useEffect } from 'react';
import { fetchCategories } from '../services/productsService';

export function useCategories() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading]       = useState<boolean>(true);
  const [error, setError]           = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchCategories()
      .then(data => {
        if (!cancelled) setCategories(data);
      })
      .catch(err => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return { categories, loading, error };
}
