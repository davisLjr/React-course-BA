import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import App from './App';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import './styles/global.scss';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';

import Home from './pages/home/Home';
import ProductsPage from './pages/productPages/ProductsPage';
import ProductDetailPage from './pages/productDetail/ProductsDetailPage';

import CategoriesPage from './pages/categories/CategoriesPage';
import LocationsPage from './pages/location/Locations';

import { Toaster } from "sonner";
import CartPage from './pages/cart/CartPage';
import ComercialPage from './pages/comercial/Comercial';

const router = createBrowserRouter([
  {
    path: '/',
    element:(
      <ScrollToTop>
        <App />
      </ScrollToTop>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: 'locations', element: <LocationsPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'commercial', element: <ComercialPage /> },
      { path: 'categories', element: <CategoriesPage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'products/:id', element: <ProductDetailPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider initialTheme="light">
      <CartProvider>
        <RouterProvider router={router} />
        <Toaster richColors />
      </CartProvider>
    </ThemeProvider>
  </React.StrictMode>
);
