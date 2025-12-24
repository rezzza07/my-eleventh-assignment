import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";

const LibrarianOrders = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["librarianOrders"],
    queryFn: () =>
      axiosSecure.get("/librarian/orders").then((res) => res.data),
  });

  const handleStatusChange = (orderId, newStatus) => {
    axiosSecure
      .patch(`/orders/${orderId}/status`, { status: newStatus })
      .then(() => {
        Swal.fire("Updated", "Order status updated", "success");
        queryClient.invalidateQueries(["librarianOrders"]);
      })
      .catch(() => {
        Swal.fire("Error", "Failed to update status", "error");
      });
  };

  const handleCancel = (orderId) => {
    Swal.fire({
      title: "Cancel this order?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/orders/${orderId}`)
          .then(() => {
            Swal.fire("Cancelled", "Order has been cancelled", "success");
            queryClient.invalidateQueries(["librarianOrders"]);
          })
          .catch(() => {
            Swal.fire("Error", "Failed to cancel order", "error");
          });
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
          Book Orders
        </h2>
        <span className="block w-24 h-1 bg-secondary rounded-full mt-2" />
      </div>

      {/* Table */}
      <div className="bg-base-100 shadow-xl rounded-2xl overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-primary text-primary-content">
            <tr>
              <th>#</th>
              <th>Book</th>
              <th>Buyer</th>
              <th>Price</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-10 opacity-60">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order, index) => (
                <tr key={order._id} className="hover:bg-secondary/10">
                  <td>{index + 1}</td>

                  <td>
                    <div className="flex items-center gap-3">
                      <img
                        src={order.bookImage}
                        alt={order.bookName}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <span className="font-semibold">
                        {order.bookName}
                      </span>
                    </div>
                  </td>

                  <td>{order.buyerEmail}</td>

                  <td>${order.price}</td>

                  <td>
                    <select
                      className="select select-sm select-bordered"
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      disabled={order.status === "delivered"}
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>

                  <td className="text-center">
                    <button
                      onClick={() => handleCancel(order._id)}
                      className="btn btn-sm btn-outline btn-error"
                      disabled={order.status === "delivered"}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LibrarianOrders;
