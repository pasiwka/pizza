import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSortId,
  Sort as SortType,
  SortPropertyEnum,
} from "../redux/filter/slice";
import { useAppDispatch } from "../redux/store";

type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export const SortList: SortItem[] = [
  { name: "популярности ↓", sortProperty: SortPropertyEnum.RATTING_DESC },
  { name: "популярности ↑", sortProperty: SortPropertyEnum.RATTING_ABC },
  { name: "цене ↓", sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: "цене ↑", sortProperty: SortPropertyEnum.PRICE_ABC },
  { name: "алфовиту ↓", sortProperty: SortPropertyEnum.TITLE_DESC },
  { name: "алфовиту ↑", sortProperty: SortPropertyEnum.TITLE_ABC },
];
type SortPopup = {
  value: SortType;
};
const Sort: React.FC<SortPopup> = React.memo(({ value }) => {
  const dispatch = useAppDispatch();
  const sortRef = React.useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = React.useState(false);

  const onClickSelectSort = (obj: SortItem) => {
    dispatch(setSortId(obj));
    setIsOpen(false);
  };

  React.useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
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
        <span onClick={() => setIsOpen(!isOpen)}>{value.name}</span>
      </div>
      {isOpen && (
        <div className="sort__popup">
          <ul>
            {SortList.map((Obj, index) => (
              <li
                key={index}
                className={
                  value.sortProperty === Obj.sortProperty ? "active" : ""
                }
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
});

export default Sort;
