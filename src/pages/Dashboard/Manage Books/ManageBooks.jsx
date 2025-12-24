import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { BiSolidBook } from 'react-icons/bi';

const ManageBooks = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();


    const { data: books = [], isLoading } = useQuery({
        queryKey: ['all-books'],
        queryFn: async () => {
            const res = await axiosSecure.get('/books');
            return res.data;
        }
    });


    const statusMutation = useMutation({
        mutationFn: async ({ bookId, status }) => {
            const res = await axiosSecure.patch(`/books/${bookId}/status`, { status });
            return res.data;
        },
        onSuccess: () => queryClient.invalidateQueries(['all-books']),
    });

    const deleteMutation = useMutation({
        mutationFn: async (bookId) => {
            const res = await axiosSecure.delete(`/books/${bookId}`);
            return res.data;
        },
        onSuccess: () => queryClient.invalidateQueries(['all-books']),
    });

    const handleStatusToggle = (book) => {
        const newStatus = book.status === 'published' ? 'unpublished' : 'published';
        statusMutation.mutate({ bookId: book._id, status: newStatus });
    };

    const handleDelete = (book) => {
        Swal.fire({
            title: `Delete "${book.name}"?`,
            text: "This will also delete all orders for this book!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(book._id);
            }
        });
    };

    if (isLoading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="p-10 min-h-screen">
            <div className="flex flex-col md:flex-row items-center mb-8 gap-3">
                <BiSolidBook className="text-5xl text-primary animate-bounce" />
                <div className="flex flex-col">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-md">
                        Manage Books
                    </h2>
                    <span className="w-24 h-1 bg-secondary rounded-full mt-2"></span>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book) => (
                    <div key={book._id} className="card bg-base-100 shadow-lg rounded-xl overflow-hidden border border-primary">
                        <img
                            src={book.image}
                            alt={book.name}
                            className="h-48 w-full object-cover rounded-t-xl transition-transform duration-500 hover:scale-105"
                        />
                        <div className="card-body p-4 flex flex-col justify-between">
                            <div>
                                <h2 className="font-bold text-primary text-2xl">{book.name}</h2>
                                <p className="text-sm font-semibold text-secondary">Author: {book.author}</p>
                                <p className="font-semibold mt-1 text-secondary">${book.price}</p>
                                <p className="mt-1 text-sm">
                                    <span className='text-secondary font-semibold'>Status:</span>{' '}
                                    <span className={book.status === 'published' ? 'text-green-600' : 'text-red-600'}>
                                        {book.status}
                                    </span>
                                </p>
                            </div>
                            <div className="flex gap-2 mt-4">
                                <button
                                    onClick={() => handleStatusToggle(book)}
                                    className={`btn btn-sm rounded-full ${book.status === 'published'
                                        ? 'bg-primary hover:bg-primary-focus text-white'
                                        : 'bg-primary/80 hover:bg-primary text-white'
                                        }`}
                                >
                                    {book.status === 'published' ? 'Unpublish' : 'Publish'}
                                </button>
                                <button
                                    onClick={() => handleDelete(book)}
                                    className="btn btn-sm bg-primary hover:bg-primary-focus text-white rounded-full"
                                >
                                    Delete
                                </button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageBooks;
