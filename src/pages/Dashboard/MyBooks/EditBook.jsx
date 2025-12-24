import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading/Loading";

const EditBooks = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { register, handleSubmit, setValue } = useForm();

  const { data: myBook, isLoading } = useQuery({
    queryKey: ["myBook", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-books/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (myBook) {
      setValue("name", myBook.name);
      setValue("author", myBook.author);
      setValue("image", myBook.image);
      setValue("price", myBook.price);
      setValue("status", myBook.status);
      setValue("description", myBook.description);
    }
  }, [myBook, setValue]);

  const onSubmit = (data) => {
    axiosSecure
      .patch(`/my-books/${id}`, data)
      .then(() => {
        queryClient.invalidateQueries(["myBooks"]);
        queryClient.invalidateQueries(["myBook", id]);
        Swal.fire("Success", "Book updated successfully!", "success");
      })
      .catch(() => {
        Swal.fire("Error", "Update failed", "error");
      });
  };

  if (isLoading || !myBook) return <Loading />;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-base-100 shadow-lg rounded-lg">
      <div className="mb-6">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
          Edit Book
        </h2>
        <span className="block w-20 h-1 bg-secondary rounded-full mt-2" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <label className="font-bold text-primary">Book Name</label>
        <input
          {...register("name", { required: true })}
          className="input input-bordered w-full"
          placeholder="Enter Book Name"
        />

        <label className="font-bold text-primary">Author</label>
        <input
          {...register("author", { required: true })}
          className="input input-bordered w-full"
          placeholder="Author"
        />

        <label className="font-bold text-primary">Book Image</label>
        <input
          {...register("image")}
          className="input input-bordered w-full"
          placeholder="Image URL"
        />

        <label className="font-bold text-primary">Price</label>
        <input
          type="number"
          {...register("price", { required: true })}
          className="input input-bordered w-full"
          placeholder="Price"
        />

        <label className="font-bold text-primary">Book Description</label>
        <textarea
          {...register("description", { required: true })}
          className="textarea textarea-bordered w-full min-h-[120px]"
          placeholder="Book description"
        />

        <label className="font-bold text-primary">Pick an option</label>
        <select {...register("status")} className="select select-bordered w-full">
          <option value="published">Published</option>
          <option value="unpublished">Unpublished</option>
        </select>

        <button type="submit" className="btn btn-primary w-full">
          Update Book
        </button>
      </form>
    </div>
  );
};

export default EditBooks;
