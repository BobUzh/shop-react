import React from "react";
import { Routes, Route } from 'react-router-dom';

import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Auth from "./pages/Auth";

import './App.css';

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";

function App() {
  return (
    <div className="App container">
        <div className="main">
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Auth component={<Login/>} />}/>
                <Route path="/registration" element={<Auth component={<Registration/>} />}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </div>
        <Footer/>
    </div>
  );
}

export default App;
