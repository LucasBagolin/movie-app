import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../api/tmdb";
import { FavoritesContext } from "../context/FavoritesContext";

const IMG = import.meta.env.VITE_TMDB_IMG_BASE;

export default function DetailsPage() {
  const { id } = useParams();                 // pega o :id da URL
  const [movie, setMovie] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ok | error
  const [msg, setMsg] = useState("");
  const { toggle, isFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    async function load() {
      try {
        setStatus("loading");
        const data = await getMovieDetails(id);
        setMovie(data);
        setStatus("ok");
      } catch (e) {
        setStatus("error");
        setMsg(e.message);
      }
    }
    load();
  }, [id]);

  if (status === "loading") return <p>Carregando...</p>;
  if (status === "error") return <p style={{color:"red"}}>Erro: {msg}</p>;
  if (!movie) return null;

  const diretor = movie.credits?.crew?.find(p => p.job === "Director")?.name || "—";
  const elenco = (movie.credits?.cast || []).slice(0,5).map(p => p.name).join(", ") || "—";

  return (
    <div>
      <Link to="/">← Voltar</Link>
      <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
        <img
          src={movie.poster_path ? `${IMG}/w342${movie.poster_path}` : "https://via.placeholder.com/342x513?text=Sem+Poster"}
          alt={movie.title}
          style={{ width: 220, objectFit: "cover" }}
        />
        <div>
          <h1>{movie.title} ({(movie.release_date || "").slice(0,4)})</h1>
          <p><b>Nota:</b> {movie.vote_average?.toFixed?.(1) ?? "—"}</p>
          <p><b>Duração:</b> {movie.runtime ? `${movie.runtime} min` : "—"}</p>
          <p><b>Diretor:</b> {diretor}</p>
          <p><b>Elenco:</b> {elenco}</p>
          <p style={{ marginTop: 8 }}><b>Sinopse:</b> {movie.overview || "Sem sinopse."}</p>

          <button
            onClick={() =>
              toggle({
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                release_date: movie.release_date,
                vote_average: movie.vote_average,
              })
            }
            style={{ marginTop: 12 }}
          >
            {isFavorite(movie.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          </button>
        </div>
      </div>
    </div>
  );
}