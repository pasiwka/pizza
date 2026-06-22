import { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";
import axios from "axios";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Pizza from "../components/Pizza/Pizza";
import Skeleton from "../components/Pizza/Skeleton";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";

const Home = () => {
  const dispatch = useDispatch();

  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter,
  );
  const sortId = sort.sortProperty;
  const { seacrhValue } = useContext(SearchContext);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onChangeCategory = (i) => {
    dispatch(setCategoryId(i));
  };
  const onChangePage = (num) => {
    dispatch(setCurrentPage(num));
  };

  useEffect(() => {
    setIsLoading(true);

    const sortBy = sortId.replace("-", "");
    const order = sortId.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = seacrhValue ? `&search=${seacrhValue}` : "";

    // fetch(
    //   `https://6a2d3c142edd4cb330d0eb01.mockapi.io/items?page=${page}&limit=4&${
    //     category
    //   }&sortBy=${sortBy}&order=${order}${search}`,
    // )
    //   .then((res) => res.json())
    //   .then((arr) => {
    //     setItems(arr);
    //     setIsLoading(false);
    //   });

    axios
      .get(
        `https://6a2d3c142edd4cb330d0eb01.mockapi.io/items?page=${currentPage}&limit=4&${
          category
        }&sortBy=${sortBy}&order=${order}${search}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortId, seacrhValue, currentPage]);

  // const pizzas = items
  //   // .filter((obj) => {
  //   //   if (obj.title.toLowerCase().includes(seacrhValue.toLowerCase())) {
  //   //     return true;
  //   //   }
  //   //   return false;
  //   // })  можно так можно через бек
  //   .map((obj, index) => <Pizza key={`${obj.id}`} {...obj} />);
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
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination value={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
