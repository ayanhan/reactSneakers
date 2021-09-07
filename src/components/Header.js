import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

const Header = ({ onClickCart }) => {
  const { cartItems } = React.useContext(AppContext)
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0)

  return (
    <header className="d-flex justify-between align center p-40">
      <Link to="/">
        <div className="d-flex align-center">
          <img width={40} height={40} src="/img/img.png" alt="logo" />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Best sneakers shop</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <li onClick={onClickCart} className="mr-30 cu-p">
          <img width={18} height={18} src="/img/cart.svg" alt="cart" />
          <span><b>{totalPrice}$</b></span>
        </li>
        <Link to="/favorites">
          <li className="mr-20 cu-p">
            <img width={18} height={18} src="/img/heart.svg" alt="favorites" />
          </li>
        </Link>
        <li>
          <img width={18} height={18} src="/img/user.svg" alt="user" />
        </li>
      </ul>
    </header>
  );
};

export default Header;
