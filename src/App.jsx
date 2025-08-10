import { Link } from "react-router-dom";
import AppRouter from "./router/AppRouter.jsx";
import Footer from "./components/Footer.jsx";
import s from "./App.module.css";
export default function App() {
  return (
    <div className="app-shell">
      <header className={s.header}>
        <nav className={s.nav}>
          <span className={s.brand}>🎬 MovieApp</span>
          <Link className={s.link} to="/">Busca</Link>
          <Link className={s.link} to="/favorites">Favoritos</Link>
        </nav>
      </header>

      <main className={`app-main ${s.main}`}>
        <AppRouter />
      </main>

      <Footer />
    </div>
  );
}