import React from "react";
import "./scss/app.scss";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import Pizza from "./components/Pizza";

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
            <Pizza
              imageSrc="https://media.dodostatic.net/image/r:584x584/019e3ff97eeb775f8a0d4408f34c9ab1.webp"
              title="Трюфельная пицца"
              price={399}
            />

            <Pizza
              imageSrc="https://media.dodostatic.net/image/r:584x584/019ac604bad37209b1ec496bbdd98560.webp"
              title="Додо"
              price={299}
            />

            <Pizza
              imageSrc="https://media.dodostatic.net/image/r:760x760/0198bf39dda97082912be8d1f3f2b233.webp"
              title="Пепперони"
              price={349}
            />

            <Pizza
              imageSrc="https://media.dodostatic.net/image/r:760x760/0198bf530345746e98039478001d5108.webp"
              title="Гавайская"
              price={329}
            />

            <Pizza
              imageSrc="https://media.dodostatic.net/image/r:760x760/0198bf40eb1171aabe90b1b3ce07c0c5.webp"
              title="Четыре сыра"
              price={369}
            />

            <Pizza
              imageSrc="https://media.dodostatic.net/image/r:760x760/0198bf439a007604880d0231be87cd3e.webp"
              title="Дьябло"
              price={279}
            />

            <Pizza
              imageSrc="https://media.dodostatic.net/image/r:584x584/019bcbc9b40370a4b47c6298dcac292a.webp"
              title="Масала"
              price={279}
            />

            <Pizza
              imageSrc="https://media.dodostatic.net/image/r:584x584/019c986d0e7d75e595d9b0f02bda0ed5.webp"
              title="Ветчина и огурчики"
              price={279}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
