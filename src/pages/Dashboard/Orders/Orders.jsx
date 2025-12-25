import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";

const Orders = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: orders = [], isLoading } = useQuery(["orders"], async () => {
        const res = await axiosSecure.get("/orders/my-books");
        return res.data;
    });

    const updateStatus = useMutation(
        ({ id, status }) => axiosSecure.patch(`/orders/${id}/status`, { status }),
        { onSuccess: () => queryClient.invalidateQueries(["orders"]) }
    );

    const cancelOrder = useMutation(
        (id) => axiosSecure.delete(`/orders/${id}`),
        { onSuccess: () => queryClient.invalidateQueries(["orders"]) }
    );

    if (isLoading) return <p><Loading></Loading></p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Orders</h2>
            <table className="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>Book</th>
                        <th>User</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order.bookName}</td>
                            <td>{order.userEmail}</td>
                            <td>
                                <select value={order.status} onChange={e => updateStatus.mutate({ id: order._id, status: e.target.value })} className="select select-sm select-bordered">
                                    <option value="pending">Pending</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                </select>
                            </td>
                            <td>
                                <button className="btn btn-sm btn-error" onClick={() => Swal.fire({
                                    title: "Cancel Order?",
                                    showCancelButton: true,
                                    confirmButtonText: "Yes",
                                    icon: "warning"
                                }).then(result => { if (result.isConfirmed) cancelOrder.mutate(order._id) })}>Cancel</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Orders;
