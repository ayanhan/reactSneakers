import React from "react";
import { AppContext } from "../../App";
import styles from "./Card.module.scss";

const Card = ({
  id,
  parentId,
  name,
  price,
  imageUrl,
  onPlus,
  onFavorite,
  favorited = false,
}) => {
  const {isItemAdded} = React.useContext(AppContext)
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const obj = {id, parentId: id, name, price, imageUrl}

  const onClickPlus = () => {
    onPlus(obj);
  };

  const onClickFavorite = () => {
    setIsFavorite(!isFavorite);
    onFavorite(obj);
  };

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onClickFavorite}>
        <img
          src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"}
          alt="Unliked"
        />
      </div>
      <img width='100%' height={135} src={imageUrl} alt="sneaker" />
      <h5>{name}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column ">
          <span>Price</span>
          <b>{`${price}$`}</b>
        </div>

        {onPlus && (<img
          className={styles.plus}
          onClick={onClickPlus}
          src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/plus.svg"}
          alt="Plus"
        />)}
      </div>
    </div>
  );
};

export default Card;
