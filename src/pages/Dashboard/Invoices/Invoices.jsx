import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaBook, FaDollarSign, FaReceipt } from 'react-icons/fa6';
import { FaCalendarAlt } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';

const Invoices = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        }
    })


    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 p-6">
            <div className="max-w-6xl mx-auto">

                {/* Page Header */}
                <div className="flex flex-col md:flex-row items-center mb-8 gap-3">
                    <FaReceipt className="text-5xl text-primary animate-bounce" />
                    <div className="flex flex-col">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-md">
                            Invoices
                        </h2>
                        <span className="w-24 h-1 bg-secondary rounded-full mt-2"></span>
                    </div>
                </div>

                {/* Table Card */}
                <div className="bg-base-100 shadow-2xl rounded-3xl overflow-hidden">
                    <table className="table w-full">
                        {/* Table Head */}
                        <thead className="bg-primary text-primary-content">
                            <tr>
                                <th className="whitespace-nowrap">#</th>
                                <th className="whitespace-nowrap">
                                    <div className="flex items-center gap-1">
                                        <FaReceipt /> Payment ID
                                    </div>
                                </th>
                                <th className="whitespace-nowrap">
                                    <div className="flex items-center gap-1">
                                        <FaBook /> Book
                                    </div>
                                </th>
                                <th className="whitespace-nowrap">
                                    <div className="flex items-center gap-1">
                                        <FaDollarSign /> Amount
                                    </div>
                                </th>
                                <th className="whitespace-nowrap">
                                    <div className="flex items-center gap-1">
                                        <FaCalendarAlt /> Date
                                    </div>
                                </th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {payments.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="text-center py-10 text-base-content/50">
                                        No payments found
                                    </td>
                                </tr>
                            )}

                            {payments.map((payment, index) => (
                                <tr
                                    key={payment._id}
                                    className="hover:bg-secondary/10 transition-all duration-300"
                                >
                                    <td className="font-semibold">{index + 1}</td>

                                    <td className="font-mono text-sm truncate">
                                        {payment.transactionId}
                                    </td>

                                    <td>
                                        {payment.bookName ? (
                                            <span className="badge badge-secondary badge-outline">
                                                {payment.bookName}
                                            </span>
                                        ) : (
                                            <span className="text-base-content/50">N/A</span>
                                        )}
                                    </td>

                                    <td className="font-semibold text-primary">
                                        ${payment.amount}
                                    </td>

                                    <td className="text-sm">
                                        {new Date(payment.paidAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default Invoices;
