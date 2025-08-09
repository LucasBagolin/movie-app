import { useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";

const IMG = import.meta.env.VITE_TMDB_IMG_BASE;

export default function FavoritesPage() {
  const { favorites, remove } = useContext(FavoritesContext);

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
          <div key={m.id} style={{ border: "1px solid #333", padding: 8 }}>
            <Link
              to={`/movie/${m.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img
                src={
                  m.poster_path
                    ? `${IMG}/w342${m.poster_path}`
                    : "https://via.placeholder.com/342x513?text=Sem+Poster"
                }
                alt={m.title}
                style={{ width: "100%", height: 240, objectFit: "cover" }}
              />
              <h3 style={{ fontSize: 16, marginTop: 8 }}>{m.title}</h3>
              <p style={{ opacity: 0.7 }}>{(m.release_date || "").slice(0, 4)}</p>
            </Link>

            <button onClick={() => remove(m.id)} style={{ marginTop: 8 }}>
              Remover
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
