import React from "react";
import styles from "./Search.module.scss";
import { SearchContext } from "../../App";

const Search = () => {
  const { seacrhValue, setSeacrhValue } = React.useContext(SearchContext);
  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-0.59 4.23-1.57L14 14.71V15.5L19 20.49 20.49 19 15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          fill="currentColor"
        />
      </svg>
      <input
        value={seacrhValue}
        onChange={(event) => setSeacrhValue(event.target.value)}
        className={styles.input}
        placeholder="Поиск пиццы :)"
      />
      {seacrhValue && (
        <svg
          onClick={() => setSeacrhValue("")}
          className={styles.clear}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      )}
    </div>
  );
};

export default Search;
