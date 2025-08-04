import { Link } from "react-router-dom";
import { PRODUCTS } from "../types";

export function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Produtos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow-sm bg-white">
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="mb-4 font-bold">R$ {product.price.toFixed(2)}</p>
            <Link
              to={`/product/${product.id}`}
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Ver Produto
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}