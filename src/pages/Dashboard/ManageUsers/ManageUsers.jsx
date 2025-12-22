import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FaBook, FaCalendarAlt, FaDollarSign, FaReceipt, FaUserCircle, FaUserShield, FaUserSlash } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { MdLocalLibrary } from 'react-icons/md';
import Swal from 'sweetalert2';

const ManageUsers = () => {

    const axiosSecure = useAxiosSecure();
    const [searchText, setSearchText] = useState('')
    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users', searchText],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?searchText=${searchText}`);
            return res.data;
        }
    })

    const handleMakeAdmin = user => {
        const roleInfo = { role: 'admin' }
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        title: `${user.displayName} marked as an Admin`,
                        icon: "success",
                        confirmButtonColor: "#3085d6"
                    });
                }
            })
    }

    const handleRemoveAdmin = user => {
        const roleInfo = { role: 'user' };

        axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: `${user.displayName} removed from Admin`,
                        icon: "success",
                        confirmButtonColor: "#3085d6"
                    });
                }
            });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 p-6">
            <div className="max-w-6xl mx-auto">

                {/* Page Header */}
                <div className="flex flex-col md:flex-row items-center mb-8 gap-3">
                    <FaUserCircle className="text-5xl text-primary animate-bounce" />
                    <div className="flex flex-col">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-md">
                            Manage Users
                        </h2>
                        <span className="w-24 h-1 bg-secondary rounded-full mt-2"></span>
                    </div>
                </div>

                {/* Search */}
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="flex justify-center mb-6"
                >

                    <div className="flex items-center w-full max-w-sm bg-base-100 rounded-full border border-primary px-3 py-1 shadow-sm gap-2">
                        <input
                            onChange={(e) => setSearchText(e.target.value)}
                            type="search"
                            name="location"
                            placeholder="Search user"
                            className="input input-ghost w-full h-8 px-1 text-xs focus:outline-none"
                        />

                        <button
                            type="submit"
                            className="btn btn-xs rounded-full bg-primary text-secondary border-none hover:bg-primary-focus"
                        >
                            Search
                        </button>
                    </div>
                </form>


                {/* Table Card */}
                <div className="bg-base-100 shadow-2xl rounded-3xl overflow-hidden">
                    <table className="table w-full">
                        {/* Table Head */}
                        <thead className="bg-primary text-primary-content">
                            <tr>
                                <th className="whitespace-nowrap">#</th>
                                <th className="whitespace-nowrap">
                                    <div className="flex items-center gap-1">
                                        <FaReceipt /> Name
                                    </div>
                                </th>
                                <th className="whitespace-nowrap">
                                    <div className="flex items-center gap-1">
                                        <FaBook /> Email
                                    </div>
                                </th>
                                <th className="whitespace-nowrap">
                                    <div className="flex items-center gap-1">
                                        <FaDollarSign /> Role
                                    </div>
                                </th>
                                <th className="whitespace-nowrap">
                                    <div className="flex items-center gap-1">
                                        <FaCalendarAlt /> Admin Actions
                                    </div>
                                </th>
                                <th className="whitespace-nowrap">
                                    <div className="flex items-center gap-1">
                                        <FaCalendarAlt /> Date
                                    </div>
                                </th>
                            </tr>
                        </thead>




                        {/* Table Body */}
                        <tbody>

                            {users.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="text-center py-10 text-base-content/50">
                                        No users found
                                    </td>
                                </tr>
                            )}

                            {users.map((user, index) => (
                                <tr
                                    key={user._id}
                                    className="hover:bg-secondary/10 transition-all duration-300"
                                >
                                    <td className="font-semibold">{index + 1}</td>

                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                                                        alt={user.displayName || "User avatar"}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{user.displayName}</div>
                                            </div>
                                        </div>
                                    </td>




                                    <td className="font-semibold text-primary">
                                        {user.email}
                                    </td>

                                    <td className="font-semibold text-primary">
                                        {user.role}
                                    </td>



                                    <td className="text-sm">
                                        <div className="flex gap-2 justify-center">

                                            {user.role === 'admin' ? (
                                                <button
                                                    onClick={() => handleRemoveAdmin(user)}
                                                    title="Remove Admin"
                                                    className="btn btn-square btn-outline btn-warning"
                                                >
                                                    <FaUserSlash className="text-lg" />
                                                </button>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() => handleMakeAdmin(user)}
                                                        title="Make Admin"
                                                        className="btn btn-square btn-outline btn-primary"
                                                    >
                                                        <FaUserShield className="text-lg" />
                                                    </button>


                                                </>
                                            )}
                                            <button
                                                title="Make Librarian"
                                                className="btn btn-square btn-outline btn-secondary"
                                            >
                                                <MdLocalLibrary className="text-lg" />
                                            </button>

                                        </div>
                                    </td>


                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default ManageUsers;