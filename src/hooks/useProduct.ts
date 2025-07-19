import { useState, useEffect } from "react";
import {
  doc,
  getDoc,
  type DocumentData,
  type DocumentSnapshot
} from "firebase/firestore";
import { db } from "../../firebase";

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const fetch = async () => {
      if (!id) {
        setError("ID inválido");
        setLoading(false);
        return;
      }

      try {
        const snap: DocumentSnapshot<DocumentData> = await getDoc(doc(db, "products", id));

        if (!active) return;

        if (!snap.exists()) {
          setError("No encontrado");
          setLoading(false);
          return;
        }

        const data = snap.data() as Omit<ProductDetail, "id">;
        setProduct({ id: snap.id, ...data });
        setLoading(false);
      } catch (err: unknown) {
        if (!active) return;

        if (err instanceof Error) {
          console.error(err);
          setError(err.message);
        } else {
          console.error("Unknown error", err);
          setError("Error desconocido");
        }
        setLoading(false);
      }
    };

    fetch();

    return () => {
      active = false;
    };
  }, [id]);

  return { product, loading, error };
}
