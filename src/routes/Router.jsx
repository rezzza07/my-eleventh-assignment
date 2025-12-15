import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../pages/Home/Home/Home";
// import AllBooks from "../pages/All Books/AllBooks";
// import LatestBooks from "../pages/Home/Home/LatestBooks";
import Login from "../Pages/Auth/Login/Login";

import AuthLayout from "../Layout/AuthLayout";
import Register from "../pages/Auth/Register/Register";

export const router = createBrowserRouter([
  {
     path: "/",
     Component: RootLayout,
     children: [
      {
        index: true,
        Component: Home
      },
      // {
      //   path: 'all-books',
      //   Component:AllBooks
      // },
      // {
      //   path:'/latest-books',
      //   Component:LatestBooks
      // }
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      }
    ]
  },
]);