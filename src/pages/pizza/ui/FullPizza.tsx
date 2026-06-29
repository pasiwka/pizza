import React from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = React.useState<{
    imageSrc: string;
    title: string;
    sizes: number[];
    description: string;
    price: number;
  }>();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://6a2d3c142edd4cb330d0eb01.mockapi.io/items/${id}`,
        );
        setData(data);
      } catch (error) {
        alert("поломочка( такой пиццы нет. Вернуться на главную?");
        navigate("/");
      }
    }

    fetchPizza();
  }, [id]);

  if (!data) {
    return (
      <div className="content__pizza">
        <h2>Погоди чуток...</h2>
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
