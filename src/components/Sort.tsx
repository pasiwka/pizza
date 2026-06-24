import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSort, setSortId } from "../redux/slices/filterSlice";

type SortItem = {
  name: string;
  sortProperty: string;
};

export const SortList: SortItem[] = [
  { name: "популярности ↓", sortProperty: "rating" },
  { name: "популярности ↑", sortProperty: "-rating" },
  { name: "цене ↓", sortProperty: "price" },
  { name: "цене ↑", sortProperty: "-price" },
  { name: "алфовиту ↓", sortProperty: "title" },
  { name: "алфовиту ↑", sortProperty: "-title" },
];

const Sort: React.FC = () => {
  const dispatch = useDispatch();
  const sort = useSelector(selectSort);
  const sortRef = React.useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = React.useState(false);

  const onClickSelectSort = (obj: SortItem) => {
    dispatch(setSortId(obj));
    setIsOpen(false);
  };

  React.useEffect(() => {
    const handleClick = (event: any) => {
      const path = event.composedPath ? event.composedPath() : event.path; //чтобы во всех браузерах работало
      if (path && !path.includes(sortRef.current)) {
        setIsOpen(false);
      }
    };
    document.body.addEventListener("click", handleClick);
    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsOpen(!isOpen)}>{sort.name}</span>
      </div>
      {isOpen && (
        <div className="sort__popup">
          <ul>
            {SortList.map((Obj, index) => (
              <li
                key={index}
                className={sort.SortList === SortList ? "active" : ""}
                onClick={() => onClickSelectSort(Obj)}
              >
                {Obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
