import { useState } from "react";
import { searchMovies } from "../api/tmdb";

export default function SearchPage() {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [total, setTotal] = useState(null);
  const [msg, setMsg] = useState("");

  async function testarBusca() {
    try {
      setStatus("loading");
      setMsg("");
      const data = await searchMovies({ query: "matrix", page: 1 });
      setTotal(data.total_results);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setMsg(err.message);
    }
  }

  return (
    <div>
      <h1>SearchPage</h1>

      <button onClick={testarBusca} disabled={status === "loading"}>
        {status === "loading" ? "Buscando..." : "Testar busca 'matrix'"}
      </button>

      {status === "success" && <p>Total de resultados: {total}</p>}
      {status === "error" && <p style={{ color: "red" }}>Erro: {msg}</p>}
    </div>
  );
}
