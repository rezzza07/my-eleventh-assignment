import React from "react";
import { useForm } from "react-hook-form";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddBook = () => {
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            await axiosSecure.post("/books", data);
            Swal.fire("Success", "Book added successfully!", "success");
            reset();
        } catch (err) {
            Swal.fire("Error", err.message, "error");
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto bg-base-100 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Add Book</h2>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <input {...register("name")} placeholder="Book Name" className="input input-bordered w-full" required />
                <input {...register("author")} placeholder="Author" className="input input-bordered w-full" required />
                <input {...register("image")} placeholder="Image URL" className="input input-bordered w-full" />
                <input type="number" {...register("price")} placeholder="Price" className="input input-bordered w-full" required />
                <select {...register("status")} className="select select-bordered w-full">
                    <option value="published">Published</option>
                    <option value="unpublished">Unpublished</option>
                </select>
                <button type="submit" className="btn btn-primary w-full">Add Book</button>
            </form>
        </div>
    );
};

export default AddBook;
