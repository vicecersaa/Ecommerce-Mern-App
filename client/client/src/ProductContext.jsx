import axios from "axios";

const { createContext, Children, useState, useEffect } = require("react");

export const ProductContext = createContext({});

export function ProductContextProvider({ children }) {
    const PORT = 'http://localhost:5000';
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      axios.get(`${PORT}/products`).then(({ data }) => {
        setProducts(data);
      });
    }, []);
  
    return (
      <ProductContext.Provider value={{ products }}>
        {children}
      </ProductContext.Provider>
    );
  }