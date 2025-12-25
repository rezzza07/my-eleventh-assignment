import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

const LatestBooks = () => {
    const axiosSecure = useAxiosSecure();

    const { data: books = [] } = useQuery({
        queryKey: ['latest-books'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/latest-books`);
            return res.data;
        }
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 p-10">

            {/* Title */}
            <h1 className="text-5xl font-extrabold text-center mb-12
              bg-clip-text text-transparent
              bg-gradient-to-r from-primary to-secondary
              drop-shadow-lg">
                Latest Books
            </h1>

            {/* Books Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {books.map(book => (
                    <Link
                        to={`/books/${book._id}`}
                        key={book._id}
                        className="transform hover:scale-105 transition-transform duration-300"
                    >
                        <div className="card bg-primary shadow-2xl rounded-3xl border-2 border-secondary overflow-hidden">

                            {/* Image */}
                            <figure className="h-64 overflow-hidden rounded-t-3xl">
                                <img
                                    src={book.image}
                                    alt={book.name}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                />
                            </figure>

                            {/* Content */}
                            <div className="card-body p-6">
                                <h2 className="card-title text-white font-bold text-xl truncate">
                                    {book.name}
                                </h2>

                                <p className="text-secondary">
                                    Author: <span className="font-semibold">{book.author}</span>
                                </p>

                                <p className="text-white">
                                    Status:{' '}
                                    <span className="badge badge-outline badge-secondary">
                                        {book.status}
                                    </span>
                                </p>

                                <p className="font-extrabold text-secondary text-lg">
                                    Price: ${book.price}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default LatestBooks;
