import qs from "qs";
import React from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../shared/lib/hooks";
import { useNavigate } from "react-router-dom";

import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../../../features/filter/model/slice";

import {
  fetchPizzas,
  SearchPizzaParams,
  selectPizza,
  Status,
} from "../../../entities/pizza";

import { SortList, Sort } from "../../../features/sort";

import { Categories } from "../../../features/filter";

import { PizzaCard } from "../../../entities/pizza";
import { PizzaSkeleton } from "../../../entities/pizza";
import { Pagination } from "../../../shared/ui/Pagination";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isFirstLoad = React.useRef(true);

  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizza);

  const sortId = sort.sortProperty;

  const onChangeCategory = React.useCallback((i: number) => {
    dispatch(setCategoryId(i));
  }, []);
  const onChangePage = (num: number) => {
    dispatch(setCurrentPage(num));
  };

  const getPizzas = async () => {
    const sortBy = sortId.replace("-", "");
    const order = sortId.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      }),
    );

    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1),
      ) as unknown as SearchPizzaParams;
      const sort = SortList.find((obj) => obj.sortProperty === params.sortBy);

      dispatch(
        setFilters({
          searchValue: params.search || "",
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort ? sort : SortList[0],
        }),
      );
      isFirstLoad.current = false;
    }
  }, [dispatch]);

  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sortId, searchValue, currentPage]);

  React.useEffect(() => {
    const queryString = qs.stringify({
      sortProperty: sort.sortProperty,
      categoryId,
      currentPage,
      searchValue,
    });

    navigate(`?${queryString}`);
  }, [categoryId, sort.sortProperty, currentPage, searchValue, navigate]);

  const pizzas = Array.isArray(items)
    ? items.map((obj) => <PizzaCard key={obj.id} {...obj} />)
    : [];
  const skeletons = [...new Array(6)].map((_, index) => (
    <PizzaSkeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} setActiveCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>

      {status === Status.ERROR ? (
        <div className="content__info">
          <h2>
            У нас что-то сломалось &#128533; <br />
          </h2>
          <p>Пиццы не прогрузились. Возвращайтесь позже </p>
        </div>
      ) : (
        <>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {status === "loading" ? skeletons : pizzas}
          </div>
        </>
      )}

      <Pagination value={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
