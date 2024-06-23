import './App.css';
import axios from 'axios';
import {Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx';
import RegisterPage from './pages/registerPage.jsx';
import LoginPage from './pages/loginPage.jsx';

axios.defaults.baseUrl = 'http://localhost:5000'

function App() {
  return (

      <Routes>
        <Route index element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
  
  );
}

export default App;
