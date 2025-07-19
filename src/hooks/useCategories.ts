import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  type DocumentData
} from "firebase/firestore";
import { db } from "../../firebase";

export function useCategories() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const fetch = async () => {
      setLoading(true);
      try {
        const snap = await getDocs(collection(db, "products"));
        if (!active) return;

        const cats = Array.from(
          new Set(snap.docs.map((d) => (d.data() as DocumentData).category as string))
        );
        setCategories(cats);
        setLoading(false);
      } catch (err: unknown) {
        if (!active) return;

        console.error(err);
        setLoading(false);
      }
    };

    fetch();

    return () => {
      active = false;
    };
  }, []);

  return { categories, loading };
}
