import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FiEdit } from 'react-icons/fi';
import { FaTrashCan } from 'react-icons/fa6';
import { GiCancel } from 'react-icons/gi';
import Swal from 'sweetalert2';
import { PiPackageFill } from 'react-icons/pi';

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: orders = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['courier', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/courier?email=${user.email}`);
      return res.data;
    }
  });

  const handleOrderCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/courier/${id}`).then(res => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your order has been deleted.",
              icon: "success"
            });
          }
        });
      }
    });
  };

  const handlePayment = async (order) => {
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
    return (
      <div className="min-h-screen flex items-center justify-center text-primary text-xl font-semibold">
        Loading orders...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-error text-xl font-semibold gap-3">
        Failed to load orders.
        <button
          onClick={refetch}
          className="btn btn-sm btn-outline btn-primary"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 p-6">
      <div className="max-w-6xl mx-auto">
       

        {/* Page Header */}
        <div className="flex flex-col md:flex-row items-center mb-8 gap-3">
           <PiPackageFill className="text-5xl text-primary animate-bounce" />
           
          <div className="flex flex-col">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-md">
                          My Orders
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
                <th className="whitespace-nowrap rounded-tl-xl">#</th>
                <th className="whitespace-nowrap">Book Title</th>
                <th className="whitespace-nowrap">Order Date</th>
                <th className="whitespace-nowrap">Cost</th>
                <th className="whitespace-nowrap">Payment Status</th>
                <th className="whitespace-nowrap">Delivery Status</th>
                <th className="whitespace-nowrap rounded-tr-xl">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-base-content/50">
                    No orders found
                  </td>
                </tr>
              ) : (
                orders.map((order, index) => (
                  <tr
                    key={order._id}
                    className="hover:bg-secondary/10 transition-all duration-300"
                  >
                    <td className="font-semibold">{index + 1}</td>

                    <td className="font-medium">{order.bookName}</td>

                    <td>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>

                    <td className="font-semibold text-primary">${order.cost}</td>

                    <td>
                      {order.paymentStatus === 'paid' ? (
                        <span className="text-green-400 font-semibold">Paid</span>
                      ) : (
                        <button
                          onClick={() => handlePayment(order)}
                          className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                        >
                          Pay Now
                        </button>
                      )}
                    </td>

                    <td>{order.deliveryStatus || 'Pending'}</td>

                    <td className="flex gap-2 justify-center">
                      <button className="btn btn-square btn-outline btn-primary" title="Edit Order">
                        <FiEdit />
                      </button>
                      <button className="btn btn-square btn-outline btn-error" title="Delete Order" onClick={() => handleOrderCancel(order._id)}>
                        <FaTrashCan />
                      </button>
                      <button className="btn btn-square btn-outline btn-warning" title="Cancel Order" onClick={() => handleOrderCancel(order._id)}>
                        <GiCancel />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default MyOrders;
