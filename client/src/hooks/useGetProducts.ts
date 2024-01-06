import axios from "axios";
import { useState, useEffect } from "react";

import { useGetToken } from "./useGetToken";

export const useGetProducts = () => {
  const [products, setProducts] = useState([]);
  const { headers } = useGetToken();

  const fetchProducts = async () => {
    const products = await axios.get("http://localhost:3001/products", {
      headers,
    });

    setProducts(products.data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    fetchProducts,
  };
};
