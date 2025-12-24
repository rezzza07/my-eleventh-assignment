import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const MyWishlist = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: wishlist = [] } = useQuery({
    queryKey: ['wishlist', user?.uid],
    queryFn: async () => {
      if (!user) return [];
      const res = await axiosSecure.get(`/wishlist/${user.uid}`);
      return res.data;
    },
    enabled: !!user
  });

  const handleRemove = (bookId) => {
    axiosSecure
      .delete(`/wishlist/${user.uid}/${bookId}`)
      .then(() => {
        Swal.fire('Removed', 'Book removed from your wishlist', 'success');
        queryClient.invalidateQueries(['wishlist', user.uid]);
      })
      .catch(() => {
        Swal.fire('Error', 'Failed to remove book', 'error');
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 p-10">
      <div className="flex flex-col md:flex-row items-center mb-8 gap-3">
                          <MdLocalLibrary className="text-5xl text-primary animate-bounce" />
                          <div className="flex flex-col">
                              <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-md">
                                  My Wishlist
                              </h2>
                              <span className="w-24 h-1 bg-secondary rounded-full mt-2"></span>
                          </div>
                      </div>

      {wishlist.length === 0 && <p className="text-center text-lg">No books in your wishlist yet.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {wishlist.map(book => (
          <div key={book._id} className="card bg-primary shadow-2xl rounded-3xl border-2 border-secondary overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <Link to={`/books/${book._id}`}>
              <figure className="h-64 overflow-hidden rounded-t-3xl">
                <img
                  src={book.image}
                  alt={book.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </figure>
            </Link>
            <div className="card-body p-6">
              <h2 className="card-title text-secondary font-bold text-xl">{book.name}</h2>
              <p className="text-secondary mb-2">Author: <span className="font-semibold">{book.author}</span></p>
              <p className='text-white'>Status: <span className="badge badge-outline badge-secondary">{book.status}</span></p>
              <p className="mt-3 font-extrabold text-secondary text-lg">Price: ${book.price}</p>
              <button
                onClick={() => handleRemove(book._id)}
                className="btn btn-outline btn-error mt-4 w-full rounded-full text-sm hover:bg-error/10"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyWishlist;
