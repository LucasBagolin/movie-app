import { Link } from "react-router-dom";

const IMG = import.meta.env.VITE_TMDB_IMG_BASE;

// movieMin = { id, title, poster_path, release_date, vote_average }
export default function MovieCard({ movie, onToggleFavorite, isFavorite, showFavButton = true }) {
  const year = (movie.release_date || "").slice(0, 4);
  const fav = isFavorite?.(movie.id);

  return (
    <div style={{ border: "1px solid #333", padding: 8 }}>
      <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <img
          src={
            movie.poster_path
              ? `${IMG}/w342${movie.poster_path}`
              : "https://via.placeholder.com/342x513?text=Sem+Poster"
          }
          alt={movie.title}
          style={{ width: "100%", height: 240, objectFit: "cover" }}
        />
        <h3 style={{ fontSize: 16, marginTop: 8 }}>{movie.title}</h3>
        <p style={{ opacity: 0.7 }}>{year}</p>
      </Link>

      {showFavButton && onToggleFavorite && (
        <button
          aria-pressed={!!fav}
          onClick={() => onToggleFavorite(movie)}
          style={{ marginTop: 8 }}
        >
          {fav ? "Remover favorito" : "Favoritar"}
        </button>
      )}
    </div>
  );
}
