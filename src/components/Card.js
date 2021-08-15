import React from "react";

const Card = () => {
  return (
    <div className="card">
      <div className="favorite">
        <img src="/img/heart-unliked.svg" alt="Unliked" />
      </div>
      <img width={133} height={112} src="img/sneakers/1.jpg" alt="sneaker" />
      <h5>Men's Nike Blazer Mid Suede</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column ">
          <span>Price</span>
          <b>180$</b>
        </div>
        <button className="button">
          <img width={11} height={11} src="/img/plus.svg" alt="" />
        </button>
      </div>
    </div>
  );
};

export default Card;
