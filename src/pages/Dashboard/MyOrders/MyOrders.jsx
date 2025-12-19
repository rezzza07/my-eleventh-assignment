import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FiEdit } from 'react-icons/fi';
import { FaTrashCan } from 'react-icons/fa6';
import { GiCancel } from 'react-icons/gi';
import Swal from 'sweetalert2';


const MyOrders = () => {

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: orders = [], refetch } = useQuery({
    queryKey: ['courier', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/courier?email=${user.email}`);
      return res.data;
    }
  })

  const handleOrderCancel = id => {
    console.log(id)
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
        axiosSecure.delete(`/courier/${id}`)
          .then(res => {
            console.log(res.data);
            if (res.data.deletedCount) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your order has been deleted.",
                icon: "success"
              });
            }
          })

      }
    });
  }

  const handlePayment =async (order) => {
    const paymentInfo = {
      cost: order.cost,
      orderId: order._id,
      senderEmail: order.senderEmail,
      bookName: order.bookName
    }
    const res = await axiosSecure.post('/create-checkout-session',paymentInfo);
    window.location.assign(res.data.url);
    
  }

  return (
    <div className="overflow-x-auto rounded-xl shadow-lg border border-base-300">
      <table className="table w-full">
        {/* Head */}
        <thead className="bg-primary text-primary-content">
          <tr>
            <th className="rounded-tl-xl">#</th>
            <th>Book title</th>
            <th>Order date</th>
            <th>Cost</th>
            <th>Payment Status</th>
            <th>Delivery Status</th>
            <th>Actions</th>




          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {
            orders.map((order, index) =>
              <tr key={order._id} className="hover bg-secondary/10 transition-colors">
                <th className="text-secondary font-semibold">{index + 1}</th>
                <td className="font-medium">{order.bookName}</td>
                <td>{order.createdAt}</td>
                <td>${order.cost}</td>
                <td>
                  {
                    order.paymentStatus === 'paid' ?
                      <span className='text-green-400'>Paid</span> :

                      <button onClick={() => handlePayment(order)} className="btn bg-red-500 text-white">Pay Now</button>

                  }
                </td>
                <td>Random</td>
                <td>
                  <button className='btn btn-square'><FiEdit /></button>
                  <button className='btn btn-square'><FaTrashCan /></button>
                  <button
                    onClick={() => handleOrderCancel(order._id)}
                    className='btn btn-square'><GiCancel /></button>
                </td>


              </tr>
            )
          }




        </tbody>
      </table>
    </div>


  );
};

export default MyOrders;
