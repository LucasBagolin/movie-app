import { createContext, useEffect, useMemo, useState } from "react";

export const FavoritesContext = createContext();

const STORAGE_KEY = "@movies/favorites";

export function FavoritesProvider({ children }) {
  // Estado inicial vindo do localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // sempre que mudar, persiste
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  // helpers
  const isFavorite = (id) => favorites.some((m) => m.id === id);

  const add = (movieMin) =>
    setFavorites((prev) => (isFavorite(movieMin.id) ? prev : [...prev, movieMin]));

  const remove = (id) =>
    setFavorites((prev) => prev.filter((m) => m.id !== id));

  const toggle = (movieMin) => (isFavorite(movieMin.id) ? remove(movieMin.id) : add(movieMin));

  // value memorizado
  const value = useMemo(
    () => ({ favorites, add, remove, toggle, isFavorite }),
    [favorites]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}
