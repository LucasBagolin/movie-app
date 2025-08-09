import { useState } from "react";
import SearchBar from "../components/SearchBar.jsx";
import { searchMovies } from "../api/tmdb.js";
import { Link } from "react-router-dom";

const IMG = import.meta.env.VITE_TMDB_IMG_BASE;

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function doSearch(p = 1) {
    if (!query.trim()) return;
    try {
      setLoading(true);
      setError("");
      const data = await searchMovies({ query, page: p });
      setResults(data.results || []);
      setTotalPages(data.total_pages || 0);
      setPage(p);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Buscar Filmes</h1>

      <SearchBar
        value={query}
        onChange={(v) => { setQuery(v); setPage(1); }}
        onSubmit={() => doSearch(1)}
      />

      {loading && <p>Carregando...</p>}
      {error && <p style={{color:"red"}}>Erro: {error}</p>}
      {!loading && !error && results.length === 0 && query && <p>Nenhum resultado.</p>}

      {/* Grid simples de cards */}
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

      {/* Paginação básica */}
      {totalPages > 1 && (
        <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
          <button onClick={() => doSearch(1)} disabled={page === 1 || loading}>« Primeiro</button>
          <button onClick={() => doSearch(page - 1)} disabled={page === 1 || loading}>‹ Anterior</button>
          <span>Página {page} de {totalPages}</span>
          <button onClick={() => doSearch(page + 1)} disabled={page === totalPages || loading}>Próximo ›</button>
          <button onClick={() => doSearch(totalPages)} disabled={page === totalPages || loading}>Último »</button>
        </div>
      )}
    </div>
  );
}
