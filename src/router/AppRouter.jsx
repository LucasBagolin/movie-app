import { Routes, Route } from "react-router-dom";
import SearchPage from "../pages/SearchPage";
import DetailsPage from "../pages/DetailsPage";
import FavoritesPage from "../pages/FavoritesPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/movie/:id" element={<DetailsPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
    </Routes>
  );
}