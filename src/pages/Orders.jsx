import axios from "axios";
import React from "react";
import { AppContext } from "../App";
import Card from "../components/Card";

function Orders() {
  const { onAddToFavorite, onAddToCart } = React.useContext(AppContext);
  const [ orders, setOrders ] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://611ca3f1a18e850017decb4e.mockapi.io/orders"
        );
        setOrders(data.reduce((prev, curr) => [...prev, ...curr.items], []));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>My Orders</h1>
      </div>

      <div className="d-flex flex-wrap">
        {orders.map((item, index) => (
          <Card
            key={index}
            onAddToFavorite={onAddToFavorite}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}

export default Orders;
