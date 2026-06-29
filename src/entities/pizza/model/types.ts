import { Status } from "./slice";

export type SearchPizzaParams = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: string;
};

export type Pizza = {
  id: string;
  title: string;
  price: number;
  imageSrc: string;
  types: number[];
  sizes: number[];
};

export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
  error: string | null;
}
