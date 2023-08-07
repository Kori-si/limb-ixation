import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Header } from "./components/HeaderComp";
import { Home } from "./pages/Home";
import { Drawer } from "./components/DrawerComp";
import { Favorites } from "./pages/Favorites";
import { Orders } from "./pages/Orders";
import AppContext from "./context";

import axios from "axios";




function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      const cartResponse = await axios.get("https://64cbf0352eafdcdc85197f78.mockapi.io/cart");
      const favoritesResponse = await axios.get("https://64ce2f980c01d81da3ee95a7.mockapi.io/favorite");
      const itemsResponse = await axios.get("https://64cbf0352eafdcdc85197f78.mockapi.io/items");

      setIsLoading(false);
      setItems(itemsResponse.data);
      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
    }

    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(`https://64cbf0352eafdcdc85197f78.mockapi.io/cart/${obj.id}`);
        setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
      } else {
        axios.post("https://64cbf0352eafdcdc85197f78.mockapi.io/cart", obj);
        setCartItems(prev => [...prev, obj]);
      }

    } catch (error) {

    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://64cbf0352eafdcdc85197f78.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://64ce2f980c01d81da3ee95a7.mockapi.io/favorite/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
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

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  }

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToFavorite,
        setCartOpened,
        setCartItems,
        onAddToCart
      }}>
      <div className="wrapper clear">
        {cartOpened && (<Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />)}

        <Header onClickCart={() => setCartOpened(true)} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
            exact
          />
        </Routes>

        <Routes>
          <Route path="/favorites"
            element={
              <Favorites />
            }
            exact
          />
        </Routes>

        <Routes>
          <Route path="/orders"
            element={
              <Orders />
            }
            exact
          />
        </Routes>

      </div>
    </AppContext.Provider>
  );
}

export default App;

