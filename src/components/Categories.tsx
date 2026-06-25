import React from "react";
import { useWhyDidYouUpdate } from "ahooks";

type CategoriesPros = {
  value: number;
  setActiveCategory: (i: number) => void;
};
const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];
const Categories: React.FC<CategoriesPros> = React.memo(
  ({ value, setActiveCategory }) => {
    return (
      <div className="categories">
        <ul>
          {categories.map((category, i) => (
            <li
              key={i}
              className={value === i ? "active" : ""}
              onClick={() => setActiveCategory(i)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    );
  },
);

export default Categories;
