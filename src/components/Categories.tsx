import React from "react";

type CategoriesPros = {
  value: number;
  setActiveCategory: any;
};

const Categories: React.FC<CategoriesPros> = ({ value, setActiveCategory }) => {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

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
};

export default Categories;
