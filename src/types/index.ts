export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export const PRODUCTS: Product[] = [
  { id: 1, name: "Produto A", description: "Descrição do produto A", price: 10 },
  { id: 2, name: "Produto B", description: "Descrição do produto B", price: 20 },
  { id: 3, name: "Produto C", description: "Descrição do produto C", price: 15 },
];