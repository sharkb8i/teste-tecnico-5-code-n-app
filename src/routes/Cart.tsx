import { useState } from "react";
import { useCartStore } from "../store/cartStore";
import { useForm } from "react-hook-form";
import axios from "axios";

interface FormData {
  name: string;
  email: string;
  phone: string;
}

export function Cart() {
  const items = useCartStore((state) => state.items);
  const updateQty = useCartStore((state) => state.updateQty);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  const { register, handleSubmit, formState } = useForm<FormData>({
    mode: "onChange",
  });

  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    if (items.length === 0) {
      setResponseMsg("Carrinho vazio. Adicione produtos antes de finalizar.");
      return;
    }

    setLoading(true);
    setResponseMsg(null);

    try {
      const payload = {
        customer: data,
        items: items.map(({ id, name, price, qty }) => ({ id, name, price, quantity: qty })),
      };

      // Mude a URL abaixo para a rota real do seu backend
      const res = await axios.post("/api/cotacao", payload);

      if (res.status === 200) {
        setResponseMsg("Cotação enviada com sucesso!");
        clearCart();
      } else {
        setResponseMsg("Falha ao enviar cotação. Tente novamente.");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setResponseMsg("Erro na comunicação com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-3xl font-bold mb-6">Seu Carrinho</h1>

      {items.length === 0 ? (
        <p className="mb-6 text-gray-600">Seu carrinho está vazio.</p>
      ) : (
        <ul className="mb-6">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between items-center mb-4 border-b pb-2">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-600">R$ {(item.price * item.qty).toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min={1}
                  value={item.qty}
                  onChange={(e) => updateQty(item.id, Math.max(1, Number(e.target.value)))}
                  className="w-16 border rounded px-2 py-1 text-center"
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Seus Dados</h2>

        <div>
          <label htmlFor="name" className="block font-semibold mb-1">
            Nome
          </label>
          <input
            id="name"
            {...register("name", { required: "Nome é obrigatório" })}
            className="w-full border rounded px-3 py-2"
          />
          {formState.errors.name && (
            <p className="text-red-600 text-sm mt-1">{formState.errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block font-semibold mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email é obrigatório",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email inválido",
              },
            })}
            className="w-full border rounded px-3 py-2"
          />
          {formState.errors.email && (
            <p className="text-red-600 text-sm mt-1">{formState.errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block font-semibold mb-1">
            Telefone
          </label>
          <input
            id="phone"
            type="tel"
            {...register("phone", { required: "Telefone é obrigatório" })}
            className="w-full border rounded px-3 py-2"
          />
          {formState.errors.phone && (
            <p className="text-red-600 text-sm mt-1">{formState.errors.phone.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Enviando..." : "Finalizar Cotação"}
        </button>

        {responseMsg && (
          <p className={`mt-4 font-semibold ${responseMsg.includes("sucesso") ? "text-green-600" : "text-red-600"}`}>
            {responseMsg}
          </p>
        )}
      </form>
    </div>
  );
}