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
    })
    return (
        <div className="p-10 bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 min-h-screen">

            {/* Page Title */}
            <div className="text-center mb-10">
                <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-md">
                    Latest Books
                </h2>
                <span className="w-24 h-1 bg-secondary rounded-full mt-3 block mx-auto"></span>
            </div>

            {/* Books Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {books.map((book) => (
                    <Link to={`/books/${book._id}`} key={book._id}>
                        <div className="card bg-base-100 shadow-2xl rounded-3xl overflow-hidden border-2 border-primary hover:scale-105 transform transition-all duration-300">

                            {/* Book Image */}
                            <figure className="h-64 overflow-hidden">
                                <img
                                    src={book.image}
                                    alt={book.name}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                />
                            </figure>

                            {/* Book Details */}
                            <div className="card-body">
                                <h2 className="card-title text-primary text-xl font-bold truncate">{book.name}</h2>
                                <p className="text-secondary">Author: {book.author}</p>
                                <p>Status: <span className="badge badge-secondary">{book.status}</span></p>
                                <p className="font-bold text-lg text-primary">Price: ${book.price}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default LatestBooks;























