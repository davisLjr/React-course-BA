export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const BASE_URL = 'https://fakestoreapi.com';

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error('Error al cargar productos');
  return res.json();
}

export async function fetchProductById(id: number): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error(`Error al cargar producto ${id}`);
  return res.json();
}

export async function fetchCategories(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/products/categories`);
  if (!res.ok) throw new Error('Error al cargar categorías');
  return res.json();
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  const res = await fetch(
    `${BASE_URL}/products/category/${encodeURIComponent(category)}`
  );
  if (!res.ok) throw new Error(`Error al cargar productos de ${category}`);
  return res.json();
}
