import React from "react";
import "./scss/app.scss";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import Pizza from "./components/Pizza";
import data from "./data/pizza.json";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {data.map((obj) => (
              <Pizza
                key={obj.id}
                // imageSrc={obj.imageSrc}
                // title={obj.title}
                // price={obj.price}
                // types={obj.types}
                // sizes={obj.sizes}
                {...obj}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
