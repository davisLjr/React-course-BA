import { useState, useEffect } from 'react';
import {
  collection,
  onSnapshot,
  type DocumentData
} from 'firebase/firestore';
import { db } from '../../firebase';

export function useCategories() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(
      collection(db, 'products'),
      snap => {
        const cats = Array.from(
          new Set(snap.docs.map(d => (d.data() as DocumentData).category as string))
        );
        setCategories(cats);
        setLoading(false);
      },
      err => {
        console.error(err);
        setLoading(false);
      }
    );
    return () => unsub();
  }, []);

  return { categories, loading };
}
