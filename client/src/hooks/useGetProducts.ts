import axios from "axios";
import { useState, useEffect } from "react";
import { useGetToken } from "./useGetToken";
import { IProduct } from "../models/interfaces";

export const useGetProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const {headers} = useGetToken();

  const fetchProducts = async () => {
    const fetchedProducts = await axios("http://localhost:3001/product", { headers });

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
