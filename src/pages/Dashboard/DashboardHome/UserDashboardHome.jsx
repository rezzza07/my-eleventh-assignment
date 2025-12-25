import { useQuery } from "@tanstack/react-query";
import { FaShoppingCart, FaClock, FaDollarSign } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";

const UserDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user-dashboard"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/user");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <Loading></Loading>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-red-500">Failed to load dashboard data.</p>
      </div>
    );
  }

  const { stats = {} } = data || {};
  const { totalOrders = 0, pendingOrders = 0, totalSpent = 0 } = stats;

  return (
    <div className="p-8 bg-base-100 min-h-screen">
      <div className="flex flex-col md:flex-row items-center mb-8 gap-3">
                            <div className="flex flex-col">
                                <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-md">
                                   User Dashboard
                                </h2>
                                <span className="w-24 h-1 bg-secondary rounded-full mt-2"></span>
                            </div>
                        </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-primary text-white shadow-xl">
          <div className="card-body flex-row items-center gap-5">
            <FaShoppingCart className="text-4xl text-secondary" />
            <div>
              <p className="text-sm">Total Orders</p>
              <h2 className="text-3xl font-bold">{totalOrders}</h2>
            </div>
          </div>
        </div>

        <div className="card bg-secondary text-primary shadow-xl">
          <div className="card-body flex-row items-center gap-5">
            <FaClock className="text-4xl" />
            <div>
              <p className="text-sm">Pending Orders</p>
              <h2 className="text-3xl font-bold">{pendingOrders}</h2>
            </div>
          </div>
        </div>

        <div className="card bg-accent text-white shadow-xl">
          <div className="card-body flex-row items-center gap-5">
            <FaDollarSign className="text-4xl" />
            <div>
              <p className="text-sm">Total Spent</p>
              <h2 className="text-3xl font-bold">${totalSpent.toFixed(2)}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
