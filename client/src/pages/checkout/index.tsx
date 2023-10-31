import { useContext } from "react";
import { useGetProducts } from "../../hooks/useGetProducts";
import { ShopContext } from "../../context/shop-context";
import { IProduct } from "../../models/interfaces";
import { CartItem } from "./cartItem";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const CheckoutPage = () => {
  const { products } = useGetProducts();
  const { getCartItemCount, getTotalCartAmount, checkout } =
    useContext(ShopContext);
  const totalAmount = getTotalCartAmount();

  const navigate = useNavigate();

  return (
    <div className="cart">
      <div>Your Cart Items</div>
      <div className="cart">
        {products.map((product: IProduct) => {
          if (getCartItemCount(product._id) !== 0) {
            return <CartItem product = {product} />;
          }
        })}
      </div>

      {totalAmount > 0 ? (
        <div className="checkout">
          <p> Subtotal: ${totalAmount} </p>
          <button onClick={() => navigate("/")}> Continue Shopping </button>
          <button
            onClick={() => {
              checkout(localStorage.getItem("userID"));
            }}
          >
            Checkout
          </button>
        </div>
      ) : (
        <h1> Your Shopping Cart is Empty</h1>
      )}
    </div>
  );
};

export default CheckoutPage;
