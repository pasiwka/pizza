import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterSliseState, Sort } from "./types";

export enum SortPropertyEnum {
  RATTING_DESC = "rating",
  RATTING_ABC = "-rating",
  TITLE_DESC = "title",
  TITLE_ABC = "-title",
  PRICE_DESC = "price",
  PRICE_ABC = "-price",
}

const initialState: FilterSliseState = {
  searchValue: "",
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "популярности",
    sortProperty: SortPropertyEnum.RATTING_DESC,
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSortId(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliseState>) {
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const {
  setCategoryId,
  setSortId,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export type { FilterSliseState, Sort } from "./types";
export { selectFilter, selectSort } from "./selectors";
export default filterSlice.reducer;
