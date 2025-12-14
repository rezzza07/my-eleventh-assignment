import React from "react";
import { Link, NavLink } from "react-router";
import Logo from "../../components/Logo/Logo";


const Navbar = () => {

    const links = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/all-books">All Books</NavLink></li>
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
    </>


    return (
        <div className="navbar bg-base-100 shadow-md px-4 sticky top-0 z-50">

            {/* LEFT — Logo + Website Name */}
            <div className="navbar-start">
                {/* Mobile Hamburger */}
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </label>

                    {/* Mobile Dropdown Menu */}
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                    >
                       {links}
                    </ul>
                </div>

                {/*BookCourier*/}
                <Logo></Logo>
                
            </div>

            {/* CENTER — Desktop Menu */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-md gap-2">
                 {links}
                </ul>
            </div>

            {/* RIGHT — Theme Toggle + Login */}
            <div className="navbar-end flex items-center gap-3">


                {/* Login Btn */}
                <Link to="/login" className="btn btn-primary rounded-full text-secondary px-5">
                    Login
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
