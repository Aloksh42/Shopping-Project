import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" />
          <Route path="/auth" />
          <Route path="/checkout" />
          <Route path="purchased-items" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
