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
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header (same style as Add Books) */}
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-md">
            My Books
          </h2>
          <span className="block w-24 h-1 bg-secondary rounded-full mt-2"></span>
        </div>

        {/* Table Card */}
        <div className="bg-base-100 shadow-2xl rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-primary text-primary-content">
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Author</th>
                  <th>Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {books.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-10 opacity-60">
                      No books added yet
                    </td>
                  </tr>
                ) : (
                  books.map((book) => (
                    <tr
                      key={book._id}
                      className="hover:bg-secondary/10 transition-all"
                    >
                      <td>
                        <img
                          src={book.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
                          alt={book.name}
                          className="w-16 h-16 object-cover rounded-xl border"
                        />
                      </td>

                      <td className="font-semibold">{book.name}</td>

                      <td>{book.author}</td>

                      <td>
                        <span
                          className={`badge font-semibold ${
                            book.status === "published"
                              ? "badge-success"
                              : "badge-warning"
                          }`}
                        >
                          {book.status}
                        </span>
                      </td>

                      <td className="text-center">
                        <Link
                          to={`/dashboard/edit-book/${book._id}`}
                          className="btn btn-sm btn-outline btn-primary min-w-[90px]"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MyBooks;
