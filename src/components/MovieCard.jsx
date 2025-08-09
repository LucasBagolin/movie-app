import { Link } from "react-router-dom";
import s from "./MovieCard.module.css";
const IMG = import.meta.env.VITE_TMDB_IMG_BASE;

export default function MovieCard({ movie, onToggleFavorite, isFavorite, showFavButton=true }) {
  const year = (movie.release_date || "").slice(0,4);
  const fav = isFavorite?.(movie.id);
  return (
    <div className={s.card}>
      <Link to={`/movie/${movie.id}`} style={{ textDecoration:"none", color:"inherit" }}>
        <img
          className={s.thumb}
          src={movie.poster_path ? `${IMG}/w342${movie.poster_path}` : "https://via.placeholder.com/342x513?text=Sem+Poster"}
          alt={movie.title}
        />
        <div className={s.body}>
          <h3 className={s.title}>{movie.title}</h3>
          <p className={s.meta}>{year}</p>
        </div>
      </Link>

      {showFavButton && onToggleFavorite && (
        <button
          className={s.fav}
          aria-pressed={!!fav}
          onClick={()=>onToggleFavorite(movie)}
        >
          {fav ? "Remover favorito" : "Favoritar"}
        </button>
      )}
    </div>
  );
}
