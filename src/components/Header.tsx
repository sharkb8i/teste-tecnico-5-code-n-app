import { useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

export function Header() {
  const [open, setOpen] = useState(false);
  const items = useCartStore((state) => state.items);
  const updateQty = useCartStore((state) => state.updateQty);
  const removeItem = useCartStore((state) => state.removeItem);
  const totalItems = useCartStore((state) => state.totalItems());

  return (
    <header className="bg-white shadow px-4 py-3 flex items-center justify-between max-w-5xl mx-auto sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        Meu Orçamento
      </Link>

      <div className="relative">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="relative flex items-center focus:outline-none"
          aria-label="Abrir carrinho"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="7" cy="21" r="2" />
            <circle cx="17" cy="21" r="2" />
          </svg>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {totalItems}
            </span>
          )}
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-80 bg-white border rounded shadow-lg p-4 z-50">
            <h2 className="font-semibold mb-3">Carrinho</h2>
            {items.length === 0 ? (
              <p className="text-gray-500">Carrinho vazio</p>
            ) : (
              <ul className="max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <li key={item.id} className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        R$ {(item.price * item.qty).toFixed(2)} ({item.qty}x)
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={1}
                        value={item.qty}
                        onChange={(e) =>
                          updateQty(item.id, Math.max(1, Number(e.target.value)))
                        }
                        className="w-12 border rounded px-2 py-1 text-center"
                      />
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-800 font-bold"
                        aria-label={`Remover ${item.name}`}
                      >
                        &times;
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <Link
              to="/cart"
              onClick={() => setOpen(false)}
              className="block mt-4 bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700"
            >
              Ver Carrinho Completo
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}