import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../api/tmdb";
import { FavoritesContext } from "../context/FavoritesContext";
import s from "./DetailsPage.module.css";

const IMG = import.meta.env.VITE_TMDB_IMG_BASE;

export default function DetailsPage() {
  const { id } = useParams();
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
  if (status === "error") return <p style={{ color: "red" }}>Erro: {msg}</p>;
  if (!movie) return null;

  const diretor =
    movie.credits?.crew?.find((p) => p.job === "Director")?.name || "—";
  const elenco =
    (movie.credits?.cast || []).slice(0, 5).map((p) => p.name).join(", ") ||
    "—";

  const year = (movie.release_date || "").slice(0, 4);
  const poster = movie.poster_path
    ? `${IMG}/w342${movie.poster_path}`
    : "https://via.placeholder.com/342x513?text=Sem+Poster";
  const fav = isFavorite(movie.id);

  return (
    <div>
      <Link className={s.back} to="/">
        ← Voltar
      </Link>

      <div className={s.wrap} aria-busy={status === "loading"}>
        <img className={s.poster} src={poster} alt={movie.title} />

        <div className={s.info}>
          <h1 className={s.title}>
            {movie.title} {year && <span className={s.year}>({year})</span>}
          </h1>

          <p className={s.row}>
            <b>Nota:</b> {movie.vote_average?.toFixed?.(1) ?? "—"}
          </p>
          <p className={s.row}>
            <b>Duração:</b> {movie.runtime ? `${movie.runtime} min` : "—"}
          </p>
          <p className={s.row}>
            <b>Diretor:</b> {diretor}
          </p>
          <p className={s.row}>
            <b>Elenco:</b> {elenco}
          </p>
          <p className={`${s.row} ${s.overview}`}>
            <b>Sinopse:</b> {movie.overview || "Sem sinopse."}
          </p>

          <button
            className={s.fav}
            aria-pressed={!!fav}
            onClick={() =>
              toggle({
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                release_date: movie.release_date,
                vote_average: movie.vote_average,
              })
            }
          >
            {fav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          </button>
        </div>
      </div>
    </div>
  );
}
