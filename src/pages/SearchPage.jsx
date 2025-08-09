import { useState, useCallback, useEffect } from "react";
import SearchBar from "../components/SearchBar.jsx";
import { searchMovies } from "../api/tmdb.js";
import { Link } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import EmptyState from "../components/EmptyState.jsx";
import Pagination from "../components/Pagination.jsx";
import useDebounce from "../hooks/useDebounce.js";

const IMG = import.meta.env.VITE_TMDB_IMG_BASE;

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 600);

  const [page, setPage] = useState(1);
  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  // dispara busca automática quando o valor "debounced" muda
  // (opcional: pode deixar só no submit se preferir)
  useEffect(() => { if (debouncedQuery) doSearch(debouncedQuery, 1); }, [debouncedQuery, doSearch]);

  return (
    <div>
      <h1>Buscar Filmes</h1>

      <SearchBar
        value={query}
        onChange={(v) => { setQuery(v); setPage(1); }}
        onSubmit={() => doSearch(query, 1)}
      />

      {loading && <Loader />}
      {error && <ErrorMessage message={error} onRetry={() => doSearch(query, page)} />}

      {!loading && !error && !query && <EmptyState message="Digite um termo e clique em Buscar." />}
      {!loading && !error && query && results.length === 0 && <EmptyState message="Nenhum resultado encontrado." />}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
        {results.map((m) => (
          <div key={m.id} style={{ border: "1px solid #333", padding: 8 }}>
            <Link to={`/movie/${m.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <img
                src={m.poster_path ? `${IMG}/w342${m.poster_path}` : "https://via.placeholder.com/342x513?text=Sem+Poster"}
                alt={m.title}
                style={{ width: "100%", height: 240, objectFit: "cover" }}
              />
              <h3 style={{ fontSize: 16, marginTop: 8 }}>{m.title}</h3>
              <p style={{ opacity: 0.7 }}>{(m.release_date || "").slice(0,4)}</p>
            </Link>
          </div>
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
