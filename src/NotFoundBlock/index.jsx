import React from "react";

import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>&#128533;</span>
        <br />
        Ничего не найдено
      </h1>
      <p>К сожалению данная страница отсутствует в нашем интернет-магазине</p>
    </div>
  );
};

export default NotFoundBlock;
