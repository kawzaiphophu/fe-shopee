import React from 'react';
import './App.css';
import Shopee from './page/Shopee';
import ShopeeDetail from './page/ShopeeDetail';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';

const App: React.FC = () => {

  return (
    <>
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Shopee />} />
          <Route path="/product/:id" element={<ShopeeDetail />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}


export default App;

