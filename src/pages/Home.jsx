import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzasSlice";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { SortList } from "../components/Sort";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Pizza from "../components/Pizza/Pizza";
import Skeleton from "../components/Pizza/Skeleton";
import Pagination from "../components/Pagination";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isFirstLoad = React.useRef(true);

  const { categoryId, sort, currentPage, searchValue } = useSelector(
    (state) => state.filter,
  );
  const { items, status } = useSelector((state) => state.pizza);

  const sortId = sort.sortProperty;

  const onChangeCategory = (i) => {
    dispatch(setCategoryId(i));
  };
  const onChangePage = (num) => {
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
        currentPage,
      }),
    );

    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = SortList.find(
        (obj) => obj.sortProperty === params.sortProperty,
      );
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isFirstLoad.current = false;
    }
  }, [dispatch]);

  React.useEffect(() => {
    if (!isFirstLoad.current) {
      getPizzas();
    }
    isFirstLoad.current = false;
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
    ? items.map((obj) => <Pizza key={obj.id} {...obj} />)
    : [];
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} setActiveCategory={onChangeCategory} />
        <Sort />
      </div>

      {status === "error" ? (
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
