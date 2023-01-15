import React, { useEffect } from "react";
import { Routes, Route } from 'react-router-dom';

import './App.css';

import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Category from "./pages/Category";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";
import Cart from "./components/cart/Cart";

import { cartStore } from "./store/cartStore";
import Checkout from "./components/checkout/Checkout";

function App() {
  useEffect(() => {

    return localStorage.setItem('test', cartStore.Count)
  });

  return (
    <div className="App container">
        <div className="main">
            <Header/>
            <Cart/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Auth component={<Login/>} />}/>
                <Route path="/registration" element={<Auth component={<Registration/>} />}/>
                <Route path="/checkout" element={<Auth component={<Checkout/>} />}/>
                <Route path="/category/:categoryname" element={<Category />} />
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </div>
        <Footer/>
    </div>
  );
}

export default App;
