import React from "react";
import styles from "./Card.module.scss";
import plus from "../../assets/img/btn-plus.svg";
import cheked from "../../assets/img/btn-cheked.svg";
import heart from "../../assets/img/heart.svg";

export const Card = ({ title, price, imageUrl, onFavorite, onPlus }) => {
  const [isAdded, setIsAdded] = React.useState(false);

  const onClickPlus = () => {
    onPlus({title, price, imageUrl});
    setIsAdded(!isAdded);
  };

  React.useEffect(() => {
   
  }, [isAdded]);

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onFavorite}>
        <img width={18} height={18} src={heart} alt="unliked" />
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
