import { useQuery } from "@tanstack/react-query";

import {
  FaUsers,
  FaUserShield,
  FaBook,
  FaDollarSign
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";


const StatCard = ({ icon, title, value, bg }) => {
  return (
    <div className={`card ${bg} text-white shadow-xl`}>
      <div className="card-body flex-row items-center gap-5">
        <div className="text-4xl">{icon}</div>
        <div>
          <p className="text-sm opacity-90">{title}</p>
          <h2 className="text-3xl font-bold">{value}</h2>
        </div>
      </div>
    </div>
  );
};

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/admin");
      return res.data;
    }
  });

  if (isLoading) return <Loading></Loading> ;

  const { users, librarians, books } = data;

  return (
    <div className="p-8">
        <div className="flex flex-col md:flex-row items-center mb-8 gap-3">
                            <div className="flex flex-col">
                                <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-md">
                                    Admin Dashboard
                                </h2>
                                <span className="w-24 h-1 bg-secondary rounded-full mt-2"></span>
                            </div>
                        </div>
      

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={<FaUsers />} title="Users" value={users} bg="bg-primary" />
        <StatCard icon={<FaUserShield />} title="Librarians" value={librarians} bg="bg-secondary" />
        <StatCard icon={<FaBook />} title="Books" value={books} bg="bg-accent" />
        
      </div>
    </div>
  );
};

export default AdminDashboardHome;
