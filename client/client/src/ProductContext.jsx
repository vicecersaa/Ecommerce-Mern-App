import axios from "axios";
import { API_URL } from "./config";

const { createContext, Children, useState, useEffect } = require("react");

export const ProductContext = createContext({});

export function ProductContextProvider({ children }) {
    
    const [products, setProducts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
  
    useEffect(() => {
      axios.get(`${API_URL}/products`).then(({ data }) => {
        setProducts(data);
      });
    }, []);

    const searchProducts = async (query) => {
      if (!query) {
          setSearchResults([]);
          return;
      }

      try {
          const { data } = await axios.get(`${API_URL}/search`, { params: { query } });
          setSearchResults(data);
      }   catch (error) {
          console.error('Error fetching search results', error);
      }
    }

    const fetchDefaultProducts = async () => {
      try {
          const { data } = await axios.get(`${API_URL}/search`, { params: { query: '' } });
          setSearchResults(data);
      } catch (error) {
          console.error('Error fetching default products', error);
      }
  };
  
    return (
      <ProductContext.Provider value={{ products, setProducts, searchProducts, searchResults, fetchDefaultProducts }}>
        {children}
      </ProductContext.Provider>
    );
  }