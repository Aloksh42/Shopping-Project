import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Navbar} from "./components/Navbar";
import ShopPage from "./pages/shop";
import { AuthPage } from "./pages/auth";
import CheckoutPage from "./pages/checkout";
import { ShopContextProvider } from "./context/shop-context";
import { PurchasedItemsPage } from "./pages/purchased-items";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ShopContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<ShopPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="purchased-items" element={<PurchasedItemsPage />} />
          </Routes>
        </ShopContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
