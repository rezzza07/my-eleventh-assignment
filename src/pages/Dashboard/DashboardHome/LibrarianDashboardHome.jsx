import { useQuery } from "@tanstack/react-query";
import { FaBook, FaShoppingCart, FaDollarSign } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";

const LibrarianDashboardHome = () => {
    const axiosSecure = useAxiosSecure();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["librarian-dashboard"],
        queryFn: async () => {
            const res = await axiosSecure.get("/dashboard/librarian");
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
    const { totalBooks = 0, totalOrders = 0, totalRevenue = 0 } = stats;

    return (
        <div className="p-8 bg-base-100 min-h-screen">
            {/* Page Title */}
            <div className="flex flex-col md:flex-row items-center mb-8 gap-3">
                <div className="flex flex-col">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-md">
                        Librarian Dashboard
                    </h2>
                    <span className="w-24 h-1 bg-secondary rounded-full mt-2"></span>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card bg-primary text-white shadow-xl">
                    <div className="card-body flex-row items-center gap-5">
                        <FaBook className="text-4xl text-secondary" />
                        <div>
                            <p className="text-sm">Total Books</p>
                            <h2 className="text-3xl font-bold">{totalBooks}</h2>
                        </div>
                    </div>
                </div>

                <div className="card bg-secondary text-primary shadow-xl">
                    <div className="card-body flex-row items-center gap-5">
                        <FaShoppingCart className="text-4xl" />
                        <div>
                            <p className="text-sm">Total Orders</p>
                            <h2 className="text-3xl font-bold">{totalOrders}</h2>
                        </div>
                    </div>
                </div>

                <div className="card bg-accent text-white shadow-xl">
                    <div className="card-body flex-row items-center gap-5">
                        <FaDollarSign className="text-4xl" />
                        <div>
                            <p className="text-sm">Total Revenue</p>
                            <h2 className="text-3xl font-bold">${totalRevenue.toFixed(2)}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LibrarianDashboardHome;
