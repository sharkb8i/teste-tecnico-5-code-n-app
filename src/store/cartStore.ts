import { create } from "zustand";

export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface CartItem extends Product {
  qty: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  updateQty: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  totalItems: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (product, quantity) => {
    const items = get().items;
    const existing = items.find((item) => item.id === product.id);
    if (existing) {
      set({
        items: items.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + quantity } : item
        ),
      });
    } else {
      set({ items: [...items, { ...product, qty: quantity }] });
    }
  },
  updateQty: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id);
      return;
    }
    set({
      items: get().items.map((item) =>
        item.id === id ? { ...item, qty: quantity } : item
      ),
    });
  },
  removeItem: (id) => {
    set({ items: get().items.filter((item) => item.id !== id) });
  },
  clearCart: () => set({ items: [] }),
  totalItems: () => get().items.reduce((acc, item) => acc + item.qty, 0),
}));