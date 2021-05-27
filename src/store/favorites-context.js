import { createContext, useState } from "react";

let favorites = localStorage.getItem("favorites");

const FavoritesContext = createContext({
  favorites: [],
  totalFavorites: 0,
  addFavorite: (favoriteMeetup) => {},
  removeFavorite: (meetupId) => {},
  itemIsFavorite: (meetupId) => {},
});

export function FavoritesContextProvider(props) {
  const [userFavorites, setUserFavorites] = useState(
    favorites ? JSON.parse(favorites) : []
  );

  const addFavoritesHandler = (favoriteMeetup) => {
    let newFavorites = [...userFavorites, favoriteMeetup];
    setUserFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const removeFavoritesHandler = (meetupId) => {
    let favorites = [...userFavorites];
    let deletedFavoriteIndex = favorites.findIndex(
      (favoriteMeetup) => favoriteMeetup.id === meetupId
    );
    favorites.splice(deletedFavoriteIndex, 1);
    setUserFavorites(favorites);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  const itemIsFavoritesHandler = (meetupId) => {
    return userFavorites.some((meetup) => meetup.id === meetupId);
  };

  const context = {
    favorites: userFavorites,
    totalFavorites: userFavorites.length,
    addFavorite: addFavoritesHandler,
    removeFavorite: removeFavoritesHandler,
    itemIsFavorite: itemIsFavoritesHandler,
  };
  return (
    <FavoritesContext.Provider value={context}>
      {props.children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContext;
