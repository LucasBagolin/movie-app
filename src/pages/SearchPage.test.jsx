import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SearchPage from "./SearchPage";
import { FavoritesProvider } from "../context/FavoritesContext";

// Mock da API
vi.mock("../api/tmdb.js", () => ({
  searchMovies: vi.fn(),
}));
import { searchMovies } from "../api/tmdb.js";

function renderWithProviders(ui) {
  return render(
    <MemoryRouter>
      <FavoritesProvider>{ui}</FavoritesProvider>
    </MemoryRouter>
  );
}

describe("SearchPage", () => {
  it("mostra resultados quando a API retorna dados", async () => {
    searchMovies.mockResolvedValueOnce({
      results: [
        { id: 1, title: "Matrix", poster_path: null, release_date: "1999-03-30", vote_average: 8.2 },
      ],
      total_pages: 1,
    });

    renderWithProviders(<SearchPage />);

    fireEvent.change(screen.getByPlaceholderText(/Busque um filme/i), {
      target: { value: "matrix" },
    });
    fireEvent.click(screen.getByRole("button", { name: /buscar/i }));

    // aguarda o card aparecer
    expect(await screen.findByText("Matrix")).toBeInTheDocument();
  });

  it("mostra componente de erro quando a API falha", async () => {
    searchMovies.mockRejectedValueOnce(new Error("HTTP 429 - rate limit"));
    renderWithProviders(<SearchPage />);

    fireEvent.change(screen.getByPlaceholderText(/Busque um filme/i), {
      target: { value: "abc" },
    });
    fireEvent.click(screen.getByRole("button", { name: /buscar/i }));

    expect(await screen.findByText(/Erro:/i)).toBeInTheDocument();
    expect(screen.getByText(/429/)).toBeInTheDocument();
  });
});
