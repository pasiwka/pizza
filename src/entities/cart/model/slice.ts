import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calcTotalPrice, getCartFromLS } from "../../../shared/lib/utils";
import { CartItem, CartSliseState } from "./types";
const { items, totalPrice } = getCartFromLS();

const initialState: CartSliseState = {
  totalPrice,
  items,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = calcTotalPrice(state.items);
    },

    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
        // Если count стал 0, удаляем элемент
        if (findItem.count === 0) {
          state.items = state.items.filter((obj) => obj.id !== action.payload);
        }
        state.totalPrice = calcTotalPrice(state.items);
      }
    },

    removeItems(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = calcTotalPrice(state.items);
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItems, removeItems, clearItems, minusItem } =
  cartSlice.actions;
export type { CartItem, CartSliseState } from "./types";
export { selectCart, selectCartItemById } from "./selectors";
export default cartSlice.reducer;
