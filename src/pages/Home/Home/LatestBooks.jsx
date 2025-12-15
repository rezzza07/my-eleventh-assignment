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
        <div className="p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map(book => (
                <Link to={`/books/${book._id}`} key={book._id}>
                    <div className="card bg-primary text-primary-content shadow-xl hover:scale-105 duration-300">
                        <figure>
                            <img src={book.image} alt={book.name} className="h-60 w-full object-cover" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{book.name}</h2>
                            <p className="text-secondary">Author: {book.author}</p>
                            <p>Status: <span className="badge badge-secondary">{book.status}</span></p>
                            <p className="font-bold">Price: ${book.price}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default LatestBooks;























