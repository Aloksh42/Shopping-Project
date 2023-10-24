import axios from "axios";
import { useState, useEffect } from "react";

export const useGetProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const fetchedProducts = await axios("http://localhost:3001/product");

    setProducts(fetchedProducts.data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  
  return {
    products,
    fetchProducts,
  };
};
