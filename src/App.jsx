import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./layout/AppLayout.jsx";
import { Movies } from "./pages/Movies.jsx";
import { TopAnimes } from "./pages/TopAnimes.jsx";
import { Home } from "./pages/Home.jsx";
import { TvSeries } from "./pages/TvSeries.jsx";
import { useState } from "react";
import { AnimeDetail } from "./pages/AnimeDetail.jsx";
import { ViewAllCategory } from "./ui/ViewAllCategory.jsx";


const App = () => {
  const [client] = useState(() => new QueryClient()); 

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home/>,
        },
        {
          path: "/category/:categoryName",
          element: <ViewAllCategory/>,
        },
        {
          path: "/movies",
          element: <Movies/>,
        },
        {
          path: "/tv-series",
          element: <TvSeries/>,
        },
        {
          path: "/top-animes",
          element: <TopAnimes/>,
        },
        {
          path: "/anime-detail",
          element: <AnimeDetail/>,
        }
      ],
    }
    // Define your routes here
  ]);

  return (
    <>
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    </>
  );
};

export default App;