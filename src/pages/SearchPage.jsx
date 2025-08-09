import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext.jsx";

export default function SearchPage() {
  const { favorites, toggle, isFavorite } = useContext(FavoritesContext);

  const dummy = { id: 1, title: "Filme Exemplo" };

  return (
    <div>
      <h1>SearchPage</h1>
      <p>Favoritos: {favorites.length}</p>

      <button onClick={() => toggle(dummy)}>
        {isFavorite(dummy.id) ? "Remover favorito" : "Adicionar favorito"}
      </button>
    </div>
  );
}