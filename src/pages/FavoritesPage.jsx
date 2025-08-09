import { useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";
import MovieCard from "../components/MovieCard.jsx";

export default function FavoritesPage() {
  const { favorites, remove, isFavorite } = useContext(FavoritesContext);

  if (favorites.length === 0) {
    return (
      <div>
        <h1>Favoritos</h1>
        <p>Nenhum filme nos favoritos.</p>
        <Link to="/">Ir buscar filmes</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Favoritos</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: 12,
        }}
      >
        {favorites.map((m) => (
          <MovieCard
            key={m.id}
            movie={m}
            // aqui o botão remove direto dos favoritos
            onToggleFavorite={() => remove(m.id)}
            // passa isFavorite para o rótulo mostrar "Remover"
            isFavorite={isFavorite}
          />
        ))}
      </div>
    </div>
  );
}
