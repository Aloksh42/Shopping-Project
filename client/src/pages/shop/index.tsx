import { useCookies } from "react-cookie";
import { useGetProducts } from "../../hooks/useGetProducts";
import { Product } from "./product";
import "./styles.css";
import { Navigate } from "react-router-dom";

export const ShopPage = () => {
  const [cookies, _] = useCookies(["access_token"]);
  const { products } = useGetProducts();

  if (!cookies.access_token) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="shop">
      <div className="products">
        {products.map((product) => (
          <Product product={product} />
        ))}
      </div>
    </div>
  );
};
