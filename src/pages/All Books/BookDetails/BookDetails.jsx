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
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure className="lg:w-1/2">
          <img src={book.image} alt={book.name} />
        </figure>

        <div className="card-body">
          <h2 className="card-title text-3xl">{book.name}</h2>
          <p><strong>Author:</strong> {book.author}</p>
          <p>{book.description}</p>
          <p className="font-bold text-xl">${book.price}</p>

          <button
            className="btn btn-primary mt-4"
            onClick={() => document.getElementById("order_modal").showModal()}
          >
            Order Now
          </button>
        </div>
      </div>

      {/* Imported modal */}
      <OrderModal book={book} />
    </div>
  );
};

export default BookDetails;
