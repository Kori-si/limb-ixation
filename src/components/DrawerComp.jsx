import remove from "../assets/img/btn-remove.svg";
import arrow from "../assets/img/arrow.svg";
import empty from "../assets/img/empty.png";

export const Drawer = ({ onClose, onRemove, items = [] }) => {
  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="mb-30 d-flex justify-between ">
          Корзина{" "}
          <img onClick={onClose} className="cu-p" src={remove} alt="remove" />
        </h2>

        {items.length > 0 ? (
          <div>
            <div className="items">
              {items.map((obj) => (
                <div className="cartItem d-flex align-center mb-20">
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
        ) : (
          <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img
              className="mb-20"
              width={120}
              height={120}
              src={empty}
              alt="empty"
            />
            <h2>Корзина пустая</h2>
            <p className="opacity-6">
              Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.
            </p>
            <button onClick={onClose} className="greenButton">
              <img src={arrow} alt="arrow" /> Вернуться назад
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
