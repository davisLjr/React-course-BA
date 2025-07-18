import { useState, useEffect } from 'react';
import {
  doc,
  onSnapshot,
  type DocumentData,
  type DocumentSnapshot
} from 'firebase/firestore';
import { db } from '../../firebase';

export interface ProductDetail {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
}

export function useProduct(id?: string) {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('ID inválido');
      setLoading(false);
      return;
    }
    setLoading(true);

    const ref = doc(db, 'products', id);
    const unsub = onSnapshot(
      ref,
      (snap: DocumentSnapshot<DocumentData>) => {
        if (!snap.exists()) {
          setError('No encontrado');
          setLoading(false);
          return;
        }
        const data = snap.data() as Omit<ProductDetail, 'id'>;
        setProduct({ id: snap.id, ...data });
        setLoading(false);
      },
      err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [id]);

  return { product, loading, error };
}
