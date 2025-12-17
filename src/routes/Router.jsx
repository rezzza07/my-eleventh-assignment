import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../pages/Home/Home/Home";
import AllBooks from "../pages/All Books/AllBooks";



import AuthLayout from "../Layout/AuthLayout";
import Register from "../pages/Auth/Register/Register";
import Login from "../pages/Auth/Login/Login";

import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layout/DashboardLayout";
import BookDetails from "../pages/All Books/BookDetails/BookDetails";
import MyOrders from "../pages/Dashboard/MyOrders/MyOrders";

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
        Component: AllBooks
      },
      {
        path: 'books/:id',
        element: <PrivateRoute>
          <BookDetails></BookDetails>
        </PrivateRoute>
      }

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
  {
    path: 'dashboard',
    element: <PrivateRoute>
      <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
    children: [
      {
        path:'my-orders',
        Component: MyOrders
      }
    ]
  }
]);