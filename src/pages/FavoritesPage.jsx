import { useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";
import MovieCard from "../components/MovieCard.jsx";
import s from "./FavoritesPage.module.css";

export default function FavoritesPage() {
  const { favorites, remove, isFavorite } = useContext(FavoritesContext);

  if (favorites.length === 0) {
    return (
      <div className={s.container}>
        <h1 className={s.title}>Favoritos</h1>
        <p>Nenhum filme nos favoritos.</p>
        <Link to="/">Ir buscar filmes</Link>
      </div>
    );
  }

  return (
    <div className={s.container}>
      <h1 className={s.title}>Favoritos</h1>

      <div className={s.grid}>
        {favorites.map((m) => (
          <MovieCard
            key={m.id}
            movie={m}
            onToggleFavorite={() => remove(m.id)}
            isFavorite={isFavorite}
          />
        ))}
      </div>
    </div>
  );
}