import React from "react";
import styles from "./Card.module.scss";
import plus from "../../assets/img/btn-plus.svg";
import cheked from "../../assets/img/btn-cheked.svg";
import unliked from "../../assets/img/unliked.svg";
import liked from "../../assets/img/liked.svg";

export const Card = ({
  id,
  title,
  price,
  imageUrl,
  onFavorite,
  onPlus,
  favorited = false,
}) => {
  const [isAdded, setIsAdded] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const onClickPlus = () => {
    onPlus({ title, price, imageUrl });
    setIsAdded(!isAdded);
  };

  const onClickFavorite = () => {
    onFavorite({id, title, price, imageUrl });
    setIsFavorite(!isFavorite);
  };

  React.useEffect(() => {}, [isAdded]);

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onClickFavorite}>
        <img
          width={18}
          height={18}
          src={isFavorite ? liked : unliked}
          alt="unliked"
        />
      </div>
      <img width={133} height={112} src={imageUrl} alt="sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column ">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <img
          className={styles.button}
          onClick={onClickPlus}
          src={isAdded ? cheked : plus}
          alt="plus"
        />
      </div>
    </div>
  );
};
