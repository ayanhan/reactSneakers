import axios from "axios";
import React from "react";
import { AppContext } from "../../App";
import Info from "../Info";
import styles from './Drawer.module.scss';

const delay = () => new Promise((resolve) => setTimeout(resolve, 1000))

const Drawer = ({ onDelete, onCloseCart, items = [], opened }) => {
  const {cartItems, setCartItems} = React.useContext(AppContext);
  const [isOrderComlete, setIsOrderComplete] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post("https://611ca3f1a18e850017decb4e.mockapi.io/orders", {
        items: cartItems,
      });
     
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      //because of mockapi problem

      for (let i = 0; i < cartItems.length; i++ ) {
        const item = cartItems[i]
        await axios.delete("https://611ca3f1a18e850017decb4e.mockapi.io/cart/" + item.id)
        await delay()
      }
       
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
        <h2 className="mb-30 d-flex justify-between">
          Cart{" "}
          <img
            onClick={onCloseCart}
            className="cu-p"
            src="/img/btn-remove.svg"
            alt="Remove"
          />
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items flex">
              {items.map((obj, index) => (
                <div
                  key={obj.id}
                  className="cartItem d-flex align-center mb-20"
                >
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"
                  ></div>

                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.name}</p>
                    <b>${obj.price}</b>
                  </div>
                  <img
                    key={index}
                    onClick={() => onDelete(obj.id)}
                    className="removeBtn"
                    src="/img/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>

            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Total:</span>
                  <div></div>
                  <b>{totalPrice}$</b>
                </li>
                <li>
                  <span>Tax 10%:</span>
                  <div></div>
                  <b>{(totalPrice / 100) * 10}$</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="greenButton"
              >
                Confirm Order
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComlete ? "Thank you for order!" : "Cart is empty"}
            description={
              isOrderComlete
                ? `Your order #${orderId} sent to post office`
                : "Please add at least one item to your cart"
            }
            image={
              isOrderComlete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"
            }
          />
        )}
      </div>
    </div>
  );
};

export default Drawer;
