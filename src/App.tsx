import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./routes/Home";
import { ProductDetails } from "./routes/ProductDetails";
import { Cart } from "./routes/Cart";
import { Header } from "./components/Header";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans">
        <Header />
        <main className="max-w-5xl mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}