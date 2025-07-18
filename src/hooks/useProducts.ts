import { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  onSnapshot,
  type DocumentData,
  type QuerySnapshot
} from 'firebase/firestore';
import { db } from '../../firebase';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
}

export function useProducts(category?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const colRef = collection(db, 'products');
    const q = category ? query(colRef, where('category', '==', category)) : query(colRef);

    const unsub = onSnapshot(
      q,
      (snap: QuerySnapshot<DocumentData>) => {
        const lista = snap.docs.map(doc => {
          const data = doc.data() as Omit<Product, 'id'>;
          return { id: doc.id, ...data };
        });
        setProducts(lista);
        setLoading(false);
      },
      err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [category]);

  return { products, loading, error };
}
