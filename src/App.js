import axios from "axios";
import React from "react";
import { Route } from "react-router-dom";

import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";

export const AppContext = React.createContext({});

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const cartResponse = await axios.get(
          "https://611ca3f1a18e850017decb4e.mockapi.io/cart"
        );
        const favoritesResponse = await axios.get(
          "https://611ca3f1a18e850017decb4e.mockapi.io/favorites"
        );
        const itemsResponse = await axios.get(
          "https://611ca3f1a18e850017decb4e.mockapi.io/items"
        );

        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (e) {
        alert(e);
      }
    }

    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id))


    if (findItem) {
      axios.delete(
        `https://611ca3f1a18e850017decb4e.mockapi.io/cart/${findItem.id}`
      );
      setCartItems((prev) =>
        prev.filter((item) => Number(item.parentId) !== Number(obj.id))
      );
    } else {
      axios.post("https://611ca3f1a18e850017decb4e.mockapi.io/cart", obj);
      setCartItems((prev) => [...prev, obj]);
    }
  };

  const onDeleteFromCart = (id) => {
    axios.delete(`https://611ca3f1a18e850017decb4e.mockapi.io/cart/${id}`);

    setCartItems((prev) =>
      prev.filter((item) => Number(item.id) !== Number(id))
    );
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(
          `https://611ca3f1a18e850017decb4e.mockapi.io/favorites/${obj.id}`
        );
        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        const { data } = await axios.post(
          `https://611ca3f1a18e850017decb4e.mockapi.io/favorites`,
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (err) {
      alert("Couldn't add to favorites");
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

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
      }}
    >
      <div className="wrapper clear">
        {cartOpened ? (
          <Drawer
            onDelete={onDeleteFromCart}
            items={cartItems}
            onCloseCart={() => setCartOpened(false)}
          />
        ) : null}

        <Header onClickCart={() => setCartOpened(true)} />

        <Route path="/" exact>
          <Home
            cartItems={cartItems}
            items={items}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToFavorite={onAddToFavorite}
            onAddToCart={onAddToCart}
          />
        </Route>

        <Route path="/favorites">
          <Favorites />
        </Route>
      </div>
    </AppContext.Provider>
  );
}

export default App;
