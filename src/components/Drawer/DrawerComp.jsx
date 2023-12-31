import React from "react";
import axios from "axios";

import { Info } from "../Info";
import { useCart } from "../hooks/useCart";

import styles from "./Drawer.module.scss";

import remove from "../../assets/img/btn-remove.svg";
import arrow from "../../assets/img/arrow.svg";
import empty from "../../assets/img/empty.png";
import framed from "../../assets/img/framed.jpg";

const delay = (mc) => new Promise((resolve) => setTimeout(resolve, mc));

export const Drawer = ({ onClose, onRemove, items = [], opened}) => {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://64ce2f980c01d81da3ee95a7.mockapi.io/orders",
        { items: cartItems }
      );

      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          "https://64cbf0352eafdcdc85197f78.mockapi.io/cart/" + item.id
        );
        await delay(2000);
      }
    } catch (error) {
      alert("Ошибка при создании заказа :(");
    }
    setIsLoading(false);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
        <h2 className="mb-30 d-flex justify-between ">
          Корзина{" "}
          <img onClick={onClose} className="cu-p" src={remove} alt="remove" />
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className={styles.items}>
              {items.map((obj) => (
                <div
                  key={obj.id}
                  className="cartItem d-flex align-center mb-20"
                >
                  <div
                    style={{
                      backgroundImage: `url(${obj.imageUrl})`,
                    }}
                    className="cartItemImg "
                  ></div>
                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <div>
                    <img
                      onClick={() => onRemove(obj.id)}
                      className="removeBtn"
                      src={remove}
                      alt="remove"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.cartTotalBlock}>
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб. </b>
                </li>
                <li>
                  <span>В том числе НДС 20%: </span>
                  <div></div>
                  <b>{(Math.floor(totalPrice / 100) * 20)} руб. </b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="greenButton"
              >
                Оформить заказ <img src={arrow} alt="arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
            description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
            image={isOrderComplete ? framed : empty}
          />
        )}
      </div>
    </div>
  );
};
