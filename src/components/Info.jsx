import React from "react";
import AppContext from "../pages/context";
import arrow from "../assets/img/arrow.svg";

export const Info = ({ title, description, image }) => {
  const {setCartOpened} = React.useContext(AppContext); 
  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img className="mb-20" width={120}  src={image} alt="empty" />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <button onClick={() => setCartOpened(false)} className="greenButton">
        <img src={arrow} alt="arrow" /> Вернуться назад
      </button>
    </div>
  );
};
