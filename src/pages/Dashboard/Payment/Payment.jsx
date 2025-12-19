import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Payment = () => {

    const { orderId } = useParams();
    const axiosSecure = useAxiosSecure();
    const { isLoading, data: order } = useQuery({
        queryKey: ['courier', orderId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/courier/${orderId}`);
            return res.data;
        }
    })

    const handlePayment = async () => {
        const paymentInfo = {
            cost: order.cost,
            orderId: order._id,
            senderEmail: order.senderEmail,
            bookName: order.bookName
        };

        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);

        
        window.location.assign(res.data.url);
    };


    if (isLoading) {
        return <div>loading</div>
    }
    return (
        <div>
            <h1>pay ${order.cost}:{order.bookName}</h1>
            <button onClick={handlePayment} className="btn btn-primary text-secondary">Pay</button>
        </div>
    );
};

export default Payment;