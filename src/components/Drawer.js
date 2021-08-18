import React from "react";

const Drawer = ({ onDelete, onCloseCart, items = [] }) => {
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

        <div className="items">
          {items.map((obj, index) => (
            <div className="cartItem d-flex align-center mb-20">
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
                onClick={onDelete}
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
              <b>125$</b>
            </li>
            <li>
              <span>Tax 10%:</span>
              <div></div>
              <b>12$</b>
            </li>
          </ul>
          <button className="greenButton">Confirm Order</button>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
