import { useParams, useNavigate } from "react-router-dom";
import { PRODUCTS } from "../types";
import { useState } from "react";
import { useCartStore } from "../store/cartStore";

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find((p) => p.id === Number(id));
  const addItem = useCartStore((state) => state.addItem);
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div>Produto não encontrado.</div>;
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    navigate("/"); // volta para home, ou você pode optar por outra navegação
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <p className="mb-4">{product.description}</p>
      <p className="mb-4 font-semibold">R$ {product.price.toFixed(2)}</p>

      <div className="mb-4 flex items-center gap-4">
        <label htmlFor="quantity" className="font-semibold">
          Quantidade:
        </label>
        <input
          id="quantity"
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
          className="border rounded px-3 py-1 w-20"
        />
      </div>

      <button
        onClick={handleAddToCart}
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
}