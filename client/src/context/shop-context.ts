import { createContext, useState} from "react";

export interface IShopContext{
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemCount: (newAmount: number, itemId: string) => void;
}

export const defaultValue: IShopContext = {
  addToCart : () => null,
  removeFromCart : () => null,
  updateCartItemCount : () => null,
}


export const ShopContext = createContext<IShopContext>(defaultValue)

export const ShopContextProvider = (props) => {

  const [cartItems, setCartItems] = useState<{string: number} | {}>({})

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


  const contextValue: IShopContext = {
    addToCart,
    removeFromCart,
    updateCartItemCount,
  }

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

