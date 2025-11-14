export interface ProductSize {
  name: string;
  price: number;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  images: string[];
  sizes: ProductSize[];
}

export interface LegacyProduct {
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

export interface CartItem extends LegacyProduct {
  size: string;
  quantity: number;
}