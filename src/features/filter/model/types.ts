export enum SortPropertyEnum {
  RATTING_DESC = "rating",
  RATTING_ABC = "-rating",
  TITLE_DESC = "title",
  TITLE_ABC = "-title",
  PRICE_DESC = "price",
  PRICE_ABC = "-price",
}

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
