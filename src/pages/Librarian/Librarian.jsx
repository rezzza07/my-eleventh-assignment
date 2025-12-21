import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { FaIdCard, FaMapMarkerAlt, FaEnvelope, FaLink, FaHistory, FaPhoneAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';


const Librarian = () => {
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: coverage = [] } = useQuery({
        queryKey: ["coverage"],
        queryFn: async () => {
            const res = await axiosSecure.get("/coverage");
            return res.data;
        },
    });

    const regions = [...new Set(coverage.map(c => c.region))];
    const Region = useWatch({ name: 'Region', control });
    const districtsByRegion = region => coverage.filter(c => c.region === region).map(c => c.district);

    const handleLibrarianApplication = async (data) => {
        axiosSecure.post('/librarian', data)
        .then(res => {
            if (res.data.insertedId) {
                Swal.fire({
                    title: "Application Sent!",
                    text: "Our team will review your credentials and get back to you.",
                    icon: "success",
                    confirmButtonColor: "var(--p)"
                });
            } 
        
        })
    };

return (
    <div className="min-h-screen py-10 px-4 bg-gradient-to-br from-base-200 via-base-100 to-base-200 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-[-5%] right-[-5%] w-72 h-72 bg-primary/15 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-[-5%] left-[-5%] w-96 h-96 bg-secondary/15 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-4xl mx-auto bg-base-100/60 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-1 bg-gradient-to-tr from-primary/30 to-secondary/30">
            <div className="bg-base-100 rounded-[calc(2.5rem-1px)] p-6 md:p-12">

                {/* Header */}
                <div className="text-center mb-12">

                    <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-md">
                        Apply as a Librarian
                    </h2>

                    <p className="text-gray-500 mt-3 font-medium">
                        Join the <span className="text-secondary font-bold underline decoration-primary/30 underline-offset-4">BookCourier</span> network.
                    </p>
                </div>

                <form onSubmit={handleSubmit(handleLibrarianApplication)} className="space-y-10">

                    {/* Basic Identity */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-5">
                            <h4 className="flex items-center gap-2 font-bold text-primary uppercase tracking-widest text-xs border-l-4 border-primary pl-3">
                                Personal Data
                            </h4>

                            <div>
                                <label className="label text-xs font-bold text-gray-400 uppercase">Full Name</label>
                                <input
                                    {...register("name")}
                                    defaultValue={user?.displayName}
                                    className="input input-ghost w-full border-b-2 border-base-300 focus:border-primary rounded-none px-0 bg-transparent transition-all focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="label text-xs font-bold text-gray-400 uppercase">Email Address</label>
                                <div className="relative flex items-center">
                                    <FaEnvelope className="absolute left-0 text-primary/40" />
                                    <input
                                        {...register("email")}
                                        defaultValue={user?.email}
                                        className="input input-ghost w-full border-b-2 border-base-300 focus:border-primary rounded-none pl-7 bg-transparent transition-all focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-5">
                            <h4 className="flex items-center gap-2 font-bold text-primary uppercase tracking-widest text-xs border-l-4 border-secondary pl-3">
                                Identity & Reach
                            </h4>

                            <div>
                                <label className="label text-xs font-bold text-gray-400 uppercase">Government ID (NID)</label>
                                <div className="relative flex items-center">
                                    <FaIdCard className="absolute left-0 text-secondary/40" />
                                    <input
                                        {...register("govId", { required: true })}
                                        placeholder="XXXX-XXXX-XXXX"
                                        className="input input-ghost w-full border-b-2 border-base-300 focus:border-secondary rounded-none pl-7 bg-transparent transition-all focus:outline-none"
                                    />
                                </div>
                                {errors.govId && <span className="text-error text-[10px] font-bold">Valid ID is required</span>}
                            </div>

                            <div>
                                <label className="label text-xs font-bold text-gray-400 uppercase">Contact Number</label>
                                <div className="relative flex items-center">
                                    <FaPhoneAlt className="absolute left-0 text-secondary/40 text-sm" />
                                    <input
                                        {...register("phone", { required: true })}
                                        placeholder="+880..."
                                        className="input input-ghost w-full border-b-2 border-base-300 focus:border-secondary rounded-none pl-7 bg-transparent transition-all focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Coverage Area */}
                    <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-8 rounded-[2rem] border border-white/60 shadow-inner space-y-6">
                        <h4 className="flex items-center gap-2 font-bold text-gray-700 uppercase tracking-widest text-xs">
                            <FaMapMarkerAlt className="text-primary" /> Service Coverage
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <fieldset className="form-control w-full">
                                <label className="label text-xs font-bold text-gray-500">Proposed Region</label>
                                <select {...register('Region')} defaultValue="" className="select select-bordered border-primary/20 rounded-xl focus:ring-2 focus:ring-primary/20 focus:outline-none bg-white/50">
                                    <option value="" disabled>Select a Region</option>
                                    {regions.map((r, i) => <option key={i} value={r}>{r}</option>)}
                                </select>
                            </fieldset>

                            <fieldset className="form-control w-full">
                                <label className="label text-xs font-bold text-gray-500">Proposed District</label>
                                <select {...register('District')} defaultValue="" className="select select-bordered border-secondary/20 rounded-xl focus:ring-2 focus:ring-secondary/20 focus:outline-none bg-white/50">
                                    <option value="" disabled>Select a District</option>
                                    {Region && districtsByRegion(Region).map((r, i) => <option key={i} value={r}>{r}</option>)}
                                </select>
                            </fieldset>
                        </div>

                        <div>
                            <label className="label text-xs font-bold text-gray-500">Library Hub Address</label>
                            <textarea
                                {...register("address", { required: true })}
                                className="textarea textarea-bordered border-base-300 w-full rounded-xl focus:border-primary focus:outline-none min-h-[80px] bg-white/50"
                                placeholder="Room, Building, Area details..."
                            />
                        </div>
                    </div>

                    {/* Section 3: Credentials */}
                    <div className="space-y-6">
                        <h4 className="flex items-center gap-2 font-bold text-gray-700 uppercase tracking-widest text-xs border-b-2 border-base-200 pb-2">
                            <FaLink className="text-primary" /> Professional Credentials
                        </h4>

                        <div className="group">
                            <label className="label text-xs font-bold text-gray-400 uppercase group-focus-within:text-primary transition-colors">Resume / Portfolio Link</label>
                            <div className="relative flex items-center">
                                <FaLink className="absolute left-0 text-primary/40" />
                                <input
                                    {...register("cvLink", { required: true })}
                                    placeholder="Google Drive, LinkedIn, or Portfolio URL"
                                    className="input input-ghost w-full border-b-2 border-base-300 focus:border-primary rounded-none pl-7 bg-transparent transition-all focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="group">
                            <label className="label text-xs font-bold text-gray-400 uppercase group-focus-within:text-secondary transition-colors">Management Experience</label>
                            <textarea
                                {...register("experience", { required: true })}
                                className="textarea textarea-ghost w-full border-b-2 border-base-300 focus:border-secondary rounded-none px-0 bg-transparent min-h-[100px] focus:outline-none"
                                placeholder="Briefly describe your history with book management or organization..."
                            />
                        </div>
                    </div>

                    {/* Submission Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                        <button
                            type="submit"
                            className="btn flex-1 h-14 bg-primary hover:bg-primary-focus border-none text-white font-black rounded-2xl shadow-xl hover:shadow-primary/40 transition-all duration-300 active:scale-95"
                        >
                            Submit Application
                        </button>
                        <button
                            type="button"
                            className="btn h-14 px-10 border-2 border-secondary/30 bg-transparent text-secondary hover:bg-secondary/10 rounded-2xl font-bold transition-all"
                            onClick={() => window.history.back()}
                        >
                            Back
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
);
};

export default Librarian;