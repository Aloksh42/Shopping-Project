import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { IShopContext, ShopContext } from "../context/shop-context";

const Navbar = () => {


  const {availableMoney} = useContext<IShopContext>(ShopContext);


  return (
    <div className="navbar">
      <div className="navbar-title">
        <h2>Alok's Shop</h2>
      </div>

      <div className="navbar-links">
        <Link to="/">Shop</Link>
        <Link to="/purchased-items">Purchases</Link>
        <Link to="/checkout">
          <FontAwesomeIcon icon={faShoppingCart} />
        </Link>
        <span> ${availableMoney.toFixed(2)} </span>
      </div>
    </div>
  );
};

export default Navbar;
