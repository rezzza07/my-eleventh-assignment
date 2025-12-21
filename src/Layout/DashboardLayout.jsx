import React from 'react';
import { FaReceipt } from 'react-icons/fa6';
import { FiPackage } from 'react-icons/fi';
import { HiOutlineHome } from 'react-icons/hi';
import { IoHome } from 'react-icons/io5';
import { PiPackageFill } from 'react-icons/pi';
import { Link, NavLink, Outlet } from 'react-router';

const DashboardLayout = () => {
    return (
        <div className="drawer lg:drawer-open  max-w-7xl mx-auto">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full border border-b-2 border-primary ">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        {/* Sidebar toggle icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                    </label>
                    <div className="px-4 text-2xl text-primary font-bold">Book Courier Dashboard</div>
                </nav>
                {/* Page content here */}
                <Outlet></Outlet>

            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-primary is-drawer-close:w-14 is-drawer-open:w-64">
                    {/* Sidebar content here */}
                    <ul className="menu w-full grow">

                        {/* List item */}
                        <li>
                            <Link to="/" className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-secondary hover:text-white" data-tip="Homepage">
                                {/* Home icon */}
                                <IoHome className="text-lg" />

                                <span className="is-drawer-close:hidden ">Homepage</span>
                            </Link>
                        </li>

                        {/* Dashboard Links */}
                        <li>
                            <NavLink
                                to="/dashboard/my-orders"
                                className="flex items-center gap-2 text-secondary hover:text-white"
                            >
                                <PiPackageFill className="text-lg" />
                                <span className="is-drawer-close:hidden">My Orders</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/invoices"
                                className="flex items-center gap-2 text-secondary hover:text-white"
                            >
                                <FaReceipt className="text-lg" />
                                <span className="is-drawer-close:hidden">Invoices</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/invoices"
                                className="flex items-center gap-2 text-secondary hover:text-white"
                            >
                                <FaReceipt className="text-lg" />
                                <span className="is-drawer-close:hidden">Approve Librarians</span>
                            </NavLink>
                        </li>


                        {/* List item */}
                        <li>
                            <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-secondary hover:text-white" data-tip="Settings">
                                {/* Settings icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
                                <span className="is-drawer-close:hidden">Settings</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;