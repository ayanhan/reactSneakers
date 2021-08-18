import React from "react";

const Header = ({onClickCart}) => {
  return (
    <header className="d-flex justify-between align center p-40">
      <div className="d-flex align-center">
        <img width={40} height={40} src="/img/img.png" alt="logo" />
        <div>
          <h3 className="text-uppercase">React Sneakers</h3>
          <p className="opacity-5">Best sneakers shop</p>
        </div>
      </div>
      <ul className="d-flex">
        <li onClick={onClickCart} className="mr-30 cu-p">
          <img width={18} height={18} src="/img/cart.svg" alt="cart" />
          <span>120$</span>
        </li>
        <li>
          <img width={18} height={18} src="/img/user.png" alt="user" />
        </li>
      </ul>
    </header>
  );
};

export default Header;
