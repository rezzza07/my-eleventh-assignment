import React from "react";
import { Link, NavLink } from "react-router";
import Logo from "../../components/Logo/Logo";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut().catch(console.error);
  };
const links = (
  <>
    <li>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-primary underline decoration-primary decoration-2 text-sm"
            : "text-sm"
        }
      >
        Home
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/all-books"
        className={({ isActive }) =>
          isActive
            ? "text-primary underline decoration-primary decoration-2 text-sm"
            : "text-sm"
        }
      >
        All Books
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive
            ? "text-primary underline decoration-primary decoration-2 text-sm"
            : "text-sm"
        }
      >
        Dashboard
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/librarian"
        className={({ isActive }) =>
          isActive
            ? "text-primary underline decoration-primary decoration-2 text-sm"
            : "text-sm"
        }
      >
        Be A Librarian
      </NavLink>
    </li>
    {user && (
      <li>
        <NavLink
          to="/dashboard/my-orders"
          className={({ isActive }) =>
            isActive
              ? "text-primary underline decoration-primary decoration-2 text-sm"
              : "text-sm"
          }
        >
          My Orders
        </NavLink>
      </li>
    )}
  </>
);


  return (
    <div className="navbar bg-base-100 shadow-md px-4 sticky top-0 z-50">

      {/* LEFT */}
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round"
                strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>

          <ul tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            {links}
          </ul>
        </div>

        <Logo />
      </div>

     
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {links}
        </ul>
      </div>

  
      <div className="navbar-end">

        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="flex items-center gap-2 cursor-pointer">

          
              <div className="avatar">
                <div className="w-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                    alt="profile"
                  />
                </div>
              </div>

       
              <span className="hidden md:block font-medium">
                {user.displayName || "User"}
              </span>

           
              <svg className="w-4 h-4 opacity-70" fill="none"
                stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M19 9l-7 7-7-7" />
              </svg>
            </label>

  
            <ul tabIndex={0}
              className="mt-3 p-3 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-56">
              <li>
                <p className="font-semibold">{user.displayName}</p>
                <p className="text-xs opacity-70">{user.email}</p>
              </li>

              <div className="divider my-1"></div>

              <li>
                <NavLink to="/dashboard/my-profile">My Profile</NavLink>
              </li>

              <li>
                <button onClick={handleLogOut} className="text-error">
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to="/login"
            className="btn btn-primary rounded-full text-secondary px-5"
          >
            Login
          </Link>
        )}

      </div>
    </div>
  );
};

export default Navbar;
