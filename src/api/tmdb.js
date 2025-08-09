const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// Pequeno helper: faz fetch e trata erro de HTTP
async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status} - ${text}`);
  }
  return res.json();
}

// Busca de filmes
export async function searchMovies({ query, page = 1, language = "pt-BR" }) {
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
    query
  )}&page=${page}&include_adult=false&language=${language}`;
  return fetchJson(url);
}

// Detalhes + créditos (diretor/elenco)
export async function getMovieDetails(id, language = "pt-BR") {
  const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=${language}&append_to_response=credits`;
  return fetchJson(url);
}