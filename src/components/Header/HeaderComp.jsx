import logo from '../../assets/img/logo.png';
import cart from "../../assets/img/cart.svg";
import user from "../../assets/img/user.svg"

export const Header = () => {
  return (
    <header className="d-flex justify-between align-center p-40">
      <div className="d-flex align-center">
        <img width={40} height={40} src={logo} />
        <div>
          <h3 className="text-uppercase">React sneakers</h3>
          <p className="opacity-5">Магазин лучших кроссовок</p>
        </div>
      </div>
      <ul className="d-flex">
        <li className="mr-30">
          <img width={18} height={18} src={cart} />
          <span>1205 руб.</span>
        </li>
        <li>
          <img width={18} height={18} src={user} />
        </li>
      </ul>
    </header>
  );
};
