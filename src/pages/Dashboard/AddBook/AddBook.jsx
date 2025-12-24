import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddBook = () => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      if (!["published", "unpublished"].includes(data.status)) {
        data.status = "unpublished";
      }

      await axiosSecure.post("/my-books", data);

      Swal.fire("Success", "Book added successfully!", "success");
      reset();
    } catch (err) {
      Swal.fire("Error", err.message || "Something went wrong", "error");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-base-100 shadow-lg rounded-lg">
      <div className="flex flex-col md:flex-row items-center mb-8 gap-3">
        <div className="flex flex-col">
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-md">
            Add Books
          </h2>
          <span className="w-24 h-1 bg-secondary rounded-full mt-2"></span>
        </div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <label className="font-bold text-primary">Book Name</label>
        <input
          {...register("name", { required: true })}
          placeholder="Enter Book name"
          className="input input-bordered w-full"
        />

        <label className="font-bold text-primary">Author</label>
        <input
          {...register("author", { required: true })}
          placeholder="Enter Author name"
          className="input input-bordered w-full"
        />

        <label className="font-bold text-primary">Book Image</label>
        <input
          {...register("image")}
          placeholder="Image URL"
          className="input input-bordered w-full"
        />

        <label className="font-bold text-primary">Price</label>
        <input
          type="number"
          {...register("price", { required: true })}
          placeholder="Price"
          className="input input-bordered w-full"
        />

        
        <label className="font-bold text-primary">Book Description</label>
        <textarea
          {...register("description", { required: true })}
          placeholder="Write a short description about the book"
          className="textarea textarea-bordered w-full min-h-[120px]"
        />

        <label className="font-bold text-primary">Pick an option</label>
        <select
          {...register("status")}
          className="select select-bordered w-full"
        >
          <option value="published">Published</option>
          <option value="unpublished">Unpublished</option>
        </select>

        <button type="submit" className="btn btn-primary w-full">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
