import Categories from "./components/categories/Categories";
import Cart from "./components/cart/Cart";
import PDP from "./components/pdp/PDP";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Categories />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pdp" element={<PDP />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
