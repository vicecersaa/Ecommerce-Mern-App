import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContextProvider } from './UserContext';
import { ProductContextProvider } from './ProductContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
      <ProductContextProvider>
        <UserContextProvider>
          <Router>
            <App />
          </Router>
        </UserContextProvider>
      </ProductContextProvider>
    
  </React.StrictMode>
);


reportWebVitals();
