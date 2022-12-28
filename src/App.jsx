import { useState } from "react";
import Categories from "./components/categories/Categories";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Categories />
    </div>
  );
}

export default App;
