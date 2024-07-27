import axios from "axios";

const { createContext, Children, useState, useEffect } = require("react");

export const ProductContext = createContext({});

export function ProductContextProvider({ children }) {
    const PORT = 'http://localhost:5000';
    const [products, setProducts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
  
    useEffect(() => {
      axios.get(`${PORT}/products`).then(({ data }) => {
        setProducts(data);
      });
    }, []);

    const searchProducts = async (query) => {
      if (!query) {
          setSearchResults([]);
          return;
      }

      try {
          const { data } = await axios.get(`${PORT}/search`, { params: { query } });
          setSearchResults(data);
      }   catch (error) {
          console.error('Error fetching search results', error);
      }
    }

    const fetchDefaultProducts = async () => {
      try {
          const { data } = await axios.get(`${PORT}/search`, { params: { query: '' } });
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