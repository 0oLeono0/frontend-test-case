import Cart from "./components/Cart";
import Header from "./components/Header";
import ProductList from "./components/ProductList";

import "./App.css";

export default function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <ProductList />
        <Cart />
      </main>
    </div>
  );
}
