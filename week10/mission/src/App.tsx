import "./App.css";
import HomePage from "./pages/HomePage.tsx";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import MovieDetailPage from "./pages/MovieDetailPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/:id",
    element: <MovieDetailPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
