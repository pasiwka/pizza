import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export type SearchPizzaParams = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: string;
};

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzazStatus",
  async (params: SearchPizzaParams) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://6a2d3c142edd4cb330d0eb01.mockapi.io/items?page=${currentPage}&limit=4&${
        category
      }&sortBy=${sortBy}&order=${order}${search}`,
    );
    return data;
  },
);

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageSrc: string;
  types: number[];
  sizes: number[];
};

export enum Status {
  LOADING = "loading",
  SUCCES = "success",
  ERROR = "error",
}

interface PizzaSliceState {
  items: Pizza[];
  status: Status;
  error: string | null;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
  error: null,
};

export const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.error = null;
        state.items = [];
        console.log("идет отправка!");
      })
      .addCase(
        fetchPizzas.fulfilled,
        (state, action: PayloadAction<Pizza[]>) => {
          state.items = action.payload;
          state.status = Status.SUCCES;
          console.log("все успешно!");
        },
      )
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.status = Status.ERROR;
        state.items = [];
        state.error = action.error.message || "Произошла ошибка";
        console.log("ошибка!");
      });
  },
});

export const selectPizza = (state: RootState) => state.pizza;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
