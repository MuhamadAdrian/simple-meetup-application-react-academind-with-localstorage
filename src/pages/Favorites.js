import MeetupList from "../components/meetups/MeetupList";
import { useContext } from "react";
import FavoritesContext from "../store/favorites-context";

function FavoritesPage() {
  const favoriteCtx = useContext(FavoritesContext);
  let content;
  if (favoriteCtx.totalFavorites <= 0) {
    content = <p>No more favorites you added</p>;
  } else {
    content = <MeetupList meetups={favoriteCtx.favorites} />;
  }
  return (
    <section>
      <h1>Favorites</h1>
      {content}
    </section>
  );
}

export default FavoritesPage;
