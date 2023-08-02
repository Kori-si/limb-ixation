import styles from "./Card.module.scss";
import plus from "../../assets/img/btn-plus.svg";
import heart from "../../assets/img/heart-unliked.svg";

export const Card = (props) => {
  const onClickButton = () => {
    console.log();
  };

  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img src={heart} alt="unliked" />
      </div>
      <img width={133} height={112} src={props.imageUrl} alt="sneakers" />
      <h5>{props.title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column ">
          <span>Цена:</span>
          <b>{props.price} руб.</b>
        </div>
        <button className={styles.button}>
          <img
        
            src={plus}
            alt="plus"
          />
        </button>
      </div>
    </div>
  );
};
