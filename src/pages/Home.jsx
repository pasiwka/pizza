import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Pizza from "../components/Pizza/Pizza";
import Skeleton from "../components/Pizza/Skeleton";

const Home = ({ seacrhValue }) => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortId, setSortId] = React.useState({
    name: "популярности",
    sort: "rating",
  });

  React.useEffect(() => {
    setIsLoading(true);

    const sortBy = sortId.sort.replace("-", "");
    const order = sortId.sort.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = seacrhValue ? `&search=${seacrhValue}` : "";

    fetch(
      `https://6a2d3c142edd4cb330d0eb01.mockapi.io/items?${
        category
      }&sortBy=${sortBy}&order=${order}${search}`,
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortId, seacrhValue]);

  const pizzas = items
    // .filter((obj) => {
    //   if (obj.title.toLowerCase().includes(seacrhValue.toLowerCase())) {
    //     return true;
    //   }
    //   return false;
    // })  можно так можно через бек
    .map((obj, index) => <Pizza key={`${obj.id}`} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          setActiveCategory={(i) => setCategoryId(i)}
        />
        <Sort value={sortId} setActiveCategory={(i) => setSortId(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
    </div>
  );
};

export default Home;
