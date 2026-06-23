import React from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const FullPizza = () => {
  const { id } = useParams();
  const [data, setData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://6a2d3c142edd4cb330d0eb01.mockapi.io/items/${id}`,
        );
        setData(data);
        setIsLoading(false);
      } catch (error) {
        alert("поломочка(");
        setIsLoading(false);
      }
    }

    fetchPizza();
  }, [id]);

  if (isLoading) {
    return (
      <div className="content__pizza">
        <h2>Погоди чуток...</h2>
      </div>
    );
  }
  if (!data) {
    return (
      <div className="content__pizza">
        <h2>Пицца не найдена</h2>
      </div>
    );
  }

  return (
    <div className="content__pizza">
      <div className="pizza-wrapper">
        <img src={data.imageSrc} alt={data.title} />
        <div className="pizza-info">
          <h2>{data.title}</h2>
          <span>{data.sizes.join(", ")} см</span>
          <p>{data.description}</p>
          <h4>{data.price} ₽</h4>
        </div>
      </div>
      <Link to="/" className="button button--black">
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};

export default FullPizza;
