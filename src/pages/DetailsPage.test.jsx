import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import DetailsPage from "./DetailsPage";
import { FavoritesProvider } from "../context/FavoritesContext";

vi.mock("../api/tmdb", () => ({
  getMovieDetails: vi.fn(),
}));
import { getMovieDetails } from "../api/tmdb";

function renderWithRoute(initialPath = "/movie/603") {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <FavoritesProvider>
        <Routes>
          <Route path="/movie/:id" element={<DetailsPage />} />
        </Routes>
      </FavoritesProvider>
    </MemoryRouter>
  );
}

it("renderiza diretor, elenco e sinopse", async () => {
  getMovieDetails.mockResolvedValueOnce({
    id: 603,
    title: "The Matrix",
    release_date: "1999-03-30",
    vote_average: 8.2,
    runtime: 136,
    overview: "Bem-vindo à Matrix.",
    poster_path: null,
    credits: {
      crew: [{ job: "Director", name: "Lana Wachowski" }],
      cast: [{ name: "Keanu Reeves" }, { name: "Carrie-Anne Moss" }],
    },
  });

  renderWithRoute("/movie/603");

  // título
  expect(await screen.findByText(/The Matrix/i)).toBeInTheDocument();
  // diretor
  expect(screen.getByText(/Diretor:/i).parentElement).toHaveTextContent(/Lana Wachowski/);
  // sinopse
  expect(screen.getByText(/Sinopse:/i).parentElement).toHaveTextContent("Bem-vindo à Matrix.");
});
