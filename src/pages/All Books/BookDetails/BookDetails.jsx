import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import OrderModal from "./OrderModal";



const BookDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();


  const { data: book = {}, isLoading } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/books/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-10">
      {/* Card Container */}
      <div className="card lg:card-side bg-base-100 shadow-2xl rounded-3xl overflow-hidden border-2 border-primary">

        {/* Book Image */}
        <figure className="lg:w-1/2 h-96 overflow-hidden">
          <img
            src={book.image}
            alt={book.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </figure>

        {/* Book Details */}
        <div className="card-body lg:w-1/2 p-8">
          <h2 className="card-title text-4xl font-extrabold text-primary mb-3">{book.name}</h2>
          <p className="text-secondary mb-2"><strong>Author:</strong> {book.author}</p>
          <p className="mb-4 text-base-content/80">{book.description}</p>
          <p className="text-2xl font-bold text-secondary mb-6">${book.price}</p>

          <button
            className="btn btn-primary text-white px-6 py-3 rounded-xl hover:scale-105 transition-transform"
            onClick={() => document.getElementById("order_modal").showModal()}
          >
            Order Now
          </button>
        </div>
      </div>

      {/* Order Modal */}
      <OrderModal book={book} />
    </div>
  );
};

export default BookDetails;
