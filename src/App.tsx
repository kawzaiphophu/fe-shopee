import React, {useState } from 'react';
import './App.css';
import Shopee from './page/Shopee';
import ShopeeDetail from './page/ShopeeDetail';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const App: React.FC = () => {
  interface CartItem {
    id: string;
  }
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart([...cart, item]);
  };

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
