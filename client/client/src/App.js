import './App.css';
import axios from 'axios';
import {Routes, Route, Router } from 'react-router-dom';
import Home from './pages/home.jsx';
import RegisterPage from './pages/registerPage.jsx';
import LoginPage from './pages/loginPage.jsx';
import AccountPage from './pages/accountPage.jsx';
import { UserContextProvider } from './UserContext.jsx';
import { useEffect } from 'react';
import { ProductContextProvider } from './ProductContext.jsx';
import ProdukCard from './properties/produkCard.jsx';
import React from 'react';
import ProdukDetail from './pages/produkDetail.jsx';

axios.defaults.baseUrl = 'http://localhost:5000'
axios.defaults.withCredentials = true;

function App() {

  return (
          <Routes>
            <Route index element={<Home />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/account' element={<AccountPage />} />
            <Route path='/products/:id' element={<ProdukDetail />}/>
          </Routes>
  );
}

export default App;
