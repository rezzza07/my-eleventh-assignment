import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../pages/Home/Home/Home";
import AllBooks from "../pages/All Books/AllBooks";
import LatestBooks from "../pages/Home/Home/LatestBooks";

export const router = createBrowserRouter([
  {
     path: "/",
     Component: RootLayout,
     children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'all-books',
        Component:AllBooks
      },
      {
        path:'/latest-books',
        Component:LatestBooks
      }
    ]
  },
]);