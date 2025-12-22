import React, { useState } from "react";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { FaUserEdit } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";

const MyProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [name, setName] = useState(user?.displayName || "");
    const [photo, setPhoto] = useState(user?.photoURL || "");
    const [loading, setLoading] = useState(false);


    const { data: role = "user", isLoading, } = useQuery({
        queryKey: ["userRole", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}/role`);
            return res.data.role || "user";
        },
    });

    if (isLoading) return <Loading />;


    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await updateProfile(user, {
                displayName: name,
                photoURL: photo,
            });

            await axiosSecure.patch(`/users/${user.email}`, {
                displayName: name,
                photoURL: photo,
            });
            Swal.fire({
                icon: "success",
                title: "Profile Updated",
                text: "Your profile has been updated successfully",
                confirmButtonColor: "#570df8",
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: error.message,
            });
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 p-6">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <FaUserEdit className="text-4xl text-primary" />
                    <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                        My Profile
                    </h2>
                </div>

                {/* Profile Card */}
                <div className="bg-base-100 shadow-2xl rounded-3xl p-8 grid md:grid-cols-2 gap-8">

                    {/* Left: Profile Info */}
                    <div className="flex flex-col items-center text-center gap-4">
                        <div className="avatar">
                            <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                                <img src={photo || "https://i.ibb.co/4pDNDk1/avatar.png"} alt="Profile" />
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold">{name}</h3>
                        <p className="text-sm opacity-70">{user?.email}</p>

                        <span className="badge badge-primary rounded-none px-4 py-3">
                            <span className="font-bold text-secondary">Role :</span>{role}
                        </span>
                    </div>

                    {/* Update Form */}
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                        <div>
                            <label className="label"><span className="label-text font-semibold">Name</span></label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input input-bordered w-full" required />
                        </div>

                        <div>
                            <label className="label"><span className="label-text font-semibold">Photo URL</span></label>
                            <input type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} className="input input-bordered w-full" />
                        </div>

                        <div>
                            <label className="label"><span className="label-text font-semibold">Email</span></label>
                            <input type="email" value={user?.email} className="input input-bordered w-full bg-base-200" disabled />
                        </div>

                        <button type="submit" disabled={loading} className="btn btn-primary w-full mt-4">
                            {loading ? "Updating..." : "Update Profile"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
