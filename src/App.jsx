import { Link } from "react-router-dom";
import AppRouter from "./router/AppRouter.jsx";

export default function App() {
  return (
    <>
      <header style={{ padding: 12 }}>
        <nav style={{ display: "flex", gap: 12 }}>
          <Link to="/">Busca</Link>
          <Link to="/favorites">Favoritos</Link>
        </nav>
      </header>

      <main style={{ padding: 12 }}>
        <AppRouter />
      </main>
    </>
  );
}
