import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzazStatus",
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get(
      `https://6a2d3c142edd4cb330d0eb01.mockapi.io/items?page=${currentPage}&limit=4&${
        category
      }&sortBy=${sortBy}&order=${order}${search}`,
    );
    return data;
  },
);

const initialState = {
  items: [],
  status: "loading",
  error: null,
};

export const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.items = [];
        console.log("идет отправка!");
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
        console.log("все успешно!");
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.status = "error";
        state.items = [];
        state.error = action.error.message;
        console.log("ошибка!");
      });
  },
});

export const selectPizza = (state) => state.pizza;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
