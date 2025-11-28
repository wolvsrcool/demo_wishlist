import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { WishlistProvider } from "./contexts/WishlistProvider";
import { WishPage } from "./components/WishPage";
import { Container } from "./components/Container";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <WishlistProvider>
          <Container />
        </WishlistProvider>
      ),
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "wish/:id",
          element: <WishPage />,
        },
      ],
    },
  ],
  {
    basename: "/demo_wishlist/",
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
