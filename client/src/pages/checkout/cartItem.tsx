import { useContext } from "react";
import { IProduct } from "../../models/interfaces";
import { ShopContext } from "../../context/shop-context";

interface Props {
  product: IProduct;
}

export const CartItem = (props: Props) => {
  const { _id, productName, price, imageURL } =
    props.product;
  const { getCartItemCount, addToCart, removeFromCart, updateCartItemCount } =
    useContext(ShopContext);

  const cartItemCount = getCartItemCount(_id);

  return (
    <div className="cartItem">
      <img src={imageURL} />
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p> Price: ${price}</p>
        <div className="countHandler">
          <button onClick={() => removeFromCart(_id)}> - </button>
          <input
            value={cartItemCount}
            onChange={(e) => updateCartItemCount(Number(e.target.value), _id)}
          />
          <button onClick={() => addToCart(_id)}> + </button>
        </div>
      </div>
    </div>
  );
};
