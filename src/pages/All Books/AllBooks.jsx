import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Link } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AllBooks = () => {
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState(''); // 'asc' or 'desc'

    const { data: books = [] } = useQuery({
        queryKey: ['all-books'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/books`);
            return res.data;
        }
    });

    const handleSearch = (e) => {
        e.preventDefault();
        // searchTerm is already controlled, so we don't need extra logic
    };

    // Filter and sort books
    const filteredBooks = books
        .filter(book => book.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            if (sortOrder === 'asc') return a.price - b.price;
            if (sortOrder === 'desc') return b.price - a.price;
            return 0;
        });

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 p-10">

            {/* Title */}
            <h1 className="text-5xl font-extrabold text-center mb-12
          bg-clip-text text-transparent
          bg-gradient-to-r from-primary to-secondary
          drop-shadow-lg">
                All Books Collection
            </h1>

            <form onSubmit={handleSearch} className="flex justify-center mb-16">
                <div className="flex items-center w-full max-w-xl bg-base-100 rounded-full shadow-md px-4 py-2 gap-3 border border-primary">

                    {/* Search Input */}
                    <input
                        type="search"
                        placeholder="Search by book name..."
                        name="book"
                        className="input input-ghost w-full px-0 focus:outline-none text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {/* Sort Dropdown */}
                    <div className="relative">
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="appearance-none w-36 bg-base-100 border-none text-sm px-3 py-2 rounded-full focus:outline-none cursor-pointer"
                        >
                            <option value="">Sort by price</option>
                            <option value="asc">Low to High</option>
                            <option value="desc">High to Low</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <svg
                                className="w-4 h-4 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {/* Search Button */}
                    <button
                        className="btn rounded-full px-6 bg-primary border-none text-secondary hover:bg-primary-focus"
                    >
                        Search
                    </button>
                </div>
            </form>


            {/* Grid of books */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBooks.map(book => (
                    <Link to={`/books/${book._id}`} key={book._id} className="transform hover:scale-105 transition-transform duration-300">
                        <div className="card bg-primary shadow-2xl rounded-3xl border-2 border-secondary overflow-hidden">
                            <figure className="h-64 overflow-hidden rounded-t-3xl">
                                <img
                                    src={book.image}
                                    alt={book.name}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                />
                            </figure>
                            <div className="card-body p-6">
                                <h2 className="card-title text-secondary font-bold text-xl">{book.name}</h2>
                                <p className="text-secondary mb-2">Author: <span className="font-semibold">{book.author}</span></p>
                                <p className='text-white'>Status: <span className="badge badge-outline badge-secondary">{book.status}</span></p>
                                <p className="mt-3 font-extrabold text-secondary text-lg">Price: ${book.price}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AllBooks;
