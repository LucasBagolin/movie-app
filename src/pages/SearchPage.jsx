import { useState, useCallback, useEffect, useContext } from "react";
import SearchBar from "../components/SearchBar.jsx";
import { searchMovies } from "../api/tmdb.js";
import Loader from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import EmptyState from "../components/EmptyState.jsx";
import Pagination from "../components/Pagination.jsx";
import useDebounce from "../hooks/useDebounce.js";
import MovieCard from "../components/MovieCard.jsx";
import { FavoritesContext } from "../context/FavoritesContext.jsx";
import s from "./SearchPage.module.css";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 600);

  const [page, setPage] = useState(1);
  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { toggle, isFavorite } = useContext(FavoritesContext);

  const doSearch = useCallback(async (q, p = 1) => {
    if (!q.trim()) return;
    try {
      setLoading(true);
      setError("");
      const data = await searchMovies({ query: q, page: p });
      setResults(data.results || []);
      setTotalPages(data.total_pages || 0);
      setPage(p);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debouncedQuery) doSearch(debouncedQuery, 1);
  }, [debouncedQuery, doSearch]);

  const showStart = !loading && !error && !query && results.length === 0;
  const showNoResults = !loading && !error && !!query && results.length === 0;

  return (
    <div>
      <h1 className={s.title}>Buscar Filmes</h1>

      <SearchBar
        value={query}
        onChange={(v) => {
          setQuery(v);
          setPage(1);
        }}
        onSubmit={() => doSearch(query, 1)}
      />

      {loading && <Loader />}
      {error && (
        <ErrorMessage message={error} onRetry={() => doSearch(query, page)} />
      )}

      {showStart && (
        <EmptyState message="Digite um termo e clique em Buscar." />
      )}
      {showNoResults && (
        <EmptyState message="Nenhum resultado encontrado." />
      )}

      <div className={s.grid} aria-busy={loading}>
        {results.map((m) => (
          <MovieCard
            key={m.id}
            movie={m}
            onToggleFavorite={toggle}
            isFavorite={isFavorite}
          />
        ))}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={(p) => doSearch(query, p)}
        disabled={loading}
      />
    </div>
  );
}
