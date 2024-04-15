import React, { useState, useEffect } from 'react';
import './App.css';
import Shopee from './page/Shopee';
import ShopeeDetail from './page/ShopeeDetail';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App: React.FC = () => {
  interface CartItem {
    id: string;
  }
  
  // Load cart state from localStorage or default to an empty array
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  const addToCart = (item: CartItem) => {
    setCart([...cart, item]);
  };

  useEffect(() => {
    // Save cart state to localStorage whenever it changes
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <BrowserRouter>
        <Navbar setSearchTerm={setSearchTerm} cart={cart} />
        <Routes>
          <Route path="/" element={<Shopee searchTerm={searchTerm} />} />
          <Route path="/product/:id" element={<ShopeeDetail addToCart={addToCart} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
