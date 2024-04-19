import React, { useState, useEffect } from 'react';
import './App.css';
import Shopee from './page/Shopee';
import ShopeeDetail from './page/ShopeeDetail';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useCookies } from 'react-cookie';

const App: React.FC = () => {
  interface CartItem {
    id: string;
  }

  const [cookies, setCookie, removeCookie] = useCookies(['cart']);
  const [cart, setCart] = useState<CartItem[]>(cookies.cart || []);

  const addToCart = (item: CartItem) => {
    setCart([...cart, item]);
    setCookie('cart', JSON.stringify([...cart, item]), { path: '/' });
  };

  const clearCart = () => {
    setCart([]); 
    removeCookie('cart'); 
  };
  const removeItem = (indexToRemove: number) => {
    const updatedCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(updatedCart);
    setCookie('cart', JSON.stringify(updatedCart), { path: '/' });
};

  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  return (
    <BrowserRouter>
      <Navbar setSearchTerm={setSearchTerm} cart={cart} clearCart={clearCart} removeItem={removeItem}/> 
      <Routes>
        <Route path="/" element={<Shopee searchTerm={searchTerm} />} />
        <Route path="/product/:id" element={<ShopeeDetail addToCart={addToCart} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
