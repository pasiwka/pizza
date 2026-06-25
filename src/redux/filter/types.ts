import { SortPropertyEnum } from "./slice";

export type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
};
export interface FilterSliseState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: Sort;
}
