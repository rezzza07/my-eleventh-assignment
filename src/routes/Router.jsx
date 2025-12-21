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
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancel from "../pages/Dashboard/Payment/PaymentCancel";
import Invoices from "../pages/Dashboard/Invoices/Invoices";
import Librarian from "../pages/Librarian/Librarian";
import ApproveLibrarians from "../pages/Dashboard/Approve Librarians/ApproveLibrarians";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";

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
      },
      {
        path: 'librarian',
        element: <PrivateRoute>
          <Librarian></Librarian>
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
        path: 'my-orders',
        Component: MyOrders
      },
      {
        path: 'payment/:orderId',
        Component: Payment
      },
      {
        path: 'invoices',
        Component: Invoices
      },
      {
        path: 'payment-success',
        Component: PaymentSuccess
      },
      {
        path: 'payment-cancelled',
        Component: PaymentCancel
      },
      {
        path:'approve-librarians',
        Component:ApproveLibrarians
      },
      {
        path:'manage-users',
        Component:ManageUsers
      }
    ]
  }
]);