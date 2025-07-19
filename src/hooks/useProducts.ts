import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  type DocumentData,
  type QueryDocumentSnapshot
} from "firebase/firestore";
import { db } from "../../firebase";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const colRef = collection(db, "products");
        const q = category
          ? query(colRef, where("category", "==", category))
          : query(colRef);

        const snapshot = await getDocs(q);
        if (!active) return;

        const lista = snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
          const data = doc.data() as Omit<Product, "id">;
          return { id: doc.id, ...data };
        });

        setProducts(lista);
        setLoading(false);
      } catch (err: unknown) {
        if (!active) return;

        if (err instanceof Error) {
          console.error(err);
          setError(err.message);
        } else {
          console.error("Unknown error", err);
          setError("Error desconocido al obtener productos");
        }
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      active = false;
    };
  }, [category]);

  return { products, loading, error };
}
