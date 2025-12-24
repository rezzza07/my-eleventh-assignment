import React, { useContext } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import OrderModal from "./OrderModal";
import { AuthContext } from "../../../context/AuthContext/AuthContext";
import Swal from "sweetalert2";
import { AiOutlineHeart } from "react-icons/ai";
import Loading from "../../../components/Loading/Loading";

const BookDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { data: book = {}, isLoading } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/books/${id}`);
      return res.data;
    },
  });

  const handleAddToWishlist = async () => {
    if (!user) {
      return Swal.fire("Please login to add to wishlist");
    }

    try {
      await axiosSecure.post("/wishlist", {
        userId: user.uid,
        bookId: book._id,
      });
      Swal.fire("Success", "Book added to your wishlist", "success");
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  if (isLoading) {
    return <Loading></Loading>;
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
          <p className="text-sm sm:text-base text-secondary font-medium mb-2">
            <span className="font-semibold">Author:</span> {book.author}
          </p>

          {/* Description */}
          <p className="text-base text-base-content/80 mb-4 leading-relaxed">
            <span className="font-semibold">Description:</span> {book.description}
          </p>

          {/* Price */}
          <p className="text-2xl sm:text-3xl font-bold text-secondary mb-6">
            ${book.price}
          </p>


          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              className="btn btn-primary text-white px-6 py-3 rounded-xl hover:scale-105 transition-transform"
              onClick={() => document.getElementById("order_modal").showModal()}
            >
              Order Now
            </button>

            {/* Wishlist Icon */}
            <AiOutlineHeart
              size={36}
              className="cursor-pointer text-secondary hover:text-red-500 transition-colors"
              title="Add to Wishlist"
              onClick={handleAddToWishlist}
            />
          </div>
        </div>
      </div>

      {/* Order Modal */}
      <OrderModal book={book} />
    </div>
  );
};

export default BookDetails;
