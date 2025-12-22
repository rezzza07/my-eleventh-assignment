import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import Loading from "../../../components/Loading/Loading";
import { Link } from "react-router";

const MyBooks = () => {
    const axiosSecure = useAxiosSecure();

    const { data: books = [], isLoading } = useQuery({
        queryKey: ["myBooks"],
        queryFn: async () => {
            const res = await axiosSecure.get("/my-books");
            return res.data;
        },
    });

    if (isLoading) return <Loading />;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">My Books</h2>
            <div className="overflow-x-auto">
                <table className="table w-full border">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Author</th>
                            <th>Status</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book._id}>
                                <td>
                                    <img
                                        src={book.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
                                        alt={book.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                </td>
                                <td>{book.name}</td>
                                <td>{book.author}</td>
                                <td>
                                    <span className={`badge ${book.status === "published" ? "badge-success" : "badge-warning"}`}>
                                        {book.status}
                                    </span>
                                </td>
                                <td>
                                    <Link to={`/dashboard/edit-book/${book._id}`} className="btn btn-sm btn-warning">
                                        Edit
                                    </Link>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBooks;
