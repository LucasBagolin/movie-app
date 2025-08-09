import { render, screen, fireEvent } from "@testing-library/react";
import { useContext } from "react";
import { FavoritesContext, FavoritesProvider } from "./FavoritesContext";

// Componente de prova para interagir com o contexto
function Probe() {
  const { favorites, toggle, isFavorite, remove } = useContext(FavoritesContext);
  const dummy = { id: 42, title: "Dummy" };
  return (
    <div>
      <span data-testid="count">{favorites.length}</span>
      <span data-testid="isFav">{String(isFavorite(42))}</span>
      <button onClick={() => toggle(dummy)}>toggle</button>
      <button onClick={() => remove(42)}>remove</button>
    </div>
  );
}

describe("FavoritesContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("adiciona e remove favoritos e persiste no localStorage", () => {
    render(
      <FavoritesProvider>
        <Probe />
      </FavoritesProvider>
    );

    // inicial vazio
    expect(screen.getByTestId("count")).toHaveTextContent("0");
    expect(screen.getByTestId("isFav")).toHaveTextContent("false");

    // toggle -> adiciona
    fireEvent.click(screen.getByText("toggle"));
    expect(screen.getByTestId("count")).toHaveTextContent("1");
    expect(screen.getByTestId("isFav")).toHaveTextContent("true");

    // recarrega estado a partir do localStorage (simulação simples)
    const stored = JSON.parse(localStorage.getItem("@movies/favorites"));
    expect(stored).toHaveLength(1);
    expect(stored[0].id).toBe(42);

    // remove
    fireEvent.click(screen.getByText("remove"));
    expect(screen.getByTestId("count")).toHaveTextContent("0");
    expect(screen.getByTestId("isFav")).toHaveTextContent("false");
  });
});
