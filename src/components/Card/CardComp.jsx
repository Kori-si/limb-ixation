import React from "react";
import ContentLoader from "react-content-loader";
import AppContext from "../../context";

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
  loading = false,
}) => {
  const { isItemAdded } = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const itemObj = { id, parentId: id, title, price, imageUrl };

  const onClickPlus = () => {
    onPlus(itemObj);
  };

  const onClickFavorite = () => {
    onFavorite(itemObj);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={160}
          height={200}
          viewBox="0 0 155 202"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="1" y="0" rx="10" ry="10" width="150" height="90" />
          <rect x="0" y="109" rx="5" ry="5" width="150" height="15" />
          <rect x="0" y="133" rx="5" ry="5" width="100" height="15" />
          <rect x="0" y="169" rx="5" ry="5" width="85" height="32" />
          <rect x="120" y="169" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && (
            <div className={styles.favorite} onClick={onClickFavorite}>
              <img
                width={18}
                height={18}
                src={isFavorite ? liked : unliked}
                alt="unliked"
              />
            </div>
          )}
          <img width={133} height={112} src={imageUrl} alt="sneakers" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column ">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            {onPlus && (
              <img
                className={styles.button}
                onClick={onClickPlus}
                src={isItemAdded(id) ? cheked : plus}
                alt="plus"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};
