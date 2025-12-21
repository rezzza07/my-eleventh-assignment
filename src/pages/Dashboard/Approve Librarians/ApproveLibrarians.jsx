import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { IoIosMail } from 'react-icons/io';
import { MdInfoOutline, MdLocalLibrary, MdMoreVert } from 'react-icons/md';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaUserCheck } from 'react-icons/fa';
import { IoPersonRemoveSharp } from 'react-icons/io5';
import { FaTrashCan } from 'react-icons/fa6';
import Swal from 'sweetalert2';

const ApproveLibrarians = () => {
    const axiosSecure = useAxiosSecure();

    const { refetch, data: librarians = [] } = useQuery({
        queryKey: ['librarians', 'Pending'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/librarian`);
            return res.data;
        }
    })

    const updateLibrarianStatus = (librarian, status) => {
        const updateInfo = { status: status, email: librarian.email };

        axiosSecure.patch(`/librarian/${librarian._id}`, updateInfo)
            .then(() => {
                refetch();
                const isApproved = status === 'Approved';
                Swal.fire({
                    title: status,
                    text: isApproved ? "Congrats! You're a librarian now." : "The librarian request has been rejected.",
                    icon: isApproved ? "success" : "error",
                    confirmButtonColor: isApproved ? "var(--p)" : "#dc2626"
                });
            })
            .catch(err => console.error(err));
    }

    const handleApproval = librarian => {
        updateLibrarianStatus(librarian, 'Approved');
    }

    const handleRejection = librarian => {
        updateLibrarianStatus(librarian, 'Rejected')
    }

    const handleDelete = (librarian) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/librarian/${librarian._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "The librarian request has been removed.",
                                icon: "success",
                                confirmButtonColor: "#3085d6"
                            });
                        }
                    });
            }
        });
    };



    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 p-6">
            <div className="max-w-6xl mx-auto">

                {/* Page Header */}
                <div className="flex flex-col md:flex-row items-center mb-8 gap-3">
                    <MdLocalLibrary className="text-5xl text-primary animate-bounce" />
                    <div className="flex flex-col">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-md">
                            Approve Librarians
                        </h2>
                        <span className="w-24 h-1 bg-secondary rounded-full mt-2"></span>
                    </div>
                </div>

                {/* Table Card */}
                <div className="bg-base-100 shadow-2xl rounded-3xl overflow-hidden">
                    <table className="table w-full">
                        {/* Table Head */}
                        <thead className="bg-primary text-primary-content">
                            <tr>
                                <th className="whitespace-nowrap">#</th>
                                <th className="whitespace-nowrap">
                                    <div className="flex items-center gap-1">
                                        <MdLocalLibrary /> Name
                                    </div>
                                </th>
                                <th className="whitespace-nowrap">
                                    <div className="flex items-center gap-1">
                                        <IoIosMail /> Email
                                    </div>
                                </th>
                                <th className="whitespace-nowrap">
                                    <div className="flex items-center gap-1">
                                        <MdInfoOutline className="text-xl" /> Status
                                    </div>
                                </th>
                                <th className="whitespace-nowrap">
                                    <div className="flex items-center gap-1">
                                        <MdMoreVert className="text-xl cursor-pointer" /> Action
                                    </div>
                                </th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {librarians.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="text-center py-10 text-base-content/50">
                                        No application found
                                    </td>
                                </tr>
                            )}

                            {librarians.map((librarian, index) => (
                                <tr
                                    key={librarian._id}
                                    className="hover:bg-secondary/10 transition-all duration-300"
                                >
                                    <td className="font-semibold">{index + 1}</td>
                                    <td className="text-sm font-bold">{librarian.name}</td>
                                    <td>{librarian.email}</td>
                                    <td className="font-semibold text-primary">
                                        <p
                                            className={
                                                librarian.status === 'Approved'
                                                    ? 'text-green-800'
                                                    : librarian.status === 'Rejected'
                                                        ? 'text-red-600'
                                                        : 'text-secondary'
                                            }
                                        >
                                            {librarian.status}
                                        </p>
                                    </td>

                                    <td className="text-sm flex gap-2 justify-center">
                                        <button
                                            onClick={() => handleApproval(librarian)}
                                            className="btn btn-square btn-outline btn-primary">
                                            <FaUserCheck ></FaUserCheck>
                                        </button>
                                        <button
                                            onClick={() => handleRejection(librarian)}
                                            className='btn btn-square btn-outline btn-warning'>
                                            <IoPersonRemoveSharp></IoPersonRemoveSharp>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(librarian)}
                                            className="btn btn-square btn-outline btn-error">
                                            <FaTrashCan ></FaTrashCan>
                                        </button>

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

export default ApproveLibrarians;