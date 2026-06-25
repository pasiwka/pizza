export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageSrc: string;
  type: string;
  size: number;
  count: number;
};

export interface CartSliseState {
  totalPrice: number;
  items: CartItem[];
}
