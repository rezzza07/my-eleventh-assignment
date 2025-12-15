import React, { useContext, useState } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';



import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import Swal from 'sweetalert2';

const BookDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const { data: book = {}, isLoading } = useQuery({
        queryKey: ['book', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/books/${id}`);
            return res.data;
        }
    });

    if (isLoading) {
        return <div className="text-center py-20">Loading...</div>;
    }

    const handleOrder = async (e) => {
        e.preventDefault();

        const orderInfo = {
            bookId: book._id,
            bookName: book.name,
            price: book.price,
            userName: user?.displayName,
            email: user?.email,
            phone,
            address
        };

        const res = await axiosSecure.post('/orders', orderInfo);

        if (res.data.insertedId) {
            document.getElementById('order_modal').close();
            Swal.fire('Success', 'Order placed successfully!', 'success');
            setPhone('');
            setAddress('');
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-10">
            {/* Book Info */}
            <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure className="lg:w-1/2">
                    <img src={book.image} alt={book.name} />
                </figure>
                <div className="card-body">
                    <h2 className="card-title text-3xl">{book.name}</h2>
                    <p><strong>Author:</strong> {book.author}</p>
                    <p>{book.description}</p>
                    <p className="font-bold text-xl">${book.price}</p>

                    <button
                        className="btn btn-primary mt-4"
                        onClick={() => document.getElementById('order_modal').showModal()}
                    >
                        Order Now
                    </button>
                </div>
            </div>

            {/* Modal */}
            <dialog id="order_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Order Book</h3>

                    <form onSubmit={handleOrder} className="space-y-3 mt-4">
                        <input
                            className="input input-bordered w-full"
                            value={user?.displayName || ''}
                            readOnly
                        />
                        <input
                            className="input input-bordered w-full"
                            value={user?.email || ''}
                            readOnly
                        />
                        <input
                            className="input input-bordered w-full"
                            placeholder="Phone Number"
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                        <textarea
                            className="textarea textarea-bordered w-full"
                            placeholder="Address"
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />

                        <div className="modal-action">
                            <button className="btn btn-primary">Place Order</button>
                            <button
                                type="button"
                                className="btn"
                                onClick={() => document.getElementById('order_modal').close()}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default BookDetails;
