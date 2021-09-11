import axios from "axios";
import React from "react";
import { Route } from "react-router-dom";

import Drawer from "./components/Drawer/index.js";
import Header from "./components/Header";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Orders from "./pages/Orders";

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
        // promise all to wait for all requests to finish
        const [cartResponse, favoritesResponse, itemsResponse] =
          await Promise.all([
            axios.get("https://611ca3f1a18e850017decb4e.mockapi.io/cart"),
            axios.get("https://611ca3f1a18e850017decb4e.mockapi.io/favorites"),
            axios.get("https://611ca3f1a18e850017decb4e.mockapi.io/items"),
          ]);

        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (e) {
        alert(e);
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    const findItem = cartItems.find(
      (item) => Number(item.parentId) === Number(obj.id)
    );

    if (findItem) {
      await axios.delete(
        `https://611ca3f1a18e850017decb4e.mockapi.io/cart/${findItem.id}`
      );
      setCartItems((prev) =>
        prev.filter((item) => Number(item.parentId) !== Number(obj.id))
      );
    } else {
      setCartItems((prev) => [...prev, obj]);
      const { data } = await axios.post(
        "https://611ca3f1a18e850017decb4e.mockapi.io/cart",
        obj
      );
      setCartItems((prev) =>
        prev.map((item) => {
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id,
            };
          }
          return item;
        })
      );
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
        onAddToCart,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          onDelete={onDeleteFromCart}
          items={cartItems}
          onCloseCart={() => setCartOpened(false)}
          opened={cartOpened}
        />

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

        <Route path="/orders">
          <Orders />
        </Route>
      </div>
    </AppContext.Provider>
  );
}

export default App;
