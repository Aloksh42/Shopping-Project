import { createContext, useState} from "react";
import { useGetProducts } from "../hooks/useGetProducts";
import { IProduct } from "../models/interfaces";
import axios from "axios";
import { useGetToken } from "../hooks/useGetToken";
import { useNavigate } from "react-router-dom";
import { ProductErrors } from "../models/errors";

export interface IShopContext{
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemCount: (newAmount: number, itemId: string) => void;
  getCartItemCount: (itemId: string) => number;
  getTotalCartAmount: () => number;
  fetchAvailableMoney: () => void;
  fetchPurchasedItems: () => void;
  checkout: () => void;
  availableMoney: number;
  purchasedItems: IProduct[];


}

export const defaultValue: IShopContext = {
  addToCart : () => null,
  removeFromCart : () => null,
  updateCartItemCount : () => null,
  getCartItemCount: () => 0,
  getTotalCartAmount: () => 0,
  fetchAvailableMoney: () => null,
  fetchPurchasedItems: () => null,
  checkout: () => null,
  availableMoney: 0,
  purchasedItems: [],
}


export const ShopContext = createContext<IShopContext | null>(null);

export const ShopContextProvider = (props) => {

  const {products , fetchProducts} = useGetProducts();
  const {headers} = useGetToken();
  const navigate = useNavigate();

 
  const [cartItems, setCartItems] = useState<{string: number} | {}>({})
  const [availableMoney, setAvailableMoney] = useState<number>(0);
  const [purchasedItems, setPurchasedItems] = useState<IProduct[]>([]);

  const addToCart = (itemId: string) => {
    if(!cartItems[itemId]){
      setCartItems((prev) => ({...prev, [itemId]:1}))
    }else{
      setCartItems((prev) => ({...prev, [itemId]: prev[itemId]+1}))
    }
  }

  const removeFromCart = (itemId: string) => {
    if(!cartItems[itemId]){
      return;
    }else{
      setCartItems((prev) => ({...prev, [itemId]: prev[itemId]-1}))
    }
  }

  const updateCartItemCount = (newAmount: number, itemId: string) => {
      setCartItems((prev) => ({...prev, [itemId]: newAmount}))
  }


  const getCartItemCount = (itemId: string): number => {
    if(itemId in cartItems){
      return cartItems[itemId];
    }
    return 0;
  }

  const getTotalCartAmount = () => {
    if(products.length == 0){
      return 0;
    }
    let totalAmount = 0;
    for(const item in cartItems){
      if(cartItems[item]>0){
        let itemInfo: IProduct = products.find((product) => product._id === item);
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return Number(totalAmount.toFixed(2));
  }

  const fetchAvailableMoney = async () => {
    const res = await axios.get(`http://localhost:3001/available-money/${localStorage.getItem("userID")}`,{headers});

    setAvailableMoney(res.data.availableMoney);
  }

  const fetchPurchasedItems = async () => {
    const res = await axios.get(`http://localhost:3001/purchases-items/${localStorage.getItem("userID")}`,{headers})

    setPurchasedItems(res.data.purchasedItems);

  }


  const checkout = async() => {
    const body = {customerID: localStorage.getItem("userID"), cartItems};

    try {
      const res = await axios.post("http://localhost:3001/checkout", body, {headers})
      setPurchasedItems(res.data.purchasedItems);
      fetchAvailableMoney();
      fetchProducts();
      navigate('/');
    } catch (err) {
      let errorMessage:string = "";

      switch (err.response.data.type) {
        case ProductErrors.NO_PRODUCT_FOUND:
          errorMessage = "No product found";
          break;
        case ProductErrors.NO_AVAILABLE_MONEY:
          errorMessage = "Not enough money";
          break;
        case ProductErrors.NOT_ENOUGH_STOCK:
          errorMessage = "Not enough stock";
          break;
        default:
          errorMessage = "Something went wrong";
      }

      alert("ERROR: " + errorMessage);
    }
  }




  const contextValue: IShopContext = {
    addToCart,
    removeFromCart,
    updateCartItemCount,
    getCartItemCount,
    getTotalCartAmount,
    fetchAvailableMoney,
    fetchPurchasedItems,
    checkout,
    availableMoney,
    purchasedItems,
  }

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

