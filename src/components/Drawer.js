import React from "react";
import { AppContext } from "../App";
import Info from "./Info";

const Drawer = ({ onDelete, onCloseCart, items = [] }) => {
  const { cartItems } = React.useContext(AppContext)
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0)

  return (
    <div className="overlay">
      <div className="drawer">
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
          <>
            <div className="items">
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
              <button className="greenButton">Confirm Order</button>
            </div>
          </>
        ) : (
          <Info
            title="Cart is empty"
            description="Please add at least one item to your cart"
            image="/img/empty-cart.jpg"
          />
        )}
      </div>
    </div>
  );
};

export default Drawer;
