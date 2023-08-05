import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Header } from "./components/HeaderComp";
import { Home } from "./pages/Home";
import { Drawer } from "./components/DrawerComp";
import { Favorites } from "./pages/Favorites";

import axios from "axios";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    axios.get("https://64cbf0352eafdcdc85197f78.mockapi.io/items").then((res) => {
      setItems(res.data);
    });
    axios.get("https://64cbf0352eafdcdc85197f78.mockapi.io/cart").then((res) => {
      setCartItems(res.data);
    });
    axios.get("https://64ce2f980c01d81da3ee95a7.mockapi.io/favorite").then((res) => {
      setFavorites(res.data);
    });
  }, []);

  const onAddToCart = (obj) => {
    axios.post("https://64cbf0352eafdcdc85197f78.mockapi.io/cart", obj);
    setCartItems(prev => [...prev, obj]);
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://64cbf0352eafdcdc85197f78.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id == obj.id)) {
        axios.delete(`https://64ce2f980c01d81da3ee95a7.mockapi.io/favorite/${obj.id}`);
        setFavorites(prev => prev.filter(item => item.id !== obj.id));
      } else {
        const { data } = await axios.post("https://64ce2f980c01d81da3ee95a7.mockapi.io/favorite", obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("не удалось добавить в избранное");
    }

  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />}

      <Header onClickCart={() => setCartOpened(true)} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
            />
          }
          exact
        />
      </Routes>

      <Routes>
        <Route
          path="/favorites"
          element={
            <Favorites
              items={favorites}
              onAddToFavorite={onAddToFavorite}
            />
          }
          exact
        />
      </Routes>

    </div>

  );
}

export default App;

