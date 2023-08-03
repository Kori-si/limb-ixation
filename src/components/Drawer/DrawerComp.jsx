import remove from "../../assets/img/btn-remove.svg";
import arrow from "../../assets/img/arrow.svg";

export const Drawer = ({onClose, items = []}) => {
  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="mb-30 d-flex justify-between ">
          Корзина{" "}
          <img
            onClick={onClose}
            className="cu-p"
            src={remove}
            alt="remove"
          />
        </h2>

        <div className="items">
          {items.map((obj) => (
            <div className="cartItem d-flex align-center mb-20">
              <div
                style={{
                  backgroundImage:
                    `url(${obj.imageUrl})`,
                }}
                className="cartItemImg "
              ></div>
              <div className="mr-20 flex">
                <p className="mb-5">{obj.title}</p>
                <b>{obj.price} руб.</b>
              </div>
              <div>
                <img className="removeBtn" src={remove} alt="remove" />
              </div>
            </div>
          ))}
        </div>
        <div className="cartTotalBlock">
          <ul>
            <li>
              <span>Итого:</span>
              <div></div>
              <b>21 498 руб. </b>
            </li>
            <li>
              <span>Налог 5%: </span>
              <div></div>
              <b>1074 руб. </b>
            </li>
          </ul>
          <button className="greenButton">
            Оформить заказ <img src={arrow} alt="arrow" />
          </button>
        </div>
      </div>
    </div>
  );
};
